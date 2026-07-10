import type { Post } from '@/types/post'

export const mockPosts: Post[] = [
  {
    id: 1,
    title: '從田野調查到上線：清晨農鋪的 UX 研究流程',
    slug: 'morning-farm-ux-research',
    summary:
      '清晨農鋪不是先開始切版，而是先做研究。這篇記錄我們怎麼透過田野調查與專訪，整理出設計方向，再回頭規劃功能與頁面。',
    category: 'UX',
    tags: ['UX Research', '田野調查', '使用者訪談', '清晨農鋪'],
    publishedAt: '2026-04-20',
    readingTime: 7,
    content: `
      ## 為什麼要先做研究，不是先切版？
      大部分前端練習專案的開發流程都很直接：找一個主題、開始切畫面、上線。清晨農鋪這個專案我們刻意打破這個順序，選擇在動工前先做研究，因為我們想讓這個農產品電商的設計決策有所依據，而不只是憑感覺。
      這篇文章整理了從田野調查到設計方向確立的過程，以及這些研究怎麼影響了後來的頁面規劃。
      ## 田野調查：去市場實際觀察
      第一步不是開啟設計工具，而是去市場和農夫市集現場觀察。
      我們主要想弄清楚幾件事：
      - 消費者在選農產品時，最在意哪些資訊？
      - 農夫和消費者之間的溝通方式是什麼？
      - 目前線下購買體驗有哪些明顯的摩擦點？
      觀察下來有幾個收穫：消費者普遍會先問「這是哪裡來的？誰種的？」，比詢問價格更頻繁。農夫也習慣用「今天剛採的」、「這批是特別挑過的」這類話語來建立信任感。這給了我們一個重要的設計線索：**來源透明度和農夫身份，是整個購買信任鏈的核心**。
      ## 使用者專訪：挖掘背後的動機
      田野調查之後，我們針對幾個目標用戶做了深度訪談。訪談對象包含：
      - 習慣在有機商店購物的媽媽
      - 曾經在網路買過農產品但體驗不好的上班族
      - 自己有種菜、偶爾會分售的退休農友
      透過這些訪談，最印象深刻的洞察是：**線上買農產品最大的障礙不是價格，而是「不知道這個人是不是真的農夫」**。
      這個發現直接影響了我們在專案中規劃「合作農夫」專頁(CooperationFarmerView)和「農夫詳細介紹」(FarmerDetailView)的決策。每個農夫有自己的個人頁面，可以看到他們的種植背景、農場故事，讓買家在購買前先認識賣家。
      ## 從研究到功能清單
      研究結束後，我們整理了一份需求清單，這份清單後來成為了路由規劃的基礎：
      \`\`\`
      /                      首頁（品牌信任建立）
      /products              商品列表（瀏覽與篩選）
      /productDetail/:id     商品詳細頁（農夫資訊、規格、加入購物車）
      /cooperation-farmer    合作農夫一覽（建立「真實農夫」的信任感）
      /farmer/:id            農夫個人頁（深度認識農夫背景）
      /map-season            地圖 × 產季（「在地」與「當季」兩個核心概念）
      /knowledge             農業知識（強化品牌專業度）
      /cart                  購物車 → 結帳流程
      \`\`\`

      「地圖 × 產季」這個頁面是研究過程中蠻有趣的一個結果。訪談中不少人提到「不知道什麼季節買什麼比較好」，這讓我們決定把臺灣地圖和產季資訊整合在同一個頁面，讓使用者可以先選縣市，看到當地的代表農產品，或是透過產季視圖，知道現在適合買什麼。

      ## 研究對開發的影響

      做研究這件事，對開發階段最大的幫助是：**減少「要不要做這個功能」的猶豫**。

      在規劃農夫個人頁時，我本來有點猶豫這樣做是不是太複雜。但回頭看訪談紀錄，「看不到農夫是誰」這個痛點出現了好幾次，這讓我對這個功能的開發優先順序很有信心。

      這是我在這個專案裡學到最重要的一件事：設計決策有研究支撐時，執行起來會更篤定，方向感也更清楚。
    `,
  },
  {
    id: 2,
    title: 'Pinia 多聊天室狀態管理：AI Chat Hub 的設計思路',
    slug: 'pinia-multi-chat-state',
    summary:
      '在 AI Chat Hub 裡，每個聊天室都是獨立的狀態單位，切換時不能互相干擾，還要支援持久化。這篇整理我在 chat.store 裡的設計思路與幾個遇到的坑。',
    category: 'Vue',
    tags: ['Vue3', 'Pinia', 'State Management', 'AI Chat Hub'],
    publishedAt: '2026-04-28',
    readingTime: 6,
    content: `
## 從單一對話到多聊天室

AI Chat Hub 最一開始的版本很單純：只有一個對話區，送訊息、顯示回應，就這樣。

但我很快發現，真實的 AI 對話產品（ChatGPT、Claude）都有一個核心功能：**多個聊天室可以並存，切換時各自保留各自的對話紀錄**。這個功能看似簡單，但實際放進 Pinia 的狀態設計時，有幾個地方需要認真想清楚。

## 狀態結構的設計

\`\`\`ts
interface ChatConversation {
  id: string
  title: string
  provider: ProviderId
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}
\`\`\`

每個聊天室就是一個 \`ChatConversation\` 物件，store 裡面維護的是一個陣列：

\`\`\`ts
const conversations = ref<ChatConversation[]>([])
const activeConversationId = ref<string>('')
\`\`\`

關鍵在於 \`activeConversationId\`，這個值決定「目前在看哪個聊天室」，而不是把整個活動聊天室物件存起來。這樣的好處是：切換聊天室時只需要改這個 id，不需要複製或搬移資料。

\`\`\`ts
const activeConversation = computed(() =>
  conversations.value.find(item => item.id === activeConversationId.value)
    ?? conversations.value[0]
    ?? null
)
\`\`\`

## 串流過程中的狀態更新

這個專案裡最麻煩的狀態問題，其實不是「多聊天室」，而是**串流進行中的 UI 更新**。

串流回應的原理是：API 持續送出 token（一小段文字），前端要把每個 token 逐步附加到訊息內容上。這段邏輯如果直接在 \`onToken\` 回調裡操作 DOM，會很容易有效能問題。

我的做法是實作一個 \`createDisplayQueue\`，把收到的 token 先推進一個 queue，再用 \`setInterval\` 每 30ms 取一個 token 出來更新 UI：

\`\`\`ts
function createDisplayQueue(intervalMs = 30) {
  let queue: string[] = []
  let timer: number | null = null

  function push(token: string) {
    queue.push(token)
  }

  function start(flush: (token: string) => void) {
    timer = window.setInterval(() => {
      const token = queue.shift()
      if (token !== undefined) flush(token)
    }, intervalMs)
  }

  // ...
  return { push, start, drain, abort }
}
\`\`\`

這樣的好處是：即使 API 推送速度很快，UI 更新的節奏還是穩定的 30ms 一次，不會因為大量 token 湧入造成畫面抖動。

## 訊息重新生成的邊界情況

「重新生成」這個功能乍看簡單，但有一個邊界情況需要處理：**如果對話串中間某一則 assistant 訊息被重新生成，那它後面的所有訊息都應該清掉**，因為後面的對話是基於那則訊息的內容延伸的，重新生成後那些對話就不再有脈絡了。

\`\`\`ts
// 找到要重新生成的 assistant 訊息位置
const assistantIndex = conversation.messages.findIndex(
  msg => msg.id === messageId && msg.role === 'assistant'
)

// 保留它之前的所有訊息，清掉它（含）之後的
const historyBeforeAssistant = conversation.messages.slice(0, assistantIndex)
conversation.messages = [...historyBeforeAssistant]

// 再發送一次請求，追加新的 assistant 回應
await generateAssistantReply(conversation, historyBeforeAssistant, userMessage.content)
\`\`\`

## 持久化：讓頁面重整後不失去對話

最後一個要解決的問題是持久化。使用者重整頁面後，對話紀錄不應該消失。

做法是監聽 \`conversations\` 和 \`activeConversationId\` 的變化，用 debounce 避免每次 token 進來都觸發 localStorage 寫入：

\`\`\`ts
watch(
  [conversations, activeConversationId],
  () => {
    if (sending.value) return  // 串流中不觸發
    if (persistTimer) window.clearTimeout(persistTimer)
    persistTimer = window.setTimeout(() => {
      savePersistedState({ activeConversationId: activeConversationId.value, conversations: conversations.value })
    }, 300)
  },
  { deep: true }
)
\`\`\`

注意 \`sending.value\` 的 guard：串流進行中如果觸發寫入，會造成大量不必要的 localStorage 操作，這個 guard 讓持久化只在對話結束後才發生。

## 小結

這個 store 的設計讓我體會到：Pinia 的 composable 風格很適合把複雜的邏輯集中管理，而不是散落在各個元件裡。多聊天室、串流更新、重新生成、持久化這四件事，最後都可以在同一個 store 裡清楚地各司其職。
    `,
  },
  {
    id: 3,
    title: '用 Vercel Serverless Function 安全轉發 Groq API',
    slug: 'vercel-serverless-groq-proxy',
    summary:
      '前端直接串接 AI API 最大的問題是 API Key 會暴露在瀏覽器裡。這篇整理我在 AI Chat Hub 裡用 Vercel Serverless Function 做伺服端代理，以及處理 SSE 串流的細節。',
    category: 'Backend',
    tags: ['Vercel', 'Serverless', 'Groq', 'SSE', 'AI Chat Hub'],
    publishedAt: '2026-05-02',
    readingTime: 5,
    content: `
## 問題：API Key 不能放在前端

如果直接在 Vue 元件裡呼叫 Groq API，請求會從瀏覽器發出，這意味著 API Key 必須寫在前端程式碼或環境變數裡，任何人打開 DevTools 就能看到。

解法是在伺服器端做一層代理：前端只跟自己部署的 API 溝通，API Key 放在伺服器的環境變數裡，外部無法存取。

Vercel 提供的 Serverless Function 剛好可以做這件事，而且部署設定很簡單，和前端專案放在同一個 repo 就可以。

## 專案結構

\`\`\`
ai-chat-hub/
├── api/
│   └── groq.ts       ← Vercel 自動識別為 Serverless Function
├── src/
│   └── ...           ← Vue 前端
└── vercel.json
\`\`\`

Vercel 會自動把 \`api/\` 目錄下的檔案部署成 serverless function，路徑直接對應 URL：\`api/groq.ts\` → \`/api/groq\`。

## Serverless Function 的核心邏輯

\`\`\`ts
export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY  // 伺服端環境變數，前端看不到

  // 對上游 Groq API 發請求，開啟串流模式
  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, stream: true }),
  })

  // 設定 SSE 回應標頭
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  })
  res.flushHeaders()

  // 從上游讀取串流，逐塊轉發給前端
  const reader = upstream.body.getReader()
  // ...
}
\`\`\`

這裡有一個細節：**必須在開始轉發之前就呼叫 \`res.flushHeaders()\`**。如果等到第一個 chunk 進來才設定 header，有些情況下客戶端會等很久才收到第一個回應。

## SSE 的解析與轉發

Groq API 的串流格式是 Server-Sent Events（SSE）：

\`\`\`
data: {"choices":[{"delta":{"content":"你"}}]}
data: {"choices":[{"delta":{"content":"好"}}]}
data: [DONE]
\`\`\`

Serverless Function 收到這些 chunk 之後，要解析出 \`content\` 欄位，再用自己定義的格式轉發給前端：

\`\`\`ts
// 把上游的格式轉成前端期待的格式
const token = json?.choices?.[0]?.delta?.content ?? ''
if (token) {
  res.write(\`data: \${JSON.stringify({ token })}\n\n\`)
}

// 結束訊號
if (data === '[DONE]') {
  res.write(\`data: \${JSON.stringify({ done: true })}\n\n\`)
  return res.end()
}
\`\`\`

前端的 \`groq.ts\` provider 收到這些事件後，逐一呼叫 \`onToken\` 回調，再交給 store 處理 UI 更新。

## 錯誤處理的分支

這個設計有一個需要特別注意的地方：**錯誤發生在串流開始前和開始後，處理方式不同**。

\`\`\`ts
let streamingStarted = false

// 開始串流後才設為 true
res.flushHeaders()
streamingStarted = true

// 錯誤處理
} catch (err) {
  if (streamingStarted) {
    // 已經開始串流，只能透過 SSE 事件傳錯誤
    res.write(\`data: \${JSON.stringify({ error: err.message })}\n\n\`)
    res.end()
  } else {
    // 還沒開始，可以用標準 HTTP 錯誤回應
    res.status(500).json({ error: err.message })
  }
}
\`\`\`

如果串流已經開始（\`flushHeaders\` 已呼叫），HTTP status code 就固定是 200 了，這時候只能透過 SSE 事件把錯誤訊息傳給前端，讓前端自己顯示錯誤狀態。

## 小結

Vercel Serverless Function 做 API 代理的整體體驗很順，最主要的收穫是理解了「為什麼 AI 相關的 API Key 不能放前端」，以及 SSE 串流在代理層中的處理細節——這部分比我預期的要細，但搞懂之後整個串流架構就很清楚了。
    `,
  },
  {
    id: 4,
    title: '元件邊界怎麼判斷？在清晨農鋪學到的事',
    slug: 'component-boundary-morning-farm',
    summary:
      '清晨農鋪有 14 個路由頁面，元件拆得太細或太粗都會是問題。這篇整理我在這個專案裡思考元件邊界的方式，以及幾個具體的拆分決策。',
    category: 'Vue',
    tags: ['Vue3', '元件設計', 'Props', '清晨農鋪'],
    publishedAt: '2026-05-05',
    readingTime: 5,
    content: `
## 「元件要拆到多細？」

這是我在清晨農鋪開發過程中問自己最多次的問題。

這個專案有 12 個前臺頁面和 2 個後臺管理頁面，元件數量不少。如果每個頁面都從頭寫，程式碼重複率會很高；但如果拆得太細，每個元件的 Props 介面變得複雜，呼叫端反而變難維護。

這篇整理幾個我在這個專案裡具體的拆分判斷。

## 判斷標準一：「這個區塊會不會在別的地方出現？」

最直覺的判斷：如果某個 UI 區塊會在兩個以上的地方出現，就應該抽成元件。

清晨農鋪裡，商品卡片（Card）出現在首頁的「本週新鮮」、商品列表頁、農夫詳細頁、地圖產季頁，至少四個地方都用到同一個卡片樣式。把它抽成共用元件之後，四個頁面共享同一份樣式邏輯，日後要調整卡片設計，改一個地方就夠了。

## 判斷標準二：「這個元件的 Props 夠不夠清楚？」

元件拆出去之後，Props 的設計決定了它好不好用。

以農夫區塊（FarmerSection）為例，這個元件在合作農夫一覽頁和首頁都有出現，但顯示的農夫數量和樣式略有不同。我的做法是：

\`\`\`vue
<!-- FarmerSection.vue -->
<script setup>
defineProps({
  farmers: Array,      // 農夫資料陣列
  limit: Number,       // 最多顯示幾個（首頁可能只顯示 3 個，列表頁顯示全部）
  showMore: Boolean,   // 是否顯示「查看更多」按鈕
})
</script>
\`\`\`

Props 的命名盡量用「這個元件能做什麼」來命名，而不是「呼叫端想要什麼」。\`limit\` 比 \`homePageFarmerCount\` 更通用，也更容易被其他頁面複用。

## 判斷標準三：「資料應該從哪裡來？」

這個問題我在地圖產季（MapSeasonView）裡想了比較久。

地圖頁有三個子功能：臺灣地圖、產季圖表、季節商品列表。這些資料彼此有關聯（點選縣市要更新商品列表、切換季節要更新圖表），如果把資料散在各個元件裡，父子元件之間的 emit/props 傳遞會很混亂。

最後的決定是：**把所有和地圖產季相關的狀態都集中到 \`useMapSeasonStore\`**，讓元件只做 UI 渲染，不持有自己的資料狀態：

\`\`\`js
// useMapSeasonStore.js
const selectedCity = ref('新北市')
const currentSeason = ref('spring')

const filteredProducts = computed(() =>
  allProducts.value[selectedCity.value] || []
)

function setSelectedCity(city) {
  selectedCity.value = city
}
\`\`\`

TaiwanMap、SeasonChart、ProductGrid 這三個子元件，都直接從 store 讀取資料，不需要透過父元件當中介傳遞。當使用者在地圖上點選縣市，TaiwanMap 呼叫 \`setSelectedCity\`，ProductGrid 透過 computed 自動更新，元件之間不需要任何 emit。

## 一個反例：後臺元件拆太細的問題

後臺管理頁面（AdminDashboard）裡，我一開始把「搜尋欄」、「日期篩選」、「狀態篩選」各自拆成獨立元件，結果父元件要用 \`v-model\` 接三組不同的資料，呼叫端變得很囉嗦。

後來把「篩選列」整合成一個 FilterBar 元件，對外只暴露一個 \`filters\` 物件，父元件的程式碼簡潔很多，子元件內部如何管理各種篩選條件，父元件完全不需要知道。

## 小結

元件拆分沒有唯一標準，但有幾個問題可以幫助判斷：

- 這個區塊會在別的地方出現嗎？
- 這個元件的 Props 說得清楚它「能做什麼」嗎？
- 資料放在元件裡，還是放在 Store 比較合適？

這些問題不是要找出「最正確的答案」，而是幫助自己在做決定的時候有所依據，讓每個決策都能說得出理由。
    `,
  },
]
