<script lang="ts">
	import ManageBlogBody from '../../../components/body/ManageBlogBody.svelte';
	import MainHeader from '../../../components/header/MainHeader.svelte';
	import type { IBlog } from '../../../types/Blog';

	import type UserProfile from '../../../types/UserProfile';
	import type { PageData } from './$types';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let blogs: IBlog[] = data.blogs;

	let error: boolean = data.error ? data.error : false;
	let publishedBlogs = blogs.filter((v) => v.Published);
	let draftedBlogs = blogs.filter((v) => !v.Published);
</script>

<svelte:head>
	<title>Manage your blogs</title>
</svelte:head>

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	<ManageBlogBody {publishedBlogs} {draftedBlogs} {error} />
</header>
