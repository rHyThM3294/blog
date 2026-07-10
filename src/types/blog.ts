export type BlogPost = {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  tags: string[]
  converImage?: string
  createdAt: string
  updatedAt: string
  published: boolean
}
