import { computed, ref, type Ref, watch, nextTick, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useDebounce } from "@/composables/useDebounce"

/* ========================
   型別
======================== */

export interface SelectOption {
  label: string
  value: string
}

interface BaseSelectConfig<T, K extends string> {
  key: K
  label: string
  defaultValue: string
  getOptions: () => SelectOption[]
  filterFn: (item: T, value: string) => boolean
}

interface SortConfig<T> {
  key: string
  label: string
  compare: (a: T, b: T) => number
}

/* ========================
   主 composable
======================== */

export function useFilter<
  T,
  TConfigs extends readonly BaseSelectConfig<T, any>[]
>(options: {
  data: T[]
  searchFields: (keyof T)[]
  selectConfigs: TConfigs
  sortConfigs?: SortConfig<T>[]
}) {
  const route = useRoute()
  const router = useRouter()

  /* ========================
     基本狀態
  ======================== */

  const searchValue = ref("")
  const debouncedSearch = useDebounce(searchValue, 300)

  type SelectKey = TConfigs[number]["key"]

  const selectState = Object.fromEntries(
    options.selectConfigs.map((config) => [
      config.key,
      ref(config.defaultValue),
    ])
  ) as {
    [K in SelectKey]: Ref<string>
  }
  const sortKey = ref(options.sortConfigs?.[0]?.key || "")
  const currentPage = ref(1)
  const pageSize = ref(6)
  onMounted(() => {
    searchValue.value = (route.query.keyword as string) || ""
    options.selectConfigs.forEach((config) => {
      const key = config.key as SelectKey
      const queryValue = route.query[key] as string
      if (queryValue) {
        selectState[key].value = queryValue
      }
    })
    if (route.query.page) {
      currentPage.value = Number(route.query.page)
    }
  })
  const selects = computed(() =>
    options.selectConfigs.map((config) => {
      const key = config.key as SelectKey
      return {
        key,
        label: config.label,
        modelValue: selectState[key].value,
        options: config.getOptions(),
      }
    })
  )
  const filtered = computed(() => {
    let result = options.data.filter((item) => {
      const keyword = debouncedSearch.value.toLowerCase()
      const matchKeyword =
        !keyword ||
        options.searchFields.some((field) =>
          String(item[field])
            .toLowerCase()
            .includes(keyword)
        )
      if (!matchKeyword) return false

      return options.selectConfigs.every((config) => {
        const key = config.key as SelectKey
        const value = selectState[key].value
        if (value === config.defaultValue) return true
        return config.filterFn(item, value)
      })
    })
    if (options.sortConfigs && sortKey.value) {
      const sorter = options.sortConfigs.find(
        (s) => s.key === sortKey.value
      )
      if (sorter) {
        result = [...result].sort(sorter.compare)
      }
    }

    return result
  })

  /* ========================
     分頁處理
  ======================== */

  const total = computed(() => filtered.value.length)

  const paginated = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filtered.value.slice(start, start + pageSize.value)
  })

  /* ========================
     URL 同步
  ======================== */

  const isFromRoute = ref(false)

  watch(
    () => route.query,
    (query) => {
      isFromRoute.value = true

      searchValue.value = (query.keyword as string) || ""
      // ...其他同步

      nextTick(() => {
        isFromRoute.value = false
      })
    }
  )

  watch(
    [searchValue, ...Object.values(selectState), sortKey, currentPage],
    () => {
      if (isFromRoute.value) return

      const query: Record<string, string> = {}
      if (searchValue.value) query.keyword = searchValue.value
      options.selectConfigs.forEach((config) => {
        const key = config.key as SelectKey
        const value = selectState[key].value
        if (value !== config.defaultValue) {
          query[key as string] = value
        }
      })
      if (sortKey.value) query.sort = sortKey.value
      if (currentPage.value > 1) query.page = String(currentPage.value)

      router.replace({ query })
    }
  )

  /* ========================
     actions
  ======================== */

  function setSelect<K extends SelectKey>(key: K, value: string) {
    selectState[key].value = value
    currentPage.value = 1
  }

  function removeFilter(key: SelectKey) {
    const config = options.selectConfigs.find((c) => c.key === key)
    if (!config) return
    selectState[key].value = config.defaultValue
  }

  function resetFilters() {
    searchValue.value = ""
    options.selectConfigs.forEach((config) => {
      const key = config.key as SelectKey
      selectState[key].value = config.defaultValue
    })
    currentPage.value = 1
  }

  /* ========================
     filter chips
  ======================== */

  const activeFilters = computed(() => {
    const result: {
      key: SelectKey
      label: string
      value: string
    }[] = []

    options.selectConfigs.forEach((config) => {
      const key = config.key as SelectKey
      const value = selectState[key].value

      if (value !== config.defaultValue) {
        result.push({
          key,
          label: config.label,
          value,
        })
      }
    })

    if (debouncedSearch.value) {
      result.push({
        key: "keyword" as SelectKey,
        label: "搜尋",
        value: debouncedSearch.value,
      })
    }

    return result
  })

  /* ========================
     回傳
  ======================== */

  return {
    // state
    searchValue,
    selectState,
    sortKey,
    currentPage,
    pageSize,

    // UI
    selects,
    activeFilters,

    // data
    filtered,
    paginated,
    total,

    // actions
    setSelect,
    removeFilter,
    resetFilters,

    _types: {} as {
      SelectKey: TConfigs[number]["key"]
    }
  }
}