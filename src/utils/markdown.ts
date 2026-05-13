import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
export const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="markdownCode"><code class="hljs language-${lang}">
${hljs.highlight(code, { language: lang }).value}
</code></pre>`;
      } catch {
        // fallback
      }
    }
    return `<pre class="markdownCode"><code class="hljs">
${MarkdownIt().utils.escapeHtml(code)}
</code></pre>`;
  },
});