<template>
  <section class="baseSection" :class="{ compact }">
    <BaseContainer>
      <div v-if="title || description" class="sectionHead">
        <h2 v-if="title" class="sectionTitle">{{ title }}</h2>
        <p v-if="description" class="sectionDesc">{{ description }}</p>
      </div>
      <div class="sectionBody"><slot></slot></div>
    </BaseContainer>
  </section>
</template>
<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'

defineProps<{
  title?: string
  description?: string
  compact?: boolean
}>()
</script>
<style scoped>
.baseSection {
  padding: var(--space16) 0;
}
.baseSection.compact {
  padding: var(--space12) 0;
}
.sectionHead {
  margin-bottom: var(--space8);
}
.sectionTitle {
  font-size: clamp(var(--font7), 4vw, var(--font10));
  line-height: var(--line1);
  color: var(--darkWordColor);
  font-weight: 700;
}
.sectionDesc {
  max-width: 720px;
  margin-top: var(--space4);
  font-size: var(--font4);
  line-height: var(--line2);
  color: var(--lightWordColor);
}
.sectionBody {
  width: 100%;
}
</style>
