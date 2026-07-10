<template>
  <div class="appLayout">
    <SiteHeader ref="headerRef" v-model:is-open="isMenuOpen" />
    <div v-if="isMenuOpen" class="overlay" @click="isMenuOpen = false" />
    <div ref="panelRef" class="mobilePanel">
      <RouterLink to="/about" @click="isMenuOpen = false">About</RouterLink>
      <RouterLink to="/projects" @click="isMenuOpen = false">Projects</RouterLink>
      <RouterLink to="/blog" @click="isMenuOpen = false">Blog</RouterLink>
    </div>
    <main class="mainContent">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import gsap from 'gsap'
const isMenuOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const headerRef = ref<InstanceType<typeof SiteHeader> | null>(null)
watch(isMenuOpen, async (open) => {
  await nextTick()
  const panel = panelRef.value
  const btn = headerRef.value?.menuBtnRef
  if (!panel || !btn) return
  if (open) {
    gsap.set(panel, { display: 'flex', x: 0, y: 0, scale: 1 })
    const btnRect = btn.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    const dx = btnRect.left - panelRect.left + btnRect.width / 2 - panelRect.width / 2
    const dy = btnRect.top - panelRect.top + btnRect.height / 2 - panelRect.height / 2
    gsap.fromTo(
      panel,
      { opacity: 0, scale: 0.2, x: dx, y: dy },
      { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.4, ease: 'power3.out' },
    )
  } else {
    const btnRect = btn.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    const dx = btnRect.left - panelRect.left + btnRect.width / 2 - panelRect.width / 2
    const dy = btnRect.top - panelRect.top + btnRect.height / 2 - panelRect.height / 2
    gsap.to(panel, {
      opacity: 0,
      scale: 0.2,
      x: dx,
      y: dy,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(panel, { display: 'none' })
      },
    })
  }
})
</script>
<style scoped>
.appLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
}
.mobilePanel {
  display: none;
  flex-flow: column nowrap;
  gap: var(--space3);
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center;
  will-change: transform, opacity;
  width: min(100% - 32px, var(--containerWidth));
  padding: var(--space3);
  background: var(--white);
  border-radius: var(--radius2);
  box-shadow: var(--shadow2);
  z-index: 100;
}
.mobilePanel a {
  display: block;
  padding: var(--space3);
  border-radius: var(--radius2);
  font-weight: 600;
  color: var(--darkWordColor);
  transition: var(--transitionNormal);
}
.mainContent {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em 1em;
}
@media (width > 768px) {
  .overlay,
  .mobilePanel {
    display: none;
  }
  .mobilePanel a:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
