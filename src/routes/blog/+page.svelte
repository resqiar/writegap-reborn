<script lang="ts">
	import type { PageData } from './$types';
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';

	import IndexBlogBody from '../../components/body/IndexBlogBody.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';
	import type UserProfile from '../../types/UserProfile';
	import MetaHead from '../../components/meta/MetaHead.svelte';
	import { handleGetProfile } from '../../libs/GetProfile';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile | null = null;

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
		profile = await handleGetProfile();
	});
</script>

<!-- META TAG -->
<MetaHead title="Blog collection | Resqiar.com" />

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	<IndexBlogBody blogs={data.blogs} isError={data.error} />
</header>
