export interface Project {
  id: number | string
  title: string
  slug: string
  summary: string
  description?: string
  content?: string
  cover?: string
  coverFit?: 'cover' | 'contain'
  techStack?: string[]
  demoUrl?: string
  repoUrl?: string
  role?: string
  period?: string
  featured?: boolean // 加這行
}
