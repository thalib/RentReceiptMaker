import { describe, it, expect } from 'vitest'
import {
  formatDate,
  parseDate,
  formatDateRange,
  isValidDate,
  isDateInFuture,
  isDateInPast,
  getDaysBetween,
} from '../date'

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date as DD-MMM-YYYY by default', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toBe('15-Jan-2024')
    })

    it('should format date as DD/MM/YYYY when specified', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/01/2024')
    })

    it('should handle single digit dates', () => {
      const date = new Date('2024-03-05')
      expect(formatDate(date)).toBe('05-Mar-2024')
    })

    it('should handle invalid dates', () => {
      expect(formatDate(new Date('invalid'))).toBe('')
    })
  })

  describe('parseDate', () => {
    it('should parse valid date strings', () => {
      const result = parseDate('2024-01-15')
      expect(result).toBeInstanceOf(Date)
      expect(isValidDate(result!)).toBe(true)
    })

    it('should return null for invalid dates', () => {
      expect(parseDate('invalid')).toBeNull()
      expect(parseDate('')).toBeNull()
    })
  })

  describe('formatDateRange', () => {
    it('should format same month range', () => {
      const start = new Date('2024-01-01')
      const end = new Date('2024-01-31')
      expect(formatDateRange(start, end)).toBe('01-31 Jan 2024')
    })

    it('should format same year range', () => {
      const start = new Date('2024-01-15')
      const end = new Date('2024-02-15')
      expect(formatDateRange(start, end)).toBe('15 Jan - 15 Feb 2024')
    })

    it('should format different year range', () => {
      const start = new Date('2023-12-01')
      const end = new Date('2024-01-31')
      expect(formatDateRange(start, end)).toBe('01-Dec-2023 to 31-Jan-2024')
    })

    it('should handle invalid dates', () => {
      expect(formatDateRange(new Date('invalid'), new Date())).toBe('')
    })
  })

  describe('isValidDate', () => {
    it('should validate correct dates', () => {
      expect(isValidDate(new Date())).toBe(true)
      expect(isValidDate(new Date('2024-01-15'))).toBe(true)
    })

    it('should reject invalid dates', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false)
      expect(isValidDate('2024-01-15')).toBe(false)
      expect(isValidDate(null)).toBe(false)
    })
  })

  describe('isDateInFuture', () => {
    it('should identify future dates', () => {
      const future = new Date()
      future.setFullYear(future.getFullYear() + 1)
      expect(isDateInFuture(future)).toBe(true)
    })

    it('should identify non-future dates', () => {
      const past = new Date('2020-01-01')
      expect(isDateInFuture(past)).toBe(false)
    })
  })

  describe('isDateInPast', () => {
    it('should identify past dates', () => {
      const past = new Date('2020-01-01')
      expect(isDateInPast(past)).toBe(true)
    })

    it('should identify non-past dates', () => {
      const future = new Date()
      future.setFullYear(future.getFullYear() + 1)
      expect(isDateInPast(future)).toBe(false)
    })
  })

  describe('getDaysBetween', () => {
    it('should calculate days between dates', () => {
      const start = new Date('2024-01-01')
      const end = new Date('2024-01-31')
      expect(getDaysBetween(start, end)).toBe(30)
    })

    it('should handle same date', () => {
      const date = new Date('2024-01-15')
      expect(getDaysBetween(date, date)).toBe(0)
    })

    it('should handle invalid dates', () => {
      expect(getDaysBetween(new Date('invalid'), new Date())).toBe(0)
    })
  })
})
