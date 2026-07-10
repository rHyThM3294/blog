<template>
  <div class="blogView">
    <PageHero
      eyebrow="Blog"
      title="技術文章"
      description="這裡會整理我在 Vue、前端開發、專案實作與學習過程中的筆記與思考，讓作品不只是展示，也能呈現自己的成長脈絡。"
    />
    <section class="blogFilterSection">
      <BaseContainer>
        <div v-if="filter.activeFilters.value.length" class="filterChips">
          <button
            v-for="chip in filter.activeFilters.value"
            :key="chip.key + chip.value"
            type="button"
            class="chip"
            @click="removeChip(chip)"
          >
            {{ chip.label }}：{{ chip.value }} ×
          </button>
        </div>
        <FilterPanel
          :search-value="filter.searchValue.value"
          search-label="搜尋文章"
          search-placeholder="輸入關鍵字，例如 Vue、Pinia..."
          :selects="filter.selects.value"
          @update:select="({ key, value }) => filter.setSelect(key, value)"
        >
          <template #actions>
            <button class="resetButton" @click="filter.resetFilters">清除篩選</button>
          </template>
        </FilterPanel>
      </BaseContainer>
    </section>
    <BaseSection title="所有文章" description="整理前端開發、Vue、TypeScript與專案時做筆記。">
      <div v-if="filter.paginated.value.length" class="postGrid">
        <PostCard v-for="post in filter.paginated.value" :key="post.slug" :post="post" />
      </div>
      <EmptyState
        v-else
        title="找不到符合條件的文章"
        description="可以試著清除篩選，或換一組關鍵字搜尋。"
      >
        <template #action>
          <button type="button" class="emptyActionButton" @click="filter.resetFilters">
            清除篩選
          </button>
        </template>
      </EmptyState>
    </BaseSection>
  </div>
</template>
<script setup lang="ts">
import PageHero from '@/components/common/PageHero.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import BaseSection from '@/components/ui/BaseSection.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import FilterPanel from '@/components/common/FilterPanel.vue'
import PostCard from '@/components/blog/PostCard.vue'
import { useFilter } from '@/composables/useFilter'
import { mockPosts } from '@/data/mockPosts'
import { computed } from 'vue'

// 分類 options（使用 computed 快取結果）
const categoryOptions = computed(() => {
  const categories = mockPosts.map((p) => p.category).filter((c): c is string => Boolean(c))
  const set = new Set(categories)
  return [
    { label: '全部', value: 'all' },
    ...Array.from(set).map((c) => ({
      label: c,
      value: c,
    })),
  ]
})
const tagOptions = computed(() => {
  const set = new Set(mockPosts.flatMap((p) => p.tags))
  return [
    { label: '全部', value: 'all' },
    ...Array.from(set).map((t) => ({
      label: t,
      value: t,
    })),
  ]
})
// 只呼叫一次 useFilter(重點)
const filter = useFilter({
  data: mockPosts,
  searchFields: ['title', 'summary', 'category', 'tags'],
  selectConfigs: [
    {
      key: 'category',
      label: '分類',
      defaultValue: 'all',
      getOptions: () => categoryOptions.value,
      filterFn: (post, value) => {
        if (value === 'all') return true
        return post.category === value
      },
    },
    {
      key: 'tag',
      label: '標籤',
      defaultValue: 'all',
      getOptions: () => tagOptions.value,
      filterFn: (post, value) => {
        if (value === 'all') return true
        return post.tags?.includes(value) ?? false
      },
    },
  ],
})
type SelectKey = typeof filter._types.SelectKey
function removeChip(chip: { key: SelectKey | 'keyword'; label: string; value: string }) {
  if (chip.key === 'keyword') {
    filter.searchValue.value = ''
    return
  }
  filter.setSelect(chip.key as SelectKey, 'all')
}
</script>
<style scoped>
.blogView {
  padding-top: var(--space8);
}
.blogFilterSection {
  padding: var(--space4) 0 var(--space6);
}
.filterChips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space2);
  margin-bottom: var(--space3);
}
.chip {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: var(--radius2);
  background: rgba(0, 0, 0, 0.06);
  font-size: var(--font2);
  cursor: pointer;
  transition: var(--transitionNormal);
}
.fieldLabel {
  font-size: var(--font2);
  font-weight: 700;
  color: var(--darkWordColor);
}
.resetButton,
.emptyActionButton {
  min-height: 44px;
  padding: 0 var(--space4);
  border: 0;
  border-radius: var(--radius2);
  background: var(--mainColor);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
  transition: var(--transitionNormal);
}
@media (width>768px) {
  .blogView {
    padding-top: var(--space10);
  }
  .chip:hover {
    background: rgba(0, 0, 0, 0.12);
  }
  .resetButton:hover,
  .emptyActionButton:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow2);
  }
}
</style>
