<template>
  <section class="filterPanel">
    <div
      class="filterGrid"
      :style="gridStyle"
    >
      <label class="searchField">
        <span class="fieldLabel">{{ searchLabel }}</span>
        <input
          class="searchInput"
          type="search"
          :value="searchValue"
          :placeholder="searchPlaceholder"
          @input="emitSearch"
        />
      </label>
      <label
        v-for="select in selects"
        :key="select.key"
        class="selectField"
      >
        <span class="fieldLabel">{{ select.label }}</span>
        <select
          class="selectInput"
          :value="select.modelValue"
          @change="emitSelect(select.key, $event)"
        >
          <option
            v-for="option in select.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
    </div>
    <div
      v-if="$slots.actions"
      class="filterActions"
    >
      <slot name="actions" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { FilterSelect } from '@/types/filter'
const props = withDefaults(
  defineProps<{
    searchValue: string
    searchLabel?: string
    searchPlaceholder?: string
    selects?: FilterSelect[]
  }>(),
  {
    searchLabel: '搜尋',
    searchPlaceholder: '請輸入關鍵字',
    selects: () => [],
  },
)
const emit = defineEmits<{
  'update:searchValue': [value: string]
  'update:select': [payload: { key: string; value: string }]
}>()
const gridStyle = computed(() => {
  const columnCount = Math.min(props.selects.length + 1, 3)
  return {
    '--filterColumnCount': columnCount,
  }
})
function emitSearch(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:searchValue', target.value)
}
function emitSelect(key: string, event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:select', {
    key,
    value: target.value,
  })
}
</script>
<style scoped>
.filterPanel{
  margin-top: var(--space6);
  padding: var(--space4);
  border: 1px solid var(--lineColor);
  border-radius: var(--radiusLg);
  background: var(--cardColor);
}
.filterGrid{
  display: grid;
  gap: var(--space4);
}
.searchField,.selectField{
  display: grid;
  gap: var(--space2);
}
.fieldLabel{
  font-size: var(--font2);
  font-weight: 700;
  color: var(--wordColor);
}
.searchInput,.selectInput{
  width: 100%;
  min-height: 44px;
  padding: 0 var(--space3);
  border: 1px solid var(--lineColor);
  border-radius: var(--radiusMd);
  background: #fff;
  color: var(--wordColor);
  font-size: var(--font3);
  outline: none;
}
.filterActions{
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space4);
}
@media (width>768px){
  .filterGrid{
    grid-template-columns: repeat(var(--filterColumnCount), minmax(0, 1fr));
    align-items: end;
  }
  .searchInput,.selectInput{
    transition: border-color var(--transitionNormal), box-shadow var(--transitionNormal);
  }
  .searchInput:hover,
  .selectInput:hover,
  .searchInput:focus,
  .selectInput:focus{
    border-color: var(--mainColor);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
  }
}
</style>