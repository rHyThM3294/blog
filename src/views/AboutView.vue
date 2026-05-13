<template>
  <div class="aboutView">
    <PageHero
      eyebrow="About"
      title="關於我"
      description="我目前專注在前端開發學習與作品實作，希望把每一次練習都累積成更完整、可展示的專案成果。"
    />
    <BaseSection
      class="introSection"
      title="自我介紹"
      description="目前持續透過專案練習、介面切板與功能拆分，累積自己的前端工程能力。"
      compact
    >
      <div class="introCard">
        <div class="introContent">
          <p class="introText">我目前主要使用Vue 3、Vite與TypeScript進行前端開發，持續練習從需求整理、畫面規劃、資料建模，到元件拆分與頁面整合的完整流程。</p>
          <p class="introText">我希望做的不只是「把畫面做出來」，而是逐步建立更有結構、可維護、可擴充的前端專案，讓作品不只是練習成果，也能成為未來面試與職涯發展的基礎。</p>
        </div>
      </div>
    </BaseSection>
    <BaseSection
      class="skillSection"
      title="目前正在累積的能力"
      description="以下是我目前持續練習與整理中的前端能力方向。"
      compact
    >
      <div class="skillGrid">
        <article class="skillCard">
          <h3 class="skillTitle">前端框架實作</h3>
          <p class="skillText">熟悉Vue3組件拆分、Props / Emits、computed、router 規劃，並持續練習用更清楚的方式組織頁面與邏輯。</p>
        </article>
        <article class="skillCard">
          <h3 class="skillTitle">介面切版與RWD</h3>
          <p class="skillText">使用 mobile first 思維設計版面，重視留白、資訊層級與元件一致性，讓網站在行動裝置與桌面裝置都能保持良好閱讀體驗。</p>
        </article>
        <article class="skillCard">
          <h3 class="skillTitle">資料驅動UI</h3>
          <p class="skillText">持續練習使用本地資料、slug 路由、列表與詳細頁結構，讓畫面不是寫死，而是能往可擴充的內容架構發展。</p>
        </article>
      </div>
    </BaseSection>
    <BaseSection
      class="focusSection"
      title="我目前的開發方向"
      description="現階段我特別在意的，不只是功能是否完成，而是整體專案能不能持續被整理與進化。"
      compact
    >
      <div class="focusCard">
        <ul class="focusList">
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">元件化思維</p>
              <p class="focusText">盡量把重複區塊整理成共用元件，降低重工，也讓頁面結構更清楚。</p>
            </div>
          </li>
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">可維護性</p>
              <p class="focusText">比起一次把畫面塞滿，我更希望每個元件與頁面都能逐步擴充、容易調整</p>
            </div>
          </li>
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">實戰作品導向</p>
              <p class="focusText">目前的每個專案都盡量朝「可展示、可說明、可延伸」的方向整理，而不是只完成作業。</p>
            </div>
          </li>
        </ul>
      </div>
    </BaseSection>
    <section class="ctaSection">
      <BaseContainer>
        <div class="ctaCard">
          <div class="ctaContent">
            <p class="ctaEyebrow">Keep Learning</p>
            <h2 class="ctaTitle">持續把練習變成作品，把作品變成能力</h2>
            <p class="ctaText">接下來我會持續補強更多專案內容、文章整理與互動細節，讓這個網站慢慢成為更完整的個人品牌作品站。</p>
          </div>
          <div class="ctaActions">
            <BaseButton tag="RouterLink" to="/projects">看作品</BaseButton>
            <BaseButton tag="RouterLink" to="/blog" variant="secondary">讀文章</BaseButton>
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
<script setup lang="ts">
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSection from "@/components/ui/BaseSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PageHero from "@/components/common/PageHero.vue";
</script>
<style scoped>
.aboutView{
  padding-top: var(--space8);
}
.introCard,.focusCard,.skillCard{
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius2);
  box-shadow: var(--shadow1);
  transition: var(--transitionNormal);
}
.introCard,.focusCard{
  padding: var(--space6);
}
.introContent{
  display: flex;
  flex-direction: column;
  gap: var(--space4);
  max-width: 780px;
}
.introText{
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.skillGrid{
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space5);
}
.skillCard{
  padding: var(--space6);
}
.skillTitle{
  font-size: var(--font5);
  line-height: var(--line1);
  color: var(--darkWordColor);
}
.skillText{
  margin-top: var(--space3);
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.focusList{
  display: flex;
  flex-direction: column;
  gap: var(--space5);
}
.focusItem{
  display: flex;
  align-items: flex-start;
  gap: var(--space4);
}
.focusDot{
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  margin-top: 8px;
  border-radius: 999px;
  background: var(--mainColor);
}
.focusContent{
  display: flex;
  flex-direction: column;
  gap: var(--space2);
}
.focusTitle{
  font-size: var(--font4);
  font-weight: 700;
  color: var(--darkWordColor);
}
.focusText{
  font-size: var(--font3);
  line-height: var(--line3);
  color: var(--lightWordColor);
}
.ctaSection{
  padding: var(--space8) 0 var(--space12);
}
.ctaCard{
  display: flex;
  flex-direction: column;
  gap: var(--space6);
  padding: var(--space6);
  border-radius: var(--radius3);
  background: linear-gradient(135deg, rgba(61, 90, 90, 0.96) 0%, rgba(107, 143, 138, 0.96) 100%);
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
  max-width: 720px;
  font-size: var(--font3);
  line-height: var(--line3);
  opacity: 0.92;
}
.ctaActions{
  display: flex;
  flex-wrap: wrap;
  gap: var(--space3);
}
@media(width>768px){
  .aboutView{
    padding-top: var(--space10);
  }
  .skillGrid{
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
  .introCard:hover,.focusCard:hover,.skillCard:hover{
    transform: translateY(-4px);
    box-shadow: var(--shadow2);
  }
}
</style>