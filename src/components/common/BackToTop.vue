<template>
  <button
    ref="btnRef"
    type="button"
    class="backToTop"
    aria-label="回到頂部"
    @click="scrollToTop"
  >
    <FontAwesomeIcon icon="arrow-up" />
  </button>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import gsap from 'gsap'

const SHOW_THRESHOLD = 150

const visible = ref(false)
const btnRef = ref<HTMLElement | null>(null)
let ticking = false

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY >= SHOW_THRESHOLD
    ticking = false
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(visible, (show) => {
  const el = btnRef.value
  if (!el) return
  if (show) {
    gsap.set(el, { display: 'inline-flex' })
    gsap.fromTo(
      el,
      { opacity: 0, y: 16, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
    )
  } else {
    gsap.to(el, {
      opacity: 0,
      y: 16,
      scale: 0.8,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => gsap.set(el, { display: 'none' }),
    })
  }
})

onMounted(() => {
  gsap.set(btnRef.value, { display: 'none', opacity: 0 })
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>
<style scoped>
.backToTop {
  position: fixed;
  right: var(--space6);
  bottom: var(--space6);
  z-index: 150;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: var(--mainColor);
  color: var(--white);
  box-shadow: var(--shadow2);
  cursor: pointer;
}
@media (min-width: 768px) {
  .backToTop {
    transition: all 300ms ease;
  }
  .backToTop:hover {
    background: var(--firstColor);
    transform: translateY(-4px);
  }
}
</style>
