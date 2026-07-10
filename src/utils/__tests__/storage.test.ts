import { describe, it, expect, beforeEach } from 'vitest'
import { getFromStorage, saveToStorage, removeFromStorage, clearStorage } from '../storage'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saveToStorage 後可用 getFromStorage 讀回相同資料', () => {
    saveToStorage('user', { name: 'Titanium' })
    expect(getFromStorage<{ name: string }>('user')).toEqual({ name: 'Titanium' })
  })

  it('讀取不存在的 key 回傳 null', () => {
    expect(getFromStorage('missing')).toBeNull()
  })

  it('removeFromStorage 後該筆資料讀不到', () => {
    saveToStorage('temp', 'value')
    removeFromStorage('temp')
    expect(getFromStorage('temp')).toBeNull()
  })

  it('clearStorage 清空所有資料', () => {
    saveToStorage('a', 1)
    saveToStorage('b', 2)
    clearStorage()
    expect(getFromStorage('a')).toBeNull()
    expect(getFromStorage('b')).toBeNull()
  })

  it('儲存損毀的 JSON 時 getFromStorage 回傳 null 而不拋出例外', () => {
    localStorage.setItem('broken', '{not valid json')
    expect(getFromStorage('broken')).toBeNull()
  })
})
