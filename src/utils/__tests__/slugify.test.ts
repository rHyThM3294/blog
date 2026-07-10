import { describe, it, expect } from 'vitest'
import { slugify } from '../slugify'

describe('slugify', () => {
  it('轉換為小寫並以連字號取代空白', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('移除標點符號', () => {
    expect(slugify('What is Vue.js?')).toBe('what-is-vuejs')
  })

  it('去除頭尾多餘的連字號', () => {
    expect(slugify('  --Hello World--  ')).toBe('hello-world')
  })

  it('將連續空白或底線合併為單一連字號', () => {
    expect(slugify('Hello   World_Foo')).toBe('hello-world-foo')
  })

  it('空字串回傳空字串', () => {
    expect(slugify('')).toBe('')
  })
})
