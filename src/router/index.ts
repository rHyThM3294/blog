import { createRouter, createWebHashHistory } from "vue-router";
const AppLayout = () => import("@/layouts/AppLayout.vue");
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const ProjectsView = () => import("@/views/ProjectsView.vue");
const ProjectDetailView = () => import("@/views/ProjectDetailView.vue");
const BlogView = () => import("@/views/BlogView.vue");
const BlogDetailView = () => import("@/views/BlogDetailView.vue");
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        { path: "", component: HomeView },
        { path: "about", component: AboutView },
        { path: "projects", component: ProjectsView },
        { path: "projects/:slug", component: ProjectDetailView },
        { path: "blog", component: BlogView },
        { path: "blog/:slug", component: BlogDetailView },
      ],
    },
  ],
  // 每次切換頁面都立即回到頂部，不帶過渡效果
  scrollBehavior(){
    return { top: 0, behavior: "instant" };
  },
});

export default router;