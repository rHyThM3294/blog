// src/stores/projects.store.ts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { projects as projectData } from '@/data/projects'
export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(projectData)
  const selectedProjectId = ref<string | null>(null)
  const featuredProjects = computed(() =>
    projects.value.filter((project) => project.featured)
  )
  const selectedProject = computed(() =>
    projects.value.find((project) => project.id === selectedProjectId.value) ?? null
  )
  function setSelectedProject(id: string | null){
    selectedProjectId.value = id
  }
  function getProjectById(id: string){
    return projects.value.find((project) => project.id === id) ?? null
  }
  return{
    projects,
    selectedProjectId,
    featuredProjects,
    selectedProject,
    setSelectedProject,
    getProjectById,
  }
})