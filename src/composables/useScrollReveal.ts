// src/composables/useScrollReveal.ts 
import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
interface ScrollRevealOptions {
  /** 選取哪些子元素做動畫，不傳則對 target 本身 */
  childSelector?: string;
  /** 起始 Y 偏移 px，預設 40 */
  y?: number;
  /** 每個元素的動畫時長，預設 0.65 */
  duration?: number;
  /** stagger 間隔秒數，預設 0.1 */
  stagger?: number;
  /** ScrollTrigger 觸發點，預設 "top 88%" */
  start?: string;
}
/**
 * Scroll 進場動畫 composable（fade-in + slide-up）。
 *
 * 單一元素：
 *   const cardRef = ref<HTMLElement | null>(null)
 *   useScrollReveal(cardRef)
 *
 * Grid stagger（子卡片錯開飛入）：
 *   const gridRef = ref<HTMLElement | null>(null)
 *   useScrollReveal(gridRef, { childSelector: ':scope > *' })
 */
export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {}
){
  const{
    childSelector,
    y = 40,
    duration = 0.65,
    stagger = 0.1,
    start = "top 88%",
  } = options;
  let triggers: ScrollTrigger[] = [];
  onMounted(() => {
    if (!target.value) return;
    const els: Element[] = childSelector
      ? Array.from(target.value.querySelectorAll(childSelector))
      : [target.value];
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: target.value,
      start,
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "all",
        });
      },
    });
    triggers.push(st);
  });
  onUnmounted(() => {
    triggers.forEach((t) => t.kill());
    triggers = [];
  });
}