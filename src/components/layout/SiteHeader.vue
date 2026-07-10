<template>
  <header class="siteHeader">
    <div class="headerInner">
      <RouterLink to="/" class="brand">Titanium.dev</RouterLink>
      <nav class="desktopNav">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="navLink">{{
          item.label
        }}</RouterLink>
      </nav>
      <button
        ref="menuBtnRef"
        type="button"
        class="menuButton"
        :aria-expanded="isOpen"
        @click="toggleMenu"
      >
        <!-- 兩個 icon 疊在一起，用 GSAP 控制顯隱 -->
        <span ref="barsRef" class="btnIcon">
          <FontAwesomeIcon icon="bars" />
        </span>
        <span ref="xmarkRef" class="btnIcon">
          <FontAwesomeIcon icon="xmark" />
        </span>
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import gsap from 'gsap'
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()
const menuBtnRef = ref<HTMLElement | null>(null)
const barsRef = ref<HTMLElement | null>(null)
const xmarkRef = ref<HTMLElement | null>(null)
defineExpose({ menuBtnRef })
// 初始狀態：bars 顯示，xmark 隱藏
onMounted(() => {
  gsap.set(xmarkRef.value, { opacity: 0, rotate: -90, scale: 0.5 })
  gsap.set(barsRef.value, { opacity: 1, rotate: 0, scale: 1 })
})
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      // bars 消失
      gsap.to(barsRef.value, {
        opacity: 0,
        rotate: 90,
        scale: 0.5,
        duration: 0.25,
        ease: 'power2.in',
      })
      // xmark 出現
      gsap.fromTo(
        xmarkRef.value,
        { opacity: 0, rotate: -90, scale: 0.5 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.25, ease: 'power2.out', delay: 0.05 },
      )
    } else {
      // xmark 消失
      gsap.to(xmarkRef.value, {
        opacity: 0,
        rotate: 90,
        scale: 0.5,
        duration: 0.25,
        ease: 'power2.in',
      })
      // bars 出現
      gsap.fromTo(
        barsRef.value,
        { opacity: 0, rotate: -90, scale: 0.5 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.25, ease: 'power2.out', delay: 0.05 },
      )
    }
  },
)
type NavItem = { label: string; to: string }
const navItems: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
]
function toggleMenu() {
  emit('update:isOpen', !props.isOpen)
}
function closeMenu() {
  emit('update:isOpen', false)
}
function handleResize() {
  if (window.innerWidth > 768) closeMenu()
}
onMounted(() => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
</script>
<style scoped>
/* 原本的樣式不變，只加 btnIcon */
.siteHeader {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(247, 246, 243, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.headerInner {
  width: min(100% - 32px, var(--containerWidth));
  min-height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space4);
}
.brand {
  font-size: var(--font5);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--mainColor);
}
.desktopNav {
  display: none;
}
.navLink {
  font-size: var(--font2);
  font-weight: 600;
  color: var(--lightWordColor);
  transition: var(--transitionNormal);
}
.router-link-active.navLink {
  color: var(--mainColor);
}

.menuButton {
  position: relative; /* 讓兩個 icon 可以絕對定位疊在一起 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: var(--mainColor);
  box-shadow: var(--shadow1);
  transition: var(--transitionNormal);
}
.btnIcon {
  position: absolute; /* 兩個 icon 完全重疊 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
@media (width > 768px) {
  .desktopNav {
    display: flex;
    align-items: center;
    gap: var(--space6);
  }
  .menuButton {
    display: none;
  }
  .navLink:hover {
    color: var(--mainColor);
  }
}
</style>
