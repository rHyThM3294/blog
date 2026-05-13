<template>
  <article class="baseCard">
    <slot />
  </article>
</template>
<style scoped>
.baseCard{
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  box-shadow: var(--shadow1);
  overflow: hidden;
  transition: var(--transitionNormal);
}
@media(width>768px){
  .baseCard:hover{
    transform: translateY(-4px);
    box-shadow: var(--shadow2);
  }
}
</style>