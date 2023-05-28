<script lang="ts">
	import type { PageData } from './$types';

	import MainBody from '../components/body/MainBody.svelte';
	import MainHeader from '../components/header/MainHeader.svelte';
	import type UserProfile from '../types/UserProfile';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;
</script>

<svelte:head>
	<title>Resdev | Blogs, Showcases and Playground</title>
</svelte:head>

<main>
	<!-- Header -->
	<MainHeader user={profile} />

	<!-- Body -->
	<MainBody />

	<!-- Footer -->
</main>
