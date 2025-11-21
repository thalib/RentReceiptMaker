import { describe, it, expect } from 'vitest';
import { formatCurrency, numberToWords, numberToWordsClean } from '../currency';

describe('Currency Utils', () => {
  describe('formatCurrency', () => {
    it('should format small amounts correctly', () => {
      expect(formatCurrency(100)).toBe('₹100');
      expect(formatCurrency(999)).toBe('₹999');
    });

    it('should format thousands with Indian numbering', () => {
      expect(formatCurrency(1000)).toBe('₹1,000');
      expect(formatCurrency(15000)).toBe('₹15,000');
      expect(formatCurrency(99999)).toBe('₹99,999');
    });

    it('should format lakhs with Indian numbering', () => {
      expect(formatCurrency(100000)).toBe('₹1,00,000');
      expect(formatCurrency(150000)).toBe('₹1,50,000');
      expect(formatCurrency(999999)).toBe('₹9,99,999');
    });

    it('should format crores with Indian numbering', () => {
      expect(formatCurrency(1000000)).toBe('₹10,00,000');
      expect(formatCurrency(1500000)).toBe('₹15,00,000');
      expect(formatCurrency(10000000)).toBe('₹1,00,00,000');
    });

    it('should handle decimals', () => {
      expect(formatCurrency(1234.56)).toBe('₹1,234.56');
      expect(formatCurrency(100000.99)).toBe('₹1,00,000.99');
    });

    it('should handle zero and edge cases', () => {
      expect(formatCurrency(0)).toBe('₹0');
      expect(formatCurrency(NaN)).toBe('₹0');
      expect(formatCurrency(Infinity)).toBe('₹0');
    });
  });

  describe('numberToWords', () => {
    it('should convert zero', () => {
      expect(numberToWords(0)).toBe('Zero Only');
    });

    it('should convert single digits', () => {
      expect(numberToWords(1)).toContain('One');
      expect(numberToWords(5)).toContain('Five');
      expect(numberToWords(9)).toContain('Nine');
    });

    it('should convert tens', () => {
      expect(numberToWords(10)).toContain('Ten');
      expect(numberToWords(15)).toContain('Fifteen');
      expect(numberToWords(20)).toContain('Twenty');
      expect(numberToWords(99)).toContain('Ninety Nine');
    });

    it('should convert hundreds', () => {
      expect(numberToWords(100)).toContain('One Hundred');
      expect(numberToWords(500)).toContain('Five Hundred');
      expect(numberToWords(999)).toContain('Nine Hundred');
    });

    it('should convert thousands', () => {
      expect(numberToWords(1000)).toContain('One Thousand');
      expect(numberToWords(15000)).toContain('Fifteen Thousand');
    });

    it('should convert lakhs', () => {
      expect(numberToWords(100000)).toContain('One Lakh');
      expect(numberToWords(150000)).toContain('One Lakh Fifty Thousand');
    });

    it('should convert crores', () => {
      expect(numberToWords(10000000)).toContain('One Crore');
      expect(numberToWords(15000000)).toContain('One Crore Fifty Lakh');
    });

    it('should handle decimals with paise', () => {
      const result = numberToWords(1234.56);
      expect(result).toContain('Paise');
    });

    it('should end with Only', () => {
      expect(numberToWords(100)).toContain('Only');
      expect(numberToWords(1000)).toContain('Only');
    });

    it('should handle edge cases', () => {
      expect(numberToWords(NaN)).toBe('Zero Only');
      expect(numberToWords(Infinity)).toBe('Zero Only');
    });
  });

  describe('numberToWordsClean', () => {
    it('should remove extra spaces', () => {
      const result = numberToWordsClean(1000);
      expect(result).not.toMatch(/\s{2,}/);
    });
  });
});
