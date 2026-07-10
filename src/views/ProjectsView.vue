<template>
  <div class="projectsView">
    <PageHero
      eyebrow="Projects"
      title="作品集"
      description="這裡整理我目前的前端實作作品，包含介面切版、元件拆分、資料驅動 UI、Router 規劃與整體開發思路。"
    />
    <section class="projectFilterSection">
      <BaseContainer>
        <div v-if="activeFilters.length" class="filterChips">
          <button
            v-for="chip in activeFilters"
            :key="chip.key + chip.value"
            type="button"
            class="chip"
            @click="removeFilter(chip)"
          >
            {{ chip.label }} ×
          </button>
        </div>
        <FilterPanel
          v-model:search-value="searchValue"
          search-label="搜尋作品"
          search-placeholder="輸入關鍵字，例如 Vue、Vite、Pinia..."
          :selects="projectSelects"
          @update:select="handleSelectChange"
        >
          <template #actions>
            <button class="emptyActionButton" @click="resetFilters">清除篩選</button>
          </template>
        </FilterPanel>
      </BaseContainer>
    </section>
    <BaseSection title="作品列表" description="整理我目前完成與持續優化中的前端專案">
      <div v-if="filteredProjects.length" class="projectGrid">
        <ProjectCard v-for="project in filteredProjects" :key="project.slug" :project="project" />
      </div>
      <EmptyState
        v-else
        title="找不到符合的作品"
        description="可以試著清除篩選，或換一組關鍵字搜尋。"
      >
        <template #action>
          <button type="button" class="emptyActionButton" @click="resetFilters">清除篩選</button>
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
import ProjectCard from '@/components/project/ProjectCard.vue'
import { useFilter } from '@/composables/useFilter'
import { projects } from '@/data/projects'
// 🔹 options
const techOptions = () => {
  const set = new Set(projects.flatMap((p) => p.techStack ?? []))
  return [
    { label: '全部', value: 'all' },
    ...Array.from(set).map((tech) => ({
      label: tech,
      value: tech,
    })),
  ]
}
// 只呼叫一次 useFilter
const filter = useFilter({
  data: projects,
  searchFields: ['title', 'summary', 'description', 'techStack'],
  selectConfigs: [
    {
      key: 'tech',
      label: '技術',
      defaultValue: 'all',
      getOptions: techOptions,
      filterFn: (project, value) => {
        if (value === 'all') return true
        return project.techStack?.includes(value) ?? false
      },
    },
  ],
})
// 解構
const {
  searchValue,
  selects: projectSelects,
  filtered: filteredProjects,
  setSelect,
  resetFilters,
  activeFilters,
} = filter
// 型別(從 filter 拿)
type SelectKey = typeof filter._types.SelectKey
// handler(完全型別安全)
function handleSelectChange(payload: { key: SelectKey; value: string }) {
  setSelect(payload.key, payload.value)
}
function removeFilter(chip: { key: SelectKey; value: string }) {
  if (chip.key === 'keyword') {
    searchValue.value = ''
    return
  }
  setSelect(chip.key, 'all')
}
</script>

<style scoped>
.projectsView {
  padding-top: var(--space8);
}
.projectFilterSection {
  padding: var(--space4) 0 var(--space6);
}
.projectGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space5);
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
  .projectsView {
    padding-top: var(--space10);
  }
  .projectGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .chip:hover {
    background: rgba(0, 0, 0, 0.12);
  }
  .emptyActionButton:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow2);
  }
}
</style>
