import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThemeMode } from '../types/app'
export const useAppStore = defineStore('app', () => {
  const theme = ref<ThemeMode>('light')
  const sidebarOpen = ref(false)
  const pageLoading = ref(false)
  function setTheme(mode: ThemeMode) {
    theme.value = mode
  }
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }
  function setSidebarOpen(value: boolean) {
    sidebarOpen.value = value
  }
  function setPageLoading(value: boolean) {
    pageLoading.value = value
  }
  return {
    theme,
    sidebarOpen,
    pageLoading,
    setTheme,
    toggleSidebar,
    setSidebarOpen,
    setPageLoading,
  }
})
