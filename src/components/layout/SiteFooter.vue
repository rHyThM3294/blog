<template>
  <footer class="siteFooter">
    <BaseContainer>
      <div class="footerInner">
        <div class="footerBrand">
          <p class="footerTitle">Titanium.dev</p>
          <p class="footerText">
            Portfolio & Blog built with Vue 3 + Vite + TypeScript
          </p>
        </div>
        <nav class="footerNav" aria-label="頁尾導覽">
          <RouterLink
            v-for="item in footerNavItems"
            :key="item.path"
            :to="item.path"
            class="footerLink"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <p class="copyright">
          <small>© {{ year }} Titanium.dev All rights reserved.</small>
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>
<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { mainNavItems } from '@/config/nav'
const footerNavItems = mainNavItems.filter(item => item.showInFooter)
const year = new Date().getFullYear()
</script>
<style scoped>
.siteFooter {
  margin-top: var(--space20);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.footerInner {
  display: grid;
  gap: var(--space4);
  justify-items: center;
  text-align: center;
  padding: var(--space10) 0;
}
.footerTitle {
  font-size: var(--font4);
  font-weight: 700;
  color: var(--mainColor);
}
.footerText {
  margin-top: var(--space2);
  font-size: var(--font2);
  color: var(--lightWordColor);
}
.footerNav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space3);
}

.footerLink {
  font-size: var(--font2);
  color: var(--firstColor);
  text-decoration: none;
  transition: var(--transitionNormal);
}
.copyright {
  font-size: var(--font1);
  color: var(--secondColor);
}
@media (width > 768px) {
  .footerLink:hover {
    color: var(--mainColor);
  }
}
</style>