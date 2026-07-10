/**
 * 日期相關的工具函數
 */

/**
 * 格式化日期
 * @example
 * formatDate(new Date('2024-01-15')) // '2024年1月15日'
 */
export function formatDate(date: string | Date, format = 'zh'): string {
  const d = new Date(date)

  if (format === 'zh') {
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}年${month}月${day}日`
  }

  return d.toISOString().split('T')[0]
}

/**
 * 計算閱讀時間 (分鐘)
 * @example
 * calculateReadTime('Some content here...') // 1
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 判斷是否是過去的日期
 */
export function isPastDate(date: string | Date): boolean {
  return new Date(date) < new Date()
}
