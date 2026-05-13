<template>
  <div class="blogDetailView">
    <template v-if="post">
      <section class="detailHero">
        <BaseContainer>
          <div class="heroContent">
            <p class="heroEyebrow">Blog Detail</p>
            <h1 class="heroTitle">{{ post.title }}</h1>
            <p class="heroText">{{ post.summary }}</p>
            <div class="metaRow">
              <span v-if="post.category" class="metaItem">{{ post.category }}</span>
              <span v-if="post.publishedAt" class="metaItem">{{ post.publishedAt }}</span>
              <span v-if="post.readingTime" class="metaItem">{{ post.readingTime }} min read</span>
            </div>
          </div>
        </BaseContainer>
      </section>
      <BaseSection
        class="articleSection"
        title="文章內容"
        description="這篇文章的重點整理與內容摘要。"
        compact
      >
        <article class="articleCard">
          <div class="articleContent">
            <div
              v-if="post.content"
              class="articleText markdownBody"
              v-html="htmlContent"
            ></div>
            <p v-else class="articleText">
              目前尚未補上完整文章內容，之後會持續整理。
            </p>
          </div>
        </article>
      </BaseSection>
    </template>
    <BaseSection v-else class="emptySection" compact>
      <EmptyState
        title="找不到這篇文章"
        description="可能是網址有誤，或這篇文章資料目前不存在。"
      >
        <template #action>
          <BaseButton tag="RouterLink" to="/blog">回到文章列表</BaseButton>
        </template>
      </EmptyState>
    </BaseSection>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSection from "@/components/ui/BaseSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import EmptyState from "@/components/common/EmptyState.vue";
import { mockPosts } from "@/data/mockPosts";
import { markdown } from "@/utils/markdown";
import type { Post } from "@/types/post";
const route = useRoute();
const post = computed<Post | undefined>(() => {
  const slug = String(route.params.slug || "");
  return mockPosts.find((item) => item.slug === slug);
});
const htmlContent = computed(() => {
  if(!post.value?.content) return "";
  return markdown.render(post.value.content);
});
</script>
<style scoped>
.blogDetailView{
  padding-top: var(--space8);
}
.detailHero{
  padding: var(--space12) 0 var(--space8);
}
.heroContent{
  display: flex;
  flex-direction: column;
  gap: var(--space4);
}
.heroEyebrow{
  font-size: var(--font2);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--firstColor);
}
.heroTitle{
  font-size: clamp(var(--font8), 10vw, var(--font10));
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.heroText{
  max-width: 760px;
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.metaRow{
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
}
.metaItem{
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(61, 90, 90, 0.08);
  font-size: var(--font2);
  color: var(--mainColor);
}
.coverSection{
  padding-bottom: var(--space8);
}
.coverCard,.articleCard{
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  box-shadow: var(--shadow1);
  transition: var(--transitionNormal);
}
.coverCard{
  overflow: hidden;
}
.coverImage{
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.articleCard{
  padding: var(--space6);
}
.articleContent{
  max-width: 820px;
}
.articleText{
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.articleText :deep(h2){
  margin-top: var(--space8);
  margin-bottom: var(--space3);
  font-size: var(--font6);
  line-height: var(--line2);
  color: var(--darkWordColor);
}
.articleText :deep(h3){
  margin-top: var(--space6);
  margin-bottom: var(--space2);
  font-size: var(--font5);
  line-height: var(--line2);
  color: var(--darkWordColor);
}
.articleText :deep(p){
  margin-bottom: var(--space4);
}
.articleText :deep(ul),.articleText :deep(ol){
  margin-bottom: var(--space4);
  padding-left: var(--space5);
}
.articleText :deep(li + li){
  margin-top: var(--space2);
}
.articleText :deep(a){
  color: var(--mainColor);
  text-decoration: underline;
  text-underline-offset: 4px;
}
.articleText :deep(code){
  padding: 0.16em 0.36em;
  border-radius: var(--radius1);
  background: rgba(0, 0, 0, 0.06);
  font-size: 0.9em;
}
.articleText :deep(pre){
  margin: var(--space5) 0;
  padding: var(--space4);
  overflow-x: auto;
  border-radius: var(--radius2);
  background: #0f172a;
  /* 加上這行：確保 pre 區塊內的基礎文字顏色是白色 */
  color: #e2e8f0;
}
.articleText :deep(pre code){
  padding: 0;
  background: transparent;
  /* 繼承 pre 的白色，不讓它被外層覆蓋 */
  color: inherit;
}
/* highlight.js 語法高亮顏色（對應 github-dark 風格） */
.articleText :deep(.hljs-keyword),
.articleText :deep(.hljs-selector-tag),
.articleText :deep(.hljs-built_in) {
  color: #ff7b72;
}

.articleText :deep(.hljs-string),
.articleText :deep(.hljs-attr) {
  color: #a5d6ff;
}

.articleText :deep(.hljs-comment) {
  color: #8b949e;
  font-style: italic;
}

.articleText :deep(.hljs-number),
.articleText :deep(.hljs-literal) {
  color: #79c0ff;
}

.articleText :deep(.hljs-function),
.articleText :deep(.hljs-title) {
  color: #d2a8ff;
}

.articleText :deep(.hljs-variable),
.articleText :deep(.hljs-params) {
  color: #ffa657;
}

.articleText :deep(.hljs-type) {
  color: #ff7b72;
}
@media(width>768px){
  .blogDetailView{
    padding-top: var(--space10);
  }
  .detailHero{
    padding: var(--space16) 0 var(--space10);
  }
  .heroText{
    font-size: var(--font4);
  }
  .coverCard:hover,.articleCard:hover{
    transform: translateY(-4px);
    box-shadow: var(--shadow2);
  }
}
</style>