<script lang="ts">
	import IndexBlogBody from '../../components/body/IndexBlogBody.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';
</script>

<svelte:head>
	<title>Resdev's Blog</title>
</svelte:head>

<header>
	<MainHeader active={1} />

	<!-- Body -->
	<IndexBlogBody />
</header>
