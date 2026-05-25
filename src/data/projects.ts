import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "清晨農鋪",
    slug: "morning-farm",
    summary: "以 Vue 3 打造的農產品電商網站，含 12 個前臺頁面與 2 個後臺管理介面。",
    description:
      "以農產品電商為主題的全端前端專案。前臺涵蓋商品瀏覽、購物車、結帳流程與訂單查詢；後臺提供商品新增/編輯、訂單管理與金流整合，共 14 個路由頁面。專案重點在於元件的 Props 設計與複用策略，讓每個元件在規模擴大後依然容易維護與擴充。",
    content:
      `這個專案最大的挑戰，是在頁面數量不斷增加的情況下，思考「元件的邊界應該在哪裡」。

前臺共 12 個頁面，包含首頁、商品列表、商品詳細、購物車、結帳、訂單查詢等完整購物流程。後臺 2 個頁面提供商品的新增/編輯表單、訂單列表管理與金流整合介面。

在開發過程中，我特別關注以下幾個面向：

• 元件 Props 設計：每個共用元件的參數介面如何定義，才能同時支援多種使用情境，又不讓呼叫端負擔過重。

• 路由規劃：前臺與後臺採用不同的 Layout，透過 Vue Router 的巢狀路由管理，避免頁面結構混雜。

• 狀態管理：購物車、訂單狀態透過 Pinia 集中管理，確保跨頁面的資料一致性。

整體架構以「未來可繼續擴充」為目標，盡量讓每次新增頁面或功能時，不需要動到原有元件的核心邏輯。`,
    cover: "https://picsum.photos/seed/morning-farm/800/500",
    techStack: ["Vue3", "Vite", "Pinia", "Vue Router", "SCSS"],
    demoUrl: "https://rhythm3294.github.io/morning-farm/",
    repoUrl: "https://github.com/rHyThM3294/morning-farm",
    role: "前端開發",
    period: "2026",
  },
  {
    id: 2,
    title: "BookShelf",
    slug: "bookshelf",
    summary: "串接 Google Books API 的個人書架應用，支援書籍搜尋、分頁載入與想讀／在讀／已讀三種書架管理。",
    description:
      "以 React 18 + TypeScript 打造的個人書架專案，串接 Google Books API 提供書名、作者、ISBN 搜尋，並以 Custom Hooks 封裝搜尋分頁邏輯與 LocalStorage 書架狀態。涵蓋完整 API 錯誤處理、無障礙設計與 GitHub Actions 自動化 CI/CD 部署流程。",
    content:
      `這個專案的核心挑戰是「在沒有複雜狀態管理套件的情況下，如何讓 Custom Hooks 承擔所有邏輯重量」。

搜尋功能透過 useBookSearch hook 集中管理：包含請求狀態、分頁計數、AbortController 取消前一次未完成的請求，以及完整的 loading / error / data 三種狀態轉換。每次 query 改變都重置分頁，確保顯示結果的一致性。

書架管理以 useShelf hook 實作，提供 CRUD 操作並與 localStorage 同步。三種狀態（想讀、在讀、已讀）之間的切換邏輯都集中在 hook 內，元件本身只需呼叫對應方法，不接觸任何儲存細節。

TypeScript 嚴格模式貫穿整個專案，所有 Google Books API 回傳的資料結構都有對應的型別定義，讓元件在使用資料時能獲得完整的型別提示與保護。

測試方面使用 Vitest + React Testing Library，涵蓋：
• booksApi.ts 的 URL 參數組成、HTTP 錯誤處理（429、500）
• useShelf hook 的 CRUD 操作與 localStorage 持久化

CI/CD 透過 GitHub Actions 串成完整流程：型別檢查 → 測試 → 建置 → 自動部署至 GitHub Pages。PR 只跑測試不觸發部署，main 才完整執行。`,
    cover: "https://picsum.photos/seed/bookshelf/800/500",
    techStack: ["React 18", "TypeScript", "Vite", "Vitest", "CSS Variables", "GitHub Actions"],
    demoUrl: "https://github.com/rHyThM3294/bookshelf",
    repoUrl: "https://github.com/rHyThM3294/bookshelf",
    role: "前端開發",
    period: "2026",
  },
  {
    id: 3,
    title: "勞保退休所",
    slug: "labor-site",
    summary: "以白話文解釋台灣勞保與勞退制度的知識型網站，含四種互動試算工具與即時法規數據串接。",
    description:
      "以 Next.js App Router 打造的勞工退休知識網站，提供勞保六大給付說明、新舊制退休金比較、特殊族群指南，並實作退休金複利試算、老年給付試算等互動工具。透過 Next.js API Route 提供即時法規數據，搭配 SWR 處理前端資料獲取，並以 GSAP 實作 Navbar 與 FAQ 動畫。",
    content:
      `這個專案的起點是一個真實觀察：台灣很多勞工不清楚自己的勞保勞退權益，網路上的資料又散落各處、語言艱澀。我想用清晰的架構和白話文，讓這些制度變得容易理解。

技術架構圍繞 Next.js App Router 設計。API Route 用來提供勞動法規的即時數據（如投保薪資分級表、利率），設定 revalidate: 3600 讓快取每小時更新一次，兼顧效能與資料準確性。前端用 SWR 消費這個 API，處理 loading skeleton、error retry 與 revalidateOnFocus 的細節控制。

互動試算工具是這個網站的核心功能，共四種：
• 退休金複利試算：含自提 vs 不自提的比較圖表
• 勞保老年給付試算：支援年金 A/B 式擇優、提早/延後請領的換算
• 失業給付試算：含提早就業獎助金的計算邏輯
• 自提節稅試算：對應不同所得稅率的實際節稅金額

GSAP 動畫方面，Navbar 的下拉選單使用 clipPath 展開效果，FAQ 手風琴用 height + opacity 實現平滑展開。動畫邏輯封裝在各自的元件內，不影響其他頁面的渲染效能。

內容頁面涵蓋勞保六大給付完整說明、勞退新舊制比較，以及針對接案族、外送員、兼職族與外籍工作者的特殊族群指南，每個頁面都有對應的 FAQ。`,
    cover: "https://picsum.photos/seed/labor-site/800/500",
    techStack: ["Next.js", "TypeScript", "GSAP", "SWR", "CSS Variables", "Vercel"],
    demoUrl: "https://github.com/rHyThM3294/labor-site",
    repoUrl: "https://github.com/rHyThM3294/labor-site",
    role: "前端開發",
    period: "2026",
  },
  {
    id: 4,
    title: "AI Chat Hub",
    slug: "ai-chat-hub",
    summary: "多聊天室 AI 對話介面，串接 Groq API，支援訊息串流、重新生成與 Markdown 渲染。",
    description:
      "模擬主流 AI 對話產品操作體驗的前端專案。串接 Groq API 實現真實串流回應，同時提供 mock 串流模式供無 API Key 的訪客體驗。透過 Pinia 管理多組聊天室的完整對話紀錄，支援訊息重新生成、程式碼區塊複製與 Markdown 即時渲染。",
    content:
      `這個專案的核心目標是「盡量還原真實 AI 產品的互動體驗」，從串流輸出、多聊天室管理到細節 UI，都是學習重點。

串流實作方面，透過串接 Groq API 達成真實的逐字輸出效果；考量到部分訪客沒有 API Key，也實作了 mock 串流模式，讓任何人都能完整體驗操作流程。OpenAI 雖有串接但因非免費方案未能完整驗證。

多聊天室管理透過 Pinia 集中處理，每個聊天室各自維護一份對話紀錄，切換聊天室時狀態不互相干擾。

UI 細節上包含：
• Markdown 渲染：AI 回應中的程式碼、標題、清單等格式即時解析顯示
• 程式碼區塊一鍵複製
• 訊息重新生成：可對任一則 AI 回應重新請求，覆蓋原本內容
• 串流進行中的 loading 狀態指示

整個專案部署於 Vercel，透過 Vercel Serverless Function 處理 API Key 的伺服端轉發，避免金鑰直接暴露在前端。`,
    cover: "https://picsum.photos/seed/ai-chat-hub/800/500",
    techStack: ["Vue3", "TypeScript", "Vite", "Pinia", "Groq API", "Vercel"],
    demoUrl: "https://ai-chat-hub-psi.vercel.app/",
    repoUrl: "https://github.com/rHyThM3294/ai-chat-hub",
    role: "前端開發",
    period: "2026",
  },
];