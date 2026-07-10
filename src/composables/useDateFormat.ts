/**
 * Vue 3 Composable: 日期格式化相關功能
 */
export function useDateFormat() {
  /**
   * 格式化日期為 YYYY-MM-DD
   */
  const formatDateISO = (date: string | Date): string => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  /**
   * 格式化日期為繁體中文格式
   * @example
   * formatDateZH(new Date('2024-01-15')) // '2024年1月15日'
   */
  const formatDateZH = (date: string | Date): string => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}年${month}月${day}日`
  }

  /**
   * 格式化日期為相對時間
   * @example
   * formatDateRelative(new Date(Date.now() - 3600000)) // '1 小時前'
   */
  const formatDateRelative = (date: string | Date): string => {
    const d = new Date(date)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (seconds < 60) return '剛剛'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} 分鐘前`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小時前`
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} 天前`

    return formatDateZH(date)
  }

  /**
   * 獲取本週、本月、本年的日期範圍
   */
  const getDateRange = (type: 'week' | 'month' | 'year') => {
    const now = new Date()
    const start = new Date()

    switch (type) {
      case 'week':
        start.setDate(now.getDate() - now.getDay())
        break
      case 'month':
        start.setDate(1)
        break
      case 'year':
        start.setMonth(0)
        start.setDate(1)
        break
    }

    return {
      start: formatDateISO(start),
      end: formatDateISO(now),
    }
  }

  return {
    formatDateISO,
    formatDateZH,
    formatDateRelative,
    getDateRange,
  }
}
