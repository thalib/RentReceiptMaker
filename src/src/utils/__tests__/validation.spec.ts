import { describe, it, expect } from 'vitest'
import {
  isValidPAN,
  isValidNumber,
  isPositiveNumber,
  isInRange,
  isEmptyOrWhitespace,
  hasMinLength,
  hasMaxLength,
} from '../validation'

describe('Validation Utils', () => {
  describe('isValidPAN', () => {
    it('should validate correct PAN format', () => {
      expect(isValidPAN('ABCDE1234F')).toBe(true)
      expect(isValidPAN('XYZHK5678M')).toBe(true)
    })

    it('should reject invalid PAN formats', () => {
      expect(isValidPAN('ABC123456')).toBe(false)
      expect(isValidPAN('ABCDE12345')).toBe(false)
      expect(isValidPAN('abcde1234f')).toBe(false)
      expect(isValidPAN('ABCD1234F')).toBe(false)
      expect(isValidPAN('ABCDE123F')).toBe(false)
      expect(isValidPAN('')).toBe(false)
    })
  })

  describe('isValidNumber', () => {
    it('should validate valid numbers', () => {
      expect(isValidNumber(0)).toBe(true)
      expect(isValidNumber(1)).toBe(true)
      expect(isValidNumber(-1)).toBe(true)
      expect(isValidNumber(3.14)).toBe(true)
    })

    it('should reject invalid numbers', () => {
      expect(isValidNumber(NaN)).toBe(false)
      expect(isValidNumber(Infinity)).toBe(false)
      expect(isValidNumber(-Infinity)).toBe(false)
      expect(isValidNumber('123')).toBe(false)
      expect(isValidNumber(null)).toBe(false)
    })
  })

  describe('isPositiveNumber', () => {
    it('should validate positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true)
      expect(isPositiveNumber(0.1)).toBe(true)
      expect(isPositiveNumber(1000)).toBe(true)
    })

    it('should reject non-positive numbers', () => {
      expect(isPositiveNumber(0)).toBe(false)
      expect(isPositiveNumber(-1)).toBe(false)
      expect(isPositiveNumber(NaN)).toBe(false)
    })
  })

  describe('isInRange', () => {
    it('should validate numbers in range', () => {
      expect(isInRange(5, 0, 10)).toBe(true)
      expect(isInRange(0, 0, 10)).toBe(true)
      expect(isInRange(10, 0, 10)).toBe(true)
    })

    it('should reject numbers outside range', () => {
      expect(isInRange(-1, 0, 10)).toBe(false)
      expect(isInRange(11, 0, 10)).toBe(false)
      expect(isInRange(NaN, 0, 10)).toBe(false)
    })
  })

  describe('isEmptyOrWhitespace', () => {
    it('should identify empty strings', () => {
      expect(isEmptyOrWhitespace('')).toBe(true)
      expect(isEmptyOrWhitespace('   ')).toBe(true)
      expect(isEmptyOrWhitespace('\t\n')).toBe(true)
    })

    it('should identify non-empty strings', () => {
      expect(isEmptyOrWhitespace('text')).toBe(false)
      expect(isEmptyOrWhitespace('  text  ')).toBe(false)
    })
  })

  describe('hasMinLength', () => {
    it('should validate minimum length', () => {
      expect(hasMinLength('hello', 3)).toBe(true)
      expect(hasMinLength('hello', 5)).toBe(true)
      expect(hasMinLength('  hello  ', 5)).toBe(true)
    })

    it('should reject strings below minimum length', () => {
      expect(hasMinLength('hi', 3)).toBe(false)
      expect(hasMinLength('', 1)).toBe(false)
    })
  })

  describe('hasMaxLength', () => {
    it('should validate maximum length', () => {
      expect(hasMaxLength('hello', 10)).toBe(true)
      expect(hasMaxLength('hello', 5)).toBe(true)
    })

    it('should reject strings above maximum length', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false)
    })
  })
})
