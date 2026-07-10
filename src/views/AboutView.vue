<template>
  <div class="aboutView">
    <PageHero
      eyebrow="About"
      title="關於我"
      description="我是一名前端開發者，專注於 Vue 3 生態系與 TypeScript，透過多個實作專案累積從需求規劃、介面切版到功能開發、自動化部署的完整能力。"
    />
    <BaseSection
      class="introSection"
      title="自我介紹"
      description="以下是我的技術背景與開發方式。"
      compact
    >
      <div class="introCard">
        <div class="introContent">
          <p class="introText">我主要使用 Vue 3、Vite 與 TypeScript 開發前端應用，也具備 React 與 Next.js 的實作經驗。從需求拆解、介面切版、資料建模，到元件設計與狀態管理，我習慣把每個作品當成完整產品來規劃，並透過 GitHub Actions 建立自動化部署流程。</p>
          <p class="introText">比起把畫面做出來，我更在意程式碼的結構與可維護性——包含元件的 Props 設計、邏輯拆分為 Composables／Custom Hooks，以及必要時搭配單元測試驗證行為，讓專案在規模擴大後依然容易維護與擴充。</p>
        </div>
      </div>
    </BaseSection>
    <BaseSection
      class="skillSection"
      title="核心能力"
      description="以下是我目前具備並持續深化的前端能力方向。"
      compact
    >
      <div class="skillGrid">
        <article class="skillCard">
          <h3 class="skillTitle">前端框架實作</h3>
          <p class="skillText">熟悉 Vue 3 元件拆分、Props / Emits、Composition API 與 Vue Router 路由規劃，並具備 React + Next.js 的實作經驗。</p>
        </article>
        <article class="skillCard">
          <h3 class="skillTitle">介面切版與 RWD</h3>
          <p class="skillText">採用 Mobile First 策略設計版面，重視留白、資訊層級與元件一致性，確保行動裝置與桌面裝置都有良好的閱讀體驗。</p>
        </article>
        <article class="skillCard">
          <h3 class="skillTitle">資料驅動 UI</h3>
          <p class="skillText">以本地資料、slug 路由、列表與詳細頁結構打造可擴充的內容架構，並具備串接第三方 API 與處理串流回應的實作經驗。</p>
        </article>
      </div>
    </BaseSection>
    <BaseSection
      class="focusSection"
      title="我在意的開發原則"
      description="比起功能是否完成，我更在意整體專案能不能持續被整理與擴充。"
      compact
    >
      <div class="focusCard">
        <ul class="focusList">
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">元件化思維</p>
              <p class="focusText">把重複區塊整理成共用元件，降低重工，讓頁面結構保持清楚一致。</p>
            </div>
          </li>
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">可維護性</p>
              <p class="focusText">透過清楚的邏輯拆分與型別定義，讓專案能持續擴充，不需要大幅重構。</p>
            </div>
          </li>
          <li class="focusItem">
            <span class="focusDot"></span>
            <div class="focusContent">
              <p class="focusTitle">實戰作品導向</p>
              <p class="focusText">每個專案都涵蓋完整開發流程——從功能規劃、UI 實作到 CI/CD 部署，確保作品具備可展示、可說明、可延伸的完整度。</p>
            </div>
          </li>
        </ul>
      </div>
    </BaseSection>
    <section class="ctaSection">
      <BaseContainer>
        <div class="ctaCard">
          <div class="ctaContent">
            <p class="ctaEyebrow">Keep Building</p>
            <h2 class="ctaTitle">把作品做成產品，把細節做到位</h2>
            <p class="ctaText">接下來我會持續補強專案內容與技術文章，並在效能與無障礙設計上做更多優化。</p>
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