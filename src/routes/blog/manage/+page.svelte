<script lang="ts">
	import getCurrentBlogs from '../../../libs/GetCurrentBlogs';
	import ManageBlogBody from '../../../components/body/ManageBlogBody.svelte';
	import MainHeader from '../../../components/header/MainHeader.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import type UserProfile from '../../../types/UserProfile';
	import type { IBlog } from '../../../types/Blog';
	import type { PageData } from './$types';
	import MetaHead from '../../../components/meta/MetaHead.svelte';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let blogs: IBlog[] = data.blogs;
	let error: boolean = data.error ? data.error : false;

	/**
	 * Reactively filters the 'blogs' array into two separate arrays.
	 * 'publishedBlogs' contains blogs with the 'Published' property set to true.
	 * 'draftedBlogs' contains blogs with the 'Published' property set to false.
	 * The "$" sign is basically the same function as useEffect.
	 */
	$: publishedBlogs = blogs.filter((v) => v.Published);
	$: draftedBlogs = blogs.filter((v) => !v.Published);

	// Handles the data change by fetching the current blogs and updating the 'blogs' variable.
	// @returns {Promise<void>} A promise that resolves when the data change is handled.
	async function handleDataChange(): Promise<void> {
		const newData: IBlog[] | undefined = await getCurrentBlogs();

		// If new data is available, update the 'blogs' variable
		if (newData) blogs = newData;
	}

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Manage your blogs | Resqiar.com" />

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	<ManageBlogBody
		userProfile={profile}
		{publishedBlogs}
		{draftedBlogs}
		{error}
		onDataChange={handleDataChange}
	/>
</header>
