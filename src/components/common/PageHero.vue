<template>
    <section class="pageHero">
        <BaseContainer>
            <div class="heroContent">
                <p v-if="eyebrow" class="heroEyebrow">{{ eyebrow }}</p>
                <h1 class="heroTitle">{{ title }}</h1>
                <p v-if="description" class="heroText">{{ description }}</p>
            </div>
        </BaseContainer>
    </section>
</template>
<script setup lang="ts">
import BaseContainer from '../ui/BaseContainer.vue';
defineProps<{
    title:string;
    eyebrow?:string;
    description?:string;
}>();
</script>
<style scoped>
.pageHero{
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
  max-width: 720px;
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
@media(min-width: 768px){
  .pageHero{
    padding: var(--space16) 0 var(--space10);
  }
  .heroText{
    font-size: var(--font4);
  }
}
</style>