<script lang="ts">
	import type { PageData } from './$types';

	import IndexBlogBody from '../../components/body/IndexBlogBody.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';
	import type UserProfile from '../../types/UserProfile';
	import { UserProfileStore } from '../../stores/UserStore';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;

	// update store value
	UserProfileStore.set(profile);
</script>

<svelte:head>
	<title>Resdev's Blog</title>
</svelte:head>

<header>
	<MainHeader active={1} />

	<!-- Body -->
	<IndexBlogBody blogs={data.blogs} isError={data.error} />
</header>
