<script lang="ts">
	import { Editor, type BytemdPlugin } from 'bytemd';

	// plugins
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import rehypeExternalLinks from 'rehype-external-links';

	import 'bytemd/dist/index.css';
	import '../../styles/mdeditor.css';
	import '../../styles/custom-bytemd.css';
	import '../../styles/highlighter/atom-one-dark.css';

	export let content: string = '';
	export let handleContentChange: (e: any) => void;

	function customURL(): BytemdPlugin {
		return {
			rehype: (processor) =>
				processor.use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
		};
	}

	let plugins: BytemdPlugin[] = [gfm(), highlight(), customURL()];
</script>

<Editor value={content} on:change={handleContentChange} mode="auto" maxLength={50000} {plugins} />
