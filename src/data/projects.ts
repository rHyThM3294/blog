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