<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { handleGetProfile } from '../libs/GetProfile';
	import MainBody from '../components/body/MainBody.svelte';
	import MainHeader from '../components/header/MainHeader.svelte';
	import type UserProfile from '../types/UserProfile';
	import MetaHead from '../components/meta/MetaHead.svelte';

	let profile: UserProfile | null = null;

	onMount(async () => {
		themeChange(false);
		profile = await handleGetProfile();
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
