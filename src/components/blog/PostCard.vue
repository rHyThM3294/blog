<template>
  <RouterLink :to="`/blog/${post.slug}`" class="postCard">
    <h3 class="postTitle">{{ post.title }}</h3>
    <p class="postSummary">
      {{ post.summary }}
    </p>
    <div class="postMeta">
      <span class="postDate">
        {{ post.publishedAt }}
      </span>
      <span v-if="post.readingTime" class="postReadTime"> {{ post.readingTime }}分鐘 </span>
    </div>
    <span class="readMore">閱讀更多</span>
  </RouterLink>
</template>
<script setup lang="ts">
import type { Post } from '@/types/post'
defineProps<{
  post: Post
}>()
</script>
<style scoped>
.postCard {
  display: block;
  padding: var(--space5);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  background: var(--white);
  box-shadow: var(--shadow1);
  text-decoration: none;
  cursor: pointer;
}
.postTitle {
  margin-bottom: var(--space2);
  font-size: var(--font5);
  color: var(--darkWordColor);
}
.postSummary {
  margin: 0;
  color: var(--lightWordColor);
  line-height: var(--line3);
}
.postMeta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
  margin-top: var(--space3);
  font-size: var(--font2);
  color: var(--lightWordColor);
}
.readMore {
  display: inline-block;
  margin-top: var(--space4);
  color: var(--mainColor);
  font-weight: 700;
  transition: var(--transitionNormal);
}
@media (width>768px) {
  .postCard {
    transition: var(--transitionNormal);
  }
  .postCard:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow2);
  }
  .postCard:hover .readMore {
    color: var(--firstColor);
  }
}
</style>
