<script lang="ts">
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/blog/[slug]/$types';
	import type { ISafeBlogAuthor } from '../../../types/Blog';
	import type UserProfile from '../../../types/UserProfile';
	import DetailBlogBody from '../../../components/body/DetailBlogBody.svelte';
	import MainHeader from '../../../components/header/MainHeader.svelte';

	export let data: PageData;

	// Blog data derived from the SSR process
	// @see ./+page.server.ts
	let blog: ISafeBlogAuthor = data.blog;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;
</script>

<svelte:head>
	<title>{blog.Title} | Resdev's Blog</title>
</svelte:head>

<header>
	<MainHeader active={1} user={profile} />

	<!-- BODY -->
	<DetailBlogBody {blog} />
</header>
