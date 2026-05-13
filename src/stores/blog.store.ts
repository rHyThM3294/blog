import { computed, ref } from 'vue'
import{ defineStore }from 'pinia'
import type { BlogPost } from '../types/blog'
export const useBlogStore = defineStore('blog', () => {
    const posts = ref<BlogPost[]>([
        {
            id:'post-1',
            slug:'how-i-built-ai-chathub',
            title:'我是如何打造AI Chat Hub 的',
            summary:'記錄我是如何用Vue3、Pinia與Vercel建立AI對話產品。',
            content:'# AI Chat Hub\n\n這是一篇示範文章內容',
            tags:['Vue','AI','Vercel'],
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),
            published:true,
        },
        {
            id:'post-2',
            slug:'morning-farm-component-thinking',
            title:'Morning Farm的元件拆分思路',
            summary:'分享我在電商專案中如何拆元件與管理畫面結構',
            content:'# Morning Farm\n\n這也是一篇示範文章內容',
            tags:['Vue','Component','Pinia'],
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),
            published:true,
        },
    ])
    const searchKeyword = ref('')
    const selectedTag = ref('all')
    const publishedPosts = computed(() => posts.value.filter((post) => post.published))
    const allTags = computed(() =>{
        const tagSet = new Set<string>()
        publishedPosts.value.forEach((post) => {
            post.tags.forEach((tag) => tagSet.add(tag))
        })
        return['all',...Array.from(tagSet)]
    })
    const filteredPosts = computed(() => {
        const keyword = searchKeyword.value.trim().toLowerCase()
        return publishedPosts.value.filter((post) => {
            const matchesKeyword = !keyword || post.title.toLowerCase().includes(keyword) || post.summary.toLowerCase().includes(keyword) || post.tags.some((tag) => tag.toLowerCase().includes(keyword))
            const matchesTag = selectedTag.value === 'all' || post.tags.includes(selectedTag.value)
            return matchesKeyword && matchesTag
        })
    })
    const recentPosts = computed(() => 
        [...publishedPosts.value]
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 3)
    )
    function setSearchKeyword(value: string){
        searchKeyword.value = value
    }
    function setSelectedTag(tag: string){
        selectedTag.value = tag
    }
    function getPostBySlug(slug:string){
        return posts.value.find((post) => post.slug === slug) ?? null
    }
    function createPost(payload:BlogPost){
        posts.value.unshift(payload)
    }
    function updatePost(updatedPost:BlogPost){
        const index = posts.value.findIndex((post) => post.id === updatedPost.id)
        if(index === -1)return
        posts.value[index] = updatedPost
    }
    function deletePost(id:string){
        posts.value = posts.value.filter((post) => post.id !== id)
    }
    return{
        posts,
        searchKeyword,
        selectedTag,
        publishedPosts,
        allTags,
        filteredPosts,
        recentPosts,
        setSearchKeyword,
        setSelectedTag,
        getPostBySlug,
        createPost,
        updatePost,
        deletePost,
    }
})