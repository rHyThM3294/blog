export type Post = {
  id: number | string
  title: string
  slug: string
  summary: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
}
