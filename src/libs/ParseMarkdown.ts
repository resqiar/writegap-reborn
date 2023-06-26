import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import sanitizeHtml from 'sanitize-html';
import { allowedTags } from "../data/constants"

/**
* Compiles raw Markdown content using unified
* along with defined remark and rehype plugins.
*
* @param {string} raw - The raw Markdown content to compile.
* @returns {Promise<string>} - The compiled Markdown content.
*/
export default async function parseMD(raw: string): Promise<string> {
  const parsed = unified()
  .use(remarkParse)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(remarkGfm) // Github Flavoured Markdown
  .use(rehypeHighlight)
  .use(rehypeStringify, {allowDangerousHtml: true})
  .processSync(raw);

  const sanitizedDOM = sanitizeHtml(parsed.value.toString(), {
    allowedTags: allowedTags,
    allowedAttributes: {
      code: ["class"],
      span: ["class"],
      img: [ 'src', 'alt', 'width', 'height', 'target' ]
    },
  });

  return sanitizedDOM;
}
