<template>
  <BaseCard>
    <RouterLink :to="`/projects/${project.slug}`" class="projectCard">
      <div class="imageWrap">
        <img v-if="project.cover" :src="project.cover" :alt="project.title" class="projectImage" />
        <div v-else class="projectPlaceholder">
          {{ project.title }}
        </div>
      </div>
      <div class="cardBody">
        <p class="projectMeta">{{ project.period || '作品專案' }}</p>
        <h3 class="projectTitle">{{ project.title }}</h3>
        <p class="projectSummary">{{ project.summary }}</p>
        <ul v-if="project.techStack?.length" class="tagList">
          <li v-for="tech in displayTechStack" :key="tech" class="tagItem">
            {{ tech }}
          </li>
        </ul>
      </div>
    </RouterLink>
  </BaseCard>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import type { Project } from '@/types/project'
const props = defineProps<{
  project: Project
}>()
const displayTechStack = computed(() => {
  return props.project.techStack?.slice(0, 4) ?? []
})
</script>
<style scoped>
.projectCard {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.imageWrap {
  aspect-ratio: 16 / 10;
  background: var(--secondColor);
  overflow: hidden;
}
.projectImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transitionNormal);
}
.projectPlaceholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--space4);
  font-size: var(--font4);
  font-weight: 700;
  text-align: center;
  color: var(--mainColor);
  background: linear-gradient(135deg, #dce8e5 0%, #eef4f2 100%);
}
.cardBody {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space3);
  padding: var(--space5);
}
.projectMeta {
  font-size: var(--font2);
  color: var(--lightWordColor);
}
.projectTitle {
  font-size: var(--font5);
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.projectSummary {
  font-size: var(--font3);
  line-height: var(--line2);
  color: var(--lightWordColor);
}
.tagList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space2);
  margin-top: auto;
  padding-top: var(--space2);
}
.tagItem {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(61, 90, 90, 0.08);
  font-size: var(--font2);
  color: var(--mainColor);
}
@media (width>768px) {
  .projectCard:hover .projectImage {
    transform: scale(1.03);
  }
}
</style>
