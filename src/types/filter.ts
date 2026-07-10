export interface FilterOption {
  label: string
  value: string
}
export interface FilterSelect {
  key: string
  label: string
  modelValue: string
  options: FilterOption[]
}
