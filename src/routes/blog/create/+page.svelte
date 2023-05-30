<script lang="ts">
	import CreateBlogBody from '../../../components/body/CreateBlogBody.svelte';
	import MainHeader from '../../../components/header/MainHeader.svelte';
	import IneligibleMessage from '../../../components/others/IneligibleMessage.svelte';

	import type UserProfile from '../../../types/UserProfile';
	import type { PageData } from './$types';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let eligible: boolean = data.eligible;
</script>

<svelte:head>
	<title>Create New Blog</title>
</svelte:head>

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	{#if eligible}
		<CreateBlogBody />
	{:else}
		<div class="mx-4 my-12 lg:mx-24">
			<IneligibleMessage />
		</div>
	{/if}
</header>
