# Titanium.dev — 前端開發作品集

個人前端開發作品集網站，使用 Vue 3 + TypeScript + Vite 打造，收錄作品專案展示與技術文章，作為求職與能力展示用途。

🔗 **線上網站**：https://rhythm3294.github.io/blog/
📮 **聯絡方式**：smile32943294@gmail.com

## 功能

- **作品展示**：作品列表與詳細頁，含技術棧標籤、專案說明與 Demo／GitHub 連結
- **技術文章**：Markdown 文章列表與內文渲染（`markdown-it` + `highlight.js` 語法高亮）
- **篩選與搜尋**：作品／文章依關鍵字、技術標籤篩選（自訂 `useFilter` composable）
- **動畫互動**：以 GSAP 實作導覽選單、卷軸進場動畫
- **RWD**：Mobile First 版面設計，桌機／平板／手機皆可正常瀏覽

## 技術棧

| 分類 | 技術 |
| --- | --- |
| 框架 | Vue 3（`<script setup>`）、Vue Router、Pinia |
| 語言 | TypeScript |
| 建置工具 | Vite |
| 樣式 | CSS Variables、Scoped CSS |
| 動畫 | GSAP |
| 內容渲染 | markdown-it、highlight.js |
| 部署 | GitHub Actions → GitHub Pages |

## 開發

```bash
npm install     # 安裝依賴
npm run dev     # 啟動開發伺服器
npm run build   # 型別檢查 + 建置
npm run preview # 預覽建置結果
```

## 部署

`main` 分支推送後，透過 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 自動建置並部署至 GitHub Pages。
