/**
 * Composable for drawing receipt on canvas
 */

import { formatCurrency, numberToWordsClean } from '../utils/currency';
import { formatDate, formatDateRange } from '../utils/date';
import type { FormData } from '../types/receipt';
import { REVENUE_STAMP_THRESHOLD } from '../utils/constants';

interface CanvasConfig {
  width: number;
  height: number;
  padding: number;
  lineHeight: number;
  fontSize: {
    title: number;
    heading: number;
    body: number;
    small: number;
  };
}

/**
 * Default A4 proportions in pixels (at 2x resolution)
 */
const DEFAULT_CONFIG: CanvasConfig = {
  width: 1240,  // A4 width at ~150 DPI
  height: 1754, // A4 height at ~150 DPI
  padding: 80,
  lineHeight: 1.5,
  fontSize: {
    title: 36,
    heading: 24,
    body: 18,
    small: 14,
  },
};

export function useReceiptCanvas() {
  /**
   * Set up canvas context with proper scaling for high-DPI displays
   */
  function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    const config = DEFAULT_CONFIG;

    // Set display size (CSS pixels)
    canvas.style.width = `${config.width / 2}px`;
    canvas.style.height = `${config.height / 2}px`;

    // Set actual size in memory (2x resolution for high quality)
    canvas.width = config.width;
    canvas.height = config.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set default styles
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000000';
    
    return ctx;
  }

  /**
   * Draw text at position
   */
  function drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    options: {
      fontSize?: number;
      fontWeight?: string;
      align?: CanvasTextAlign;
      maxWidth?: number;
    } = {}
  ) {
    const fontSize = options.fontSize || DEFAULT_CONFIG.fontSize.body;
    const fontWeight = options.fontWeight || 'normal';
    const align = options.align || 'left';

    ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = align;

    if (options.maxWidth) {
      ctx.fillText(text, x, y, options.maxWidth);
    } else {
      ctx.fillText(text, x, y);
    }
  }

  /**
   * Draw horizontal line
   */
  function drawLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth: number = 1
  ) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#333333';
    ctx.stroke();
  }

  /**
   * Draw multiline text
   */
  function drawMultilineText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  /**
   * Draw complete receipt on canvas
   */
  function drawReceipt(
    canvas: HTMLCanvasElement,
    formData: FormData,
    receiptNumber: string
  ) {
    const ctx = setupCanvas(canvas);
    if (!ctx) return;

    const config = DEFAULT_CONFIG;
    const { padding, fontSize } = config;
    let currentY = padding;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw colorful header background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, padding * 2);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, padding * 2);

    // Title: RENT RECEIPT
    ctx.fillStyle = '#FFFFFF';
    drawText(ctx, 'RENT RECEIPT', canvas.width / 2, currentY, {
      fontSize: fontSize.title,
      fontWeight: 'bold',
      align: 'center',
    });
    currentY += fontSize.title * 2;
    
    ctx.fillStyle = '#000000';

    // Receipt Number (right-aligned)
    drawText(ctx, `Receipt No: ${receiptNumber}`, canvas.width - padding, currentY, {
      fontSize: fontSize.small,
      align: 'right',
    });
    currentY += fontSize.small * 2;

    // Horizontal divider
    drawLine(ctx, padding, currentY, canvas.width - padding, currentY, 2);
    currentY += 40;

    // Content Section
    const labelX = padding;
    const valueX = padding + 250;
    const contentWidth = canvas.width - padding * 2 - 250;

    // Received From
    drawText(ctx, 'Received From:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, formData.tenantName || '___________', valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 2;

    // Amount
    const amount = formData.rentAmount || 0;
    drawText(ctx, 'Amount:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, formatCurrency(amount), valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 2;

    // Amount in Words
    drawText(ctx, 'Amount in Words:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    ctx.font = `normal ${fontSize.body}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    currentY = drawMultilineText(
      ctx,
      `Rupees ${numberToWordsClean(amount)}`,
      valueX,
      currentY,
      contentWidth,
      fontSize.body * config.lineHeight
    );
    currentY += fontSize.body * config.lineHeight;

    // For Rent of Property
    drawText(ctx, 'For Rent of Property:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    ctx.font = `normal ${fontSize.body}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    currentY = drawMultilineText(
      ctx,
      formData.propertyAddress || '___________',
      valueX,
      currentY,
      contentWidth,
      fontSize.body * config.lineHeight
    );
    currentY += fontSize.body * config.lineHeight;

    // Rental Period
    let periodText = '___________';
    if (formData.rentalPeriodStart && formData.rentalPeriodEnd) {
      const start = new Date(formData.rentalPeriodStart);
      const end = new Date(formData.rentalPeriodEnd);
      periodText = formatDateRange(start, end);
    }
    drawText(ctx, 'Rental Period:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, periodText, valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 2;

    // Payment Mode
    drawText(ctx, 'Payment Mode:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, formData.paymentMode || '___________', valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 2;

    // Payment Date
    let paymentDateText = '___________';
    if (formData.paymentDate) {
      paymentDateText = formatDate(new Date(formData.paymentDate));
    }
    drawText(ctx, 'Payment Date:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, paymentDateText, valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 3;

    // Landlord Section
    drawLine(ctx, padding, currentY, canvas.width - padding, currentY, 1);
    currentY += 30;

    drawText(ctx, 'Landlord Details:', labelX, currentY, {
      fontSize: fontSize.heading,
      fontWeight: 'bold',
    });
    currentY += fontSize.heading * config.lineHeight * 1.5;

    // Landlord Name
    drawText(ctx, 'Name:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, formData.landlordName || '___________', valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 2;

    // Landlord Address
    drawText(ctx, 'Address:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    ctx.font = `normal ${fontSize.body}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    currentY = drawMultilineText(
      ctx,
      formData.landlordAddress || '___________',
      valueX,
      currentY,
      contentWidth,
      fontSize.body * config.lineHeight
    );
    currentY += fontSize.body * config.lineHeight;

    // PAN Number
    drawText(ctx, 'PAN Number:', labelX, currentY, {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    });
    drawText(ctx, formData.landlordPAN || '___________', valueX, currentY, {
      fontSize: fontSize.body,
    });
    currentY += fontSize.body * config.lineHeight * 3;

    // Signature Section
    currentY = canvas.height - padding - 150;
    drawLine(ctx, canvas.width - padding - 300, currentY, canvas.width - padding, currentY, 1);
    currentY += 10;
    drawText(ctx, "Landlord's Signature", canvas.width - padding - 150, currentY, {
      fontSize: fontSize.small,
      align: 'center',
    });
    currentY += fontSize.small * 2;
    drawText(ctx, `Date: ${formatDate(new Date())}`, canvas.width - padding - 150, currentY, {
      fontSize: fontSize.small,
      align: 'center',
    });

    // Revenue stamp notice
    if (amount > REVENUE_STAMP_THRESHOLD) {
      currentY = canvas.height - padding - 50;
      drawText(ctx, '* Revenue stamp required for rent above ₹5,000/month', padding, currentY, {
        fontSize: fontSize.small,
        align: 'left',
      });
    }

    // Draw "PAID" stamp (rotated, red, prominent)
    ctx.save();
    const stampX = canvas.width - 250;
    const stampY = canvas.height / 2 - 100;
    
    // Rotate canvas for stamp
    ctx.translate(stampX, stampY);
    ctx.rotate(-0.3); // Rotate ~17 degrees
    
    // Draw stamp border (red rounded rectangle)
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 8;
    ctx.setLineDash([]);
    const stampWidth = 240;
    const stampHeight = 100;
    const cornerRadius = 10;
    
    ctx.beginPath();
    ctx.moveTo(-stampWidth/2 + cornerRadius, -stampHeight/2);
    ctx.lineTo(stampWidth/2 - cornerRadius, -stampHeight/2);
    ctx.arcTo(stampWidth/2, -stampHeight/2, stampWidth/2, -stampHeight/2 + cornerRadius, cornerRadius);
    ctx.lineTo(stampWidth/2, stampHeight/2 - cornerRadius);
    ctx.arcTo(stampWidth/2, stampHeight/2, stampWidth/2 - cornerRadius, stampHeight/2, cornerRadius);
    ctx.lineTo(-stampWidth/2 + cornerRadius, stampHeight/2);
    ctx.arcTo(-stampWidth/2, stampHeight/2, -stampWidth/2, stampHeight/2 - cornerRadius, cornerRadius);
    ctx.lineTo(-stampWidth/2, -stampHeight/2 + cornerRadius);
    ctx.arcTo(-stampWidth/2, -stampHeight/2, -stampWidth/2 + cornerRadius, -stampHeight/2, cornerRadius);
    ctx.closePath();
    ctx.stroke();
    
    // Draw "PAID" text
    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 56px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAID', 0, 0);
    
    ctx.restore();
  }

  return {
    setupCanvas,
    drawReceipt,
  };
}
