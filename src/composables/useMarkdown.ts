/**
 * Vue 3 Composable: Markdown 相關功能
 * 此 composable 提供 Markdown 的解析和渲染功能
 */
export function useMarkdown() {
  /**
   * 簡單的 Markdown 標題提取器
   * @example
   * extractHeadings('# Title\n## Subtitle') // ['Title', 'Subtitle']
   */
  const extractHeadings = (markdown: string): string[] => {
    const headings: string[] = []
    const lines = markdown.split('\n')
    
    lines.forEach((line) => {
      if (line.startsWith('#')) {
        const heading = line.replace(/^#+\s*/, '').trim()
        if (heading) {
          headings.push(heading)
        }
      }
    })
    
    return headings
  }

  /**
   * 生成目錄的 HTML
   */
  const generateTableOfContents = (markdown: string): string => {
    const headings = extractHeadings(markdown)
    
    if (headings.length === 0) return ''
    
    const toc = headings
      .map((heading, index) => `<li><a href="#heading-${index}">${heading}</a></li>`)
      .join('')
    
    return `<ul class="toc">${toc}</ul>`
  }

  /**
   * 計算 Markdown 的字數
   */
  const countWords = (markdown: string): number => {
    return markdown.trim().split(/\s+/).length
  }

  return {
    extractHeadings,
    generateTableOfContents,
    countWords,
  }
}
