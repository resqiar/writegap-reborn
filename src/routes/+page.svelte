<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { PUBLIC_SERVER_URL } from '$env/static/public';

	import MainBody from '../components/body/MainBody.svelte';
	import MainHeader from '../components/header/MainHeader.svelte';
	import type UserProfile from '../types/UserProfile';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;

	async function test() {
		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile`, { credentials: 'include' });
		console.log(req);
		console.log(req.status);
		console.log(await req.json());
	}

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
		await test();
	});
</script>

<svelte:head>
	<title>Blogs, Showcases and Playground | ResqiAR</title>
</svelte:head>

<main>
	<!-- Header -->
	<MainHeader user={profile} />

	<!-- Body -->
	<MainBody />

	<!-- Footer -->
</main>
