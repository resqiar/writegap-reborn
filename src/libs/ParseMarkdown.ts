import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

/**
 * Compiles raw Markdown content using unified
 * along with defined remark and rehype plugins.
 *
 * @param {string} raw - The raw Markdown content to compile.
 * @returns {Promise<string>} - The compiled Markdown content.
 */
export async function parseMD(raw: string): Promise<string> {
	const parsed = unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(remarkGfm) // Github Flavoured Markdown
		.use(rehypeSanitize, {
			...defaultSchema,
			attributes: {
				...defaultSchema.attributes,
				code: [
					...(defaultSchema.attributes?.code || []),
					// List of all allowed languages:
					['className']
				]
			}
		})
		.use(rehypeHighlight)
		.use(rehypeStringify)
		.processSync(raw);

	return parsed.value.toString();
}
