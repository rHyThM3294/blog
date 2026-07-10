export type PromptMode = 'draft' | 'summarize' | 'rewrite' | 'expand'
export type EditorDocument = {
  id: string
  title: string
  content: string
  summary: string
  tags: string[]
  createdAt: string
  updatedAt: string
}
export type GenerateArticlePayload = {
  topic: string
  tone: string
  length: string
}
