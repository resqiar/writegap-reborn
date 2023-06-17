<script lang="ts">
	import type { PageData } from '../../../../../.svelte-kit/types/src/routes/blog/edit/[slug]/$types';
	import EditBlogBody from '../../../../components/body/EditBlogBody.svelte';
	import MainHeader from '../../../../components/header/MainHeader.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import type { ISafeBlogAuthor } from '../../../../types/Blog';
	import type UserProfile from '../../../../types/UserProfile';
	import MetaHead from '../../../../components/meta/MetaHead.svelte';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let blog: ISafeBlogAuthor = data.blog;

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title={`Editing "${blog.Title}" | Resqiar.com`} />

<header>
	<MainHeader active={1} user={profile} />

	<!-- Body -->
	<EditBlogBody {blog} />
</header>
