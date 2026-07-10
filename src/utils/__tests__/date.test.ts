import { describe, it, expect } from 'vitest'
import { formatDate, calculateReadTime, isPastDate } from '../date'

describe('formatDate', () => {
  it('預設格式化為繁體中文日期', () => {
    expect(formatDate(new Date('2024-01-15'))).toBe('2024年1月15日')
  })

  it('format 為 iso 時回傳 YYYY-MM-DD', () => {
    expect(formatDate(new Date('2024-01-15'), 'iso')).toBe('2024-01-15')
  })

  it('接受字串日期輸入', () => {
    expect(formatDate('2024-03-01')).toBe('2024年3月1日')
  })
})

describe('calculateReadTime', () => {
  it('依 200 字/分鐘無條件進位計算閱讀時間', () => {
    const content = Array(199).fill('word').join(' ')
    expect(calculateReadTime(content)).toBe(1)
  })

  it('超過 200 字時進位到下一分鐘', () => {
    const content = Array(201).fill('word').join(' ')
    expect(calculateReadTime(content)).toBe(2)
  })
})

describe('isPastDate', () => {
  it('過去日期回傳 true', () => {
    expect(isPastDate('2000-01-01')).toBe(true)
  })

  it('未來日期回傳 false', () => {
    expect(isPastDate('2999-01-01')).toBe(false)
  })
})
