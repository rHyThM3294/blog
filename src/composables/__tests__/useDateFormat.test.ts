import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDateFormat } from '../useDateFormat'

describe('useDateFormat', () => {
  const { formatDateISO, formatDateZH, formatDateRelative, getDateRange } = useDateFormat()

  it('formatDateISO 回傳 YYYY-MM-DD 格式', () => {
    expect(formatDateISO(new Date('2024-01-15'))).toBe('2024-01-15')
  })

  it('formatDateZH 回傳繁體中文日期格式', () => {
    expect(formatDateZH(new Date('2024-01-15'))).toBe('2024年1月15日')
  })

  describe('formatDateRelative', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-15T12:00:00'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('30 秒前顯示「剛剛」', () => {
      const date = new Date('2024-06-15T11:59:30')
      expect(formatDateRelative(date)).toBe('剛剛')
    })

    it('5 分鐘前顯示「5 分鐘前」', () => {
      const date = new Date('2024-06-15T11:55:00')
      expect(formatDateRelative(date)).toBe('5 分鐘前')
    })

    it('3 小時前顯示「3 小時前」', () => {
      const date = new Date('2024-06-15T09:00:00')
      expect(formatDateRelative(date)).toBe('3 小時前')
    })

    it('超過 30 天則改用完整日期格式', () => {
      const date = new Date('2024-01-01T12:00:00')
      expect(formatDateRelative(date)).toBe(formatDateZH(date))
    })
  })

  describe('getDateRange', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-06-15T12:00:00'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('type 為 month 時 start 為當月 1 號', () => {
      expect(getDateRange('month')).toEqual({ start: '2024-06-01', end: '2024-06-15' })
    })

    it('type 為 year 時 start 為當年 1 月 1 號', () => {
      expect(getDateRange('year')).toEqual({ start: '2024-01-01', end: '2024-06-15' })
    })
  })
})
