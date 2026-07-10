import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('預設渲染為 button，且套用 primary 樣式', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: '送出' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.classes()).toContain('variant-primary')
    expect(wrapper.text()).toBe('送出')
  })

  it('tag 為 a 時渲染為外部連結並帶上安全屬性', () => {
    const wrapper = mount(BaseButton, {
      props: { tag: 'a', href: 'https://example.com' },
      slots: { default: '前往' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noreferrer noopener')
  })

  it('variant 屬性會套用對應的樣式 class', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'ghost' },
    })
    expect(wrapper.classes()).toContain('variant-ghost')
  })

  it('tag 為 RouterLink 時會渲染出正確的路由連結', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div />' } }],
    })
    const wrapper = mount(BaseButton, {
      props: { tag: 'RouterLink', to: '/' },
      slots: { default: '首頁' },
      global: { plugins: [router] },
    })
    expect(wrapper.attributes('href')).toBe('/')
  })
})
