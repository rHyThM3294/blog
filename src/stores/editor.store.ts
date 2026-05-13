// src/stores/editor.store.ts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { EditorDocument,GenerateArticlePayload,PromptMode, }from '@/types/editor'
function createEmptyDocument():EditorDocument{
  const now = new Date().toISOString()
  return{
    id: crypto.randomUUID(),
    title: '未命名文章',
    content: '',
    summary: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
  }
}
export const useEditorStore = defineStore('editor', () => {
  const documents = ref<EditorDocument[]>([createEmptyDocument()])
  const activeDocumentId = ref<string | null>(documents.value[0]?.id ?? null)
  const generating = ref(false)
  const streamingText = ref('')
  const promptMode = ref<PromptMode>('draft')
  const activeDocument = computed(() => {
    return documents.value.find((doc) => doc.id === activeDocumentId.value) ?? null
  })
  function setActiveDocument(id: string){
    activeDocumentId.value = id
  }
  function createDocument(){
    const newDocument = createEmptyDocument()
    documents.value.unshift(newDocument)
    activeDocumentId.value = newDocument.id
  }
  function deleteDocument(id: string){
    documents.value = documents.value.filter((doc) => doc.id !== id)
    if (activeDocumentId.value === id){
      activeDocumentId.value = documents.value[0]?.id ?? null
    }
    if (documents.value.length === 0){
      createDocument()
    }
  }
  function updateActiveDocument(payload: Partial<EditorDocument>){
    const current = activeDocument.value
    if (!current) return
    const index = documents.value.findIndex((doc) => doc.id === current.id)
    if (index === -1) return
    documents.value[index] = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }
  }
  function setPromptMode(mode: PromptMode){
    promptMode.value = mode
  }
  async function generateArticle(_payload: GenerateArticlePayload){
    generating.value = true
    streamingText.value = ''
    try {
      // 這裡先保留，之後再接真正 AI API
      await new Promise((resolve) => setTimeout(resolve, 800))
      const mockContent = `# AI 生成草稿\n\n這是一篇示範文章內容，之後你可以改成真正串接 API。`
      updateActiveDocument({
        title: 'AI 生成文章',
        content: mockContent,
        summary: '這是一篇由 AI 產生的示範摘要。',
      })
    }finally{
      generating.value = false
      streamingText.value = ''
    }
  }
  return{
    documents,
    activeDocumentId,
    generating,
    streamingText,
    promptMode,
    activeDocument,
    setActiveDocument,
    createDocument,
    deleteDocument,
    updateActiveDocument,
    setPromptMode,
    generateArticle,
  }
})