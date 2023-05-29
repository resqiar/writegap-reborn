<script lang="ts">
	import MainHeader from '../../../components/header/MainHeader.svelte';

	import type UserProfile from '../../../types/UserProfile';
	import type { PageData } from './$types';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let eligible: boolean = data.eligible;
</script>

<svelte:head>
	<title>Manage your blogs</title>
</svelte:head>

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	{#if eligible}
		<h1>You are eligible for test!</h1>
	{:else}
		<h1>You are NOT eligible!</h1>
	{/if}
</header>
