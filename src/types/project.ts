export interface Project {
  id: number | string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  content?: string;
  cover?: string;
  techStack?: string[];
  demoUrl?: string;
  repoUrl?: string;
  role?: string;
  period?: string;
}