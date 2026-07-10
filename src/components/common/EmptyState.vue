<template>
  <div class="emptyState">
    <div class="emptyContent">
      <div v-if="$slots.icon" class="iconWrap">
        <slot name="icon" />
      </div>
      <p class="emptyTitle">{{ title }}</p>
      <p v-if="description" class="emptyText">
        {{ description }}
      </p>
      <div v-if="$slots.action" class="actionWrap">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>
<style scoped>
.emptyState {
  padding: var(--space8);
  border-radius: var(--radius2);
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: var(--shadow1);
}
.emptyContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space3);
}
.iconWrap {
  margin-bottom: var(--space2);
}
.emptyTitle {
  font-size: var(--font5);
  font-weight: 700;
  color: var(--darkWordColor);
}
.emptyText {
  font-size: var(--font3);
  line-height: var(--line2);
  color: var(--lightWordColor);
}
.actionWrap {
  margin-top: var(--space4);
}
</style>
