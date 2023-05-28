<script lang="ts">
	import type { PageData } from './$types';

	import MainBody from '../components/body/MainBody.svelte';
	import MainHeader from '../components/header/MainHeader.svelte';
	import type UserProfile from '../types/UserProfile';
	import { UserProfileStore } from '../stores/UserStore';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;

	// update store value
	UserProfileStore.set(profile);
</script>

<svelte:head>
	<title>Resdev | Blogs, Showcases and Playground</title>
</svelte:head>

<main>
	<!-- Header -->
	<MainHeader />

	<!-- Body -->
	<MainBody />

	<!-- Footer -->
</main>
