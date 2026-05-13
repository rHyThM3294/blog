<template>
  <div class="homeView">
    <section class="heroSection">
      <BaseContainer>
        <div class="heroContent">
          <p ref="eyebrowRef" class="heroEyebrow">Frontend Developer Portfolio</p>
          <h1 ref="titleRef" class="heroTitle">
            嗨你好
            <br />
            我正在打造可維護、可擴充的前端作品。
          </h1>
          <p ref="textRef" class="heroText">
            目前專注於 Vue 3、Vite、TypeScript 與前端介面設計，
            希望透過作品集與技術文章，持續累積自己的開發實力與工程思維。
          </p>
          <div ref="actionsRef" class="heroActions">
            <BaseButton tag="RouterLink" to="/projects">看作品</BaseButton>
            <BaseButton tag="RouterLink" to="/blog" variant="secondary">讀文章</BaseButton>
          </div>
        </div>
      </BaseContainer>
    </section>
    <BaseSection
      class="projectSection"
      title="精選作品"
      description="挑幾個目前比較有代表性的作品，展示開發流程、介面規劃與功能實作。"
    >
      <div ref="projectGridRef" class="projectGrid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
      <div class="sectionAction">
        <BaseButton tag="RouterLink" to="/projects" variant="ghost">查看更多作品</BaseButton>
      </div>
    </BaseSection>
    <BaseSection
      class="blogSection"
      title="最新文章"
      description="記錄我在 Vue、前端開發與專案實作中的思考與整理。"
      compact
    >
      <div ref="blogListRef" class="blogList">
        <PostCard
          v-for="post in latestPosts"
          :key="post.id"
          :post="post"
        />
      </div>
      <div class="sectionAction">
        <BaseButton tag="RouterLink" to="/blog" variant="ghost">
          查看更多文章
        </BaseButton>
      </div>
    </BaseSection>
    <BaseSection
      class="aboutSection"
      title="關於我"
      description="我目前正持續累積前端實戰能力，也希望把每一次練習都做成能真正展示的作品。"
      compact
    >
      <div class="aboutCard">
        <div class="aboutContent">
          <p class="aboutText">我目前主要使用 Vue 3 + Vite 進行開發，熟悉 component 拆分、router 規劃、假資料建模、RWD 切版，也持續練習讓專案從單純頁面，提升成更完整的前端作品。</p>
          <p class="aboutText">這個網站不只是作品展示頁，也會逐步擴充成我的個人品牌網站，未來預計加入更多文章、專案整理與技術筆記。</p>
        </div>
      </div>
    </BaseSection>
    <section class="ctaSection">
      <BaseContainer>
        <div class="ctaCard">
          <div class="ctaContent">
            <p class="ctaEyebrow">Keep Building</p>
            <h2 class="ctaTitle">從作品、文章，到更完整的前端工程能力。</h2>
            <p class="ctaText">
              目前網站仍在持續開發中，接下來會補上更多作品細節、UI 優化與內容整理。
            </p>
          </div>
          <div class="ctaActions">
            <BaseButton tag="RouterLink" to="/projects">
              前往作品集
            </BaseButton>
            <BaseButton tag="RouterLink" to="/about" variant="secondary">
              了解更多
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSection from "@/components/ui/BaseSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ProjectCard from "@/components/project/ProjectCard.vue";
import PostCard from "@/components/blog/PostCard.vue";
import { projects } from "@/data/projects";
import { mockPosts } from "@/data/mockPosts";
import type { Project } from "@/types/project";
import type { Post } from "@/types/post";
import { useScrollReveal } from "@/composables/useScrollReveal";
// --- Hero 進場動畫 ---
const eyebrowRef = ref<HTMLElement | null>(null);
const titleRef   = ref<HTMLElement | null>(null);
const textRef    = ref<HTMLElement | null>(null);
const actionsRef = ref<HTMLElement | null>(null);
onMounted(() => {
  gsap.from(
    [eyebrowRef.value, titleRef.value, textRef.value, actionsRef.value],
    {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      clearProps: "all",
    }
  );
});
// --- ScrollTrigger：卡片 grid stagger 飛入 ---
const projectGridRef = ref<HTMLElement | null>(null);
const blogListRef    = ref<HTMLElement | null>(null);
// ':scope > *' 選取 grid 的直接子元素，捲到該區塊時依序錯開 0.1s 飛入
useScrollReveal(projectGridRef, { childSelector: ":scope > *", stagger: 0.1 });
useScrollReveal(blogListRef,    { childSelector: ":scope > *", stagger: 0.1 });
// --- 資料 ---
const featuredProjects = computed<Project[]>(() => projects.slice(0, 3));
const latestPosts      = computed<Post[]>(() => mockPosts.slice(0, 3));
</script>
<style scoped>
.homeView{
  padding-top: var(--space8);
}
.heroSection{
  padding: var(--space12) 0 var(--space10);
}
.heroContent{
  display: flex;
  flex-direction: column;
  gap: var(--space5);
}
.heroEyebrow{
  font-size: var(--font2);
  font-weight: 700;
  color: var(--firstColor);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.heroTitle{
  font-size: clamp(var(--font8), 10vw, var(--font11));
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.heroText{
  max-width: 680px;
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.heroActions{
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
  padding-top: var(--space2);
}
.projectSection,.blogSection,.aboutSection{
  scroll-margin-top: 96px;
}
.projectGrid,.blogList{
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space5);
}
.aboutCard{
  padding: var(--space6);
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  box-shadow: var(--shadow1);
}
.aboutContent{
  display: flex;
  flex-direction: column;
  gap: var(--space4);
  max-width: 760px;
}
.aboutText{
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.sectionAction{
  display: flex;
  justify-content: flex-start;
  margin-top: var(--space6);
}
.ctaSection{
  padding: var(--space8) 0 var(--space12);
}
.ctaCard{
  display: flex;
  flex-direction: column;
  gap: var(--space6);
  padding: var(--space6);
  background: linear-gradient(135deg, rgba(61, 90, 90, 0.96) 0%, rgba(107, 143, 138, 0.96) 100%);
  border-radius: var(--radius3);
  color: var(--white);
  box-shadow: var(--shadow2);
}
.ctaContent{
  display: flex;
  flex-direction: column;
  gap: var(--space3);
}
.ctaEyebrow{
  font-size: var(--font2);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.9;
}
.ctaTitle{
  font-size: clamp(var(--font7), 7vw, var(--font9));
  line-height: var(--line1);
}
.ctaText{
  max-width: 680px;
  font-size: var(--font3);
  line-height: var(--line3);
  opacity: 0.92;
}
.ctaActions{
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
}
@media(min-width: 768px){
  .homeView{
    padding-top: var(--space10);
  }
  .heroSection{
    padding: var(--space16) 0 var(--space12);
  }
  .heroText{
    font-size: var(--font4);
  }
  .projectGrid,.blogList{
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .ctaCard{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--space8);
  }
  .ctaActions{
    justify-content: flex-end;
  }
}
</style>