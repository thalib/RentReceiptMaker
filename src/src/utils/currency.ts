/**
 * Currency utility functions for Indian numbering system
 */

import { CURRENCY_SYMBOL } from './constants';

/**
 * Format currency with Indian numbering system (lakhs, crores)
 * Example: 15000 → "₹15,000"
 * Example: 150000 → "₹1,50,000"
 * Example: 1500000 → "₹15,00,000"
 */
export function formatCurrency(amount: number): string {
  if (!isFinite(amount) || isNaN(amount)) return `${CURRENCY_SYMBOL}0`;
  
  // Round to 2 decimal places
  const rounded = Math.round(amount * 100) / 100;
  
  // Split into integer and decimal parts
  const parts = rounded.toFixed(2).split('.');
  const integerPart = parts[0] || '0';
  const decimalPart = parts[1];
  
  // Apply Indian numbering system
  // Format: X,XX,XXX pattern (comma after every 2 digits from right, except the first 3)
  let formatted = integerPart;
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3);
    const remaining = integerPart.slice(0, -3);
    const formattedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formatted = formattedRemaining + ',' + lastThree;
  }
  
  // Add decimal part if not zero
  if (decimalPart && parseFloat(decimalPart) > 0) {
    formatted += '.' + decimalPart;
  }
  
  return `${CURRENCY_SYMBOL}${formatted}`;
}

/**
 * Convert number to words in Indian numbering system
 * Example: 15000 → "Fifteen Thousand Only"
 * Example: 150000 → "One Lakh Fifty Thousand Only"
 * Example: 1500000 → "Fifteen Lakh Only"
 */
export function numberToWords(amount: number): string {
  if (!isFinite(amount) || isNaN(amount)) return 'Zero Only';
  if (amount === 0) return 'Zero Only';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Split into integer and decimal parts
  const integerPart = Math.floor(absAmount);
  const decimalPart = Math.round((absAmount - integerPart) * 100);
  
  let words = convertIntegerToWords(integerPart);
  
  if (decimalPart > 0) {
    words += ` and ${convertIntegerToWords(decimalPart)} Paise`;
  }
  
  words += ' Only';
  
  if (isNegative) {
    words = 'Negative ' + words;
  }
  
  return words;
}

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertIntegerToWords(num: number): string {
  if (num === 0) return '';
  
  // Indian numbering system: Crores, Lakhs, Thousands, Hundreds
  if (num >= 10000000) {
    const croreWords = convertIntegerToWords(Math.floor(num / 10000000));
    const remainingWords = convertIntegerToWords(num % 10000000);
    return remainingWords ? `${croreWords} Crore ${remainingWords}` : `${croreWords} Crore`;
  }
  
  if (num >= 100000) {
    const lakhWords = convertIntegerToWords(Math.floor(num / 100000));
    const remainingWords = convertIntegerToWords(num % 100000);
    return remainingWords ? `${lakhWords} Lakh ${remainingWords}` : `${lakhWords} Lakh`;
  }
  
  if (num >= 1000) {
    const thousandWords = convertIntegerToWords(Math.floor(num / 1000));
    const remainingWords = convertIntegerToWords(num % 1000);
    return remainingWords ? `${thousandWords} Thousand ${remainingWords}` : `${thousandWords} Thousand`;
  }
  
  if (num >= 100) {
    const hundredWords = ones[Math.floor(num / 100)];
    const remainingWords = convertIntegerToWords(num % 100);
    return remainingWords ? `${hundredWords} Hundred ${remainingWords}` : `${hundredWords} Hundred`;
  }
  
  if (num >= 20) {
    const tenWord = tens[Math.floor(num / 10)] || '';
    const oneWord = ones[num % 10] || '';
    return oneWord ? `${tenWord} ${oneWord}` : tenWord;
  }
  
  if (num >= 10) {
    return teens[num - 10] || '';
  }
  
  return ones[num] || '';
}

/**
 * Clean up extra spaces in the result
 */
function cleanWords(words: string): string {
  return words.replace(/\s+/g, ' ').trim();
}

// Export cleaned version
export function numberToWordsClean(amount: number): string {
  return cleanWords(numberToWords(amount));
}
