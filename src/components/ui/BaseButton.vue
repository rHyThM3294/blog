<template>
  <component :is="tag" class="baseButton" :class="[`variant-${variant}`]" v-bind="linkAttrs">
    <slot />
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'RouterLink'
    href?: string
    to?: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  {
    tag: 'button',
    variant: 'primary',
  },
)
const linkAttrs = computed(() => {
  if (props.tag === 'a') {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noreferrer noopener',
    }
  }
  if (props.tag === 'RouterLink') {
    return {
      to: props.to,
    }
  }
  return {
    type: 'button',
  }
})
</script>
<style scoped>
.baseButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space2);
  min-height: 44px;
  padding: 0 var(--space5);
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: var(--font2);
  font-weight: 600;
  transition: var(--transitionNormal);
}
.variant-primary {
  background: var(--mainColor);
  color: var(--white);
}
.variant-secondary {
  background: var(--white);
  color: var(--mainColor);
  border-color: var(--secondColor);
}
.variant-ghost {
  background: transparent;
  color: var(--darkWordColor);
}
@media (min-width: 768px) {
  .baseButton:hover {
    transform: translateY(-1px);
  }
  .variant-primary:hover {
    background: var(--firstColor);
  }
  .variant-secondary:hover {
    background: var(--backgroundColor);
  }
  .variant-ghost:hover {
    background: rgba(61, 90, 90, 0.08);
  }
}
</style>
