<template>
  <div class="projectDetailView">
    <template v-if="project">
      <section class="detailHero">
        <BaseContainer>
          <div class="heroContent">
            <p class="heroEyebrow">Project Detail</p>
            <h1 class="heroTitle">
              {{ project.title }}
            </h1>
            <p class="heroText">
              {{ project.summary }}
            </p>
            <div v-if="project.period || project.role" class="metaRow">
              <span v-if="project.period" class="metaItem">
                {{ project.period }}
              </span>
              <span v-if="project.role" class="metaItem">
                {{ project.role }}
              </span>
            </div>
          </div>
        </BaseContainer>
      </section>
      <section class="coverSection">
        <BaseContainer>
          <div class="coverCard" :class="{ coverCardContain: project.coverFit === 'contain' }">
            <img
              v-if="project.cover"
              :src="project.cover"
              :alt="project.title"
              class="coverImage"
              :class="{ coverImageContain: project.coverFit === 'contain' }"
            />
            <div v-else class="coverPlaceholder">
              {{ project.title }}
            </div>
          </div>
        </BaseContainer>
      </section>
      <BaseSection
        class="contentSection"
        title="專案介紹"
        description="整理這個作品的核心方向、實作內容與開發思考。"
        compact
      >
        <div class="contentLayout">
          <article class="mainCard">
            <div class="textBlock">
              <h2 class="blockTitle">專案描述</h2>
              <p class="bodyText">
                {{ project.description || project.summary }}
              </p>
            </div>
            <div class="textBlock">
              <h2 class="blockTitle">內容說明</h2>
              <p class="bodyText">
                {{ project.content || '目前尚未補上更完整的專案內容，之後會持續整理。' }}
              </p>
            </div>
          </article>
          <aside class="sideCard">
            <div class="infoGroup">
              <p class="infoTitle">技術堆疊</p>
              <ul v-if="project.techStack?.length" class="tagList">
                <li v-for="tech in project.techStack" :key="tech" class="tagItem">
                  {{ tech }}
                </li>
              </ul>
              <p v-else class="infoText">尚未提供技術標籤</p>
            </div>
            <div class="infoGroup">
              <p class="infoTitle">相關連結</p>
              <div class="actionList">
                <BaseButton v-if="project.demoUrl" tag="a" :href="project.demoUrl">
                  查看 Demo
                </BaseButton>
                <BaseButton
                  v-if="project.repoUrl"
                  tag="a"
                  :href="project.repoUrl"
                  variant="secondary"
                >
                  查看 Repo
                </BaseButton>
                <p v-if="!project.demoUrl && !project.repoUrl" class="infoText">
                  目前尚未提供外部連結
                </p>
              </div>
            </div>
          </aside>
        </div>
      </BaseSection>
    </template>
    <BaseSection v-else class="emptySection" compact>
      <EmptyState title="找不到這個作品" description="可能是網址有誤，或這筆作品資料目前不存在。">
        <template #action>
          <BaseButton tag="RouterLink" to="/projects"> 回到作品列表 </BaseButton>
        </template>
      </EmptyState>
    </BaseSection>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import BaseSection from '@/components/ui/BaseSection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
const route = useRoute()
const project = computed<Project | undefined>(() => {
  const slug = String(route.params.slug || '')
  return projects.find((item) => item.slug === slug)
})
</script>
<style scoped>
.projectDetailView {
  padding-top: var(--space8);
}
.detailHero {
  padding: var(--space12) 0 var(--space8);
}
.heroContent {
  display: flex;
  flex-direction: column;
  gap: var(--space4);
}
.heroEyebrow {
  font-size: var(--font2);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--firstColor);
}
.heroTitle {
  font-size: clamp(var(--font8), 10vw, var(--font10));
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.heroText {
  max-width: 760px;
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.metaRow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
}
.metaItem {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(61, 90, 90, 0.08);
  font-size: var(--font2);
  color: var(--mainColor);
}
.coverSection {
  padding-bottom: var(--space8);
}
.coverCard,
.mainCard,
.sideCard {
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  box-shadow: var(--shadow1);
  transition: var(--transitionNormal);
}
.coverCard {
  overflow: hidden;
}
.coverCardContain {
  background: var(--mainColor);
}
.coverImage {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.coverImageContain {
  object-fit: contain;
}
.coverPlaceholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  padding: var(--space6);
  background: linear-gradient(135deg, #dce8e5 0%, #eef4f2 100%);
  color: var(--mainColor);
  font-size: var(--font6);
  font-weight: 700;
  text-align: center;
}
.contentLayout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space5);
}
.mainCard,
.sideCard {
  padding: var(--space6);
}
.textBlock + .textBlock {
  margin-top: var(--space6);
}
.blockTitle {
  font-size: var(--font5);
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.bodyText {
  margin-top: var(--space3);
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
  white-space: pre-line;
}
.infoGroup + .infoGroup {
  margin-top: var(--space6);
}
.infoTitle {
  font-size: var(--font4);
  font-weight: 700;
  color: var(--darkWordColor);
}
.infoText {
  margin-top: var(--space3);
  font-size: var(--font3);
  line-height: var(--line2);
  color: var(--lightWordColor);
}
.tagList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space2);
  margin-top: var(--space3);
}
.tagItem {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(61, 90, 90, 0.08);
  font-size: var(--font2);
  color: var(--mainColor);
}
.actionList {
  display: flex;
  flex-direction: column;
  gap: var(--space3);
  margin-top: var(--space3);
}
@media (min-width: 768px) {
  .projectDetailView {
    padding-top: var(--space10);
  }
  .detailHero {
    padding: var(--space16) 0 var(--space10);
  }
  .heroText {
    font-size: var(--font4);
  }
  .contentLayout {
    grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
    align-items: start;
  }
  .coverCard:hover,
  .mainCard:hover,
  .sideCard:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow2);
  }
}
</style>
