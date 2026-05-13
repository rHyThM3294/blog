import { ref, watch } from 'vue'
import { getFromStorage, saveToStorage } from '../utils/storage'

/**
 * Vue 3 Composable: 將響應式數據與 localStorage 同步
 * @example
 * const { value, update } = useLocalStorage('key', 'default')
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const value = ref<T>(getFromStorage(key) ?? defaultValue)

  const update = (newValue: T) => {
    value.value = newValue
    saveToStorage(key, newValue)
  }

  // 監聽值的變化
  watch(
    () => value.value,
    (newVal) => {
      saveToStorage(key, newVal)
    },
    { deep: true }
  )

  return {
    value,
    update,
  }
}
