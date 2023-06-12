<script lang="ts">
	import { Editor, type BytemdPlugin } from 'bytemd';

	// plugins
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import '../../styles/highlighter/atom-one-dark.css';

	import 'bytemd/dist/index.css';
	import '../../styles/mdeditor.css';
	import '../../styles/custom-bytemd.css';

	export let content: string = '';
	export let handleContentChange: (e: any) => void;

	let plugins: BytemdPlugin[] = [gfm(), highlight()];
</script>

<Editor value={content} on:change={handleContentChange} mode="auto" maxLength={10000} {plugins} />
