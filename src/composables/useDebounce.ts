import { ref, watch, type Ref } from "vue"
export function useDebounce<T>(value: Ref<T>, delay = 300){
  const debounced = ref(value.value) as Ref<T>
  let timer: number | undefined
  watch(value, (newVal) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      debounced.value = newVal
    }, delay)
  })

  return debounced
}