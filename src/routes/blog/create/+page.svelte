<script lang="ts">
	import CreateBlogBody from '../../../components/body/CreateBlogBody.svelte';
	import MainHeader from '../../../components/header/MainHeader.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	import type UserProfile from '../../../types/UserProfile';
	import type { PageData } from './$types';
	import MetaHead from '../../../components/meta/MetaHead.svelte';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Create a New Blog | Resqiar.com" />

<!-- PREVENT USER FROM ACCIDENTALLY CLOSE THE PAGE -->
<svelte:window
	on:beforeunload|preventDefault={(e) => {
		e.returnValue = '';
	}}
/>

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	<CreateBlogBody {profile} />
</header>
