<script lang="ts">
	import { Editor, type BytemdPlugin } from 'bytemd';

	// plugins
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import 'highlight.js/styles/default.css';

	import 'bytemd/dist/index.css';
	import '../../styles/mdeditor.css';

	export let content: string = '';
	export let handleContentChange: (e: any) => void;

	let plugins: BytemdPlugin[] = [gfm(), highlight()];
</script>

<Editor value={content} on:change={handleContentChange} mode="auto" maxLength={10000} {plugins} />
