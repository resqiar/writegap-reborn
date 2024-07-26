<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MainBody from '../components/body/MainBody.svelte';
	import MainHeader from '../components/header/MainHeader.svelte';
	import type UserProfile from '../types/UserProfile';
	import MetaHead from '../components/meta/MetaHead.svelte';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = data.user;

	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Blogs, Showcases and Playground | Resqiar.com" />

<main>
	<!-- Header -->
	<MainHeader user={profile} />

	<!-- Body -->
	<MainBody />

	<!-- Footer -->
</main>
