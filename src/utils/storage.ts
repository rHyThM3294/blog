/**
 * Local Storage 相關的工具函數
 */

/**
 * 從 localStorage 讀取數據
 */
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from storage: ${key}`, error)
    return null
  }
}

/**
 * 將數據保存到 localStorage
 */
export function saveToStorage(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error saving to storage: ${key}`, error)
    return false
  }
}

/**
 * 從 localStorage 刪除數據
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from storage: ${key}`, error)
    return false
  }
}

/**
 * 清空 localStorage
 */
export function clearStorage(): boolean {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing storage', error)
    return false
  }
}
