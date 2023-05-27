<script lang="ts">
	import type { PageData } from './$types';

	import IndexBlogBody from '../../components/body/IndexBlogBody.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Resdev's Blog</title>
</svelte:head>

<header>
	<MainHeader active={1} />

	<!-- Body -->
	<IndexBlogBody blogs={data.blogs} isError={data.error} />
</header>
