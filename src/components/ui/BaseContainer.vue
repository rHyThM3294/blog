<template>
  <div class="baseContainer">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.baseContainer {
  width: min(100% - 32px, var(--containerWidth));
  margin: 0 auto;
}
@media (width>768px) {
}
</style>
