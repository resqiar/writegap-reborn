<script lang="ts">
	import type { PageData } from '../../../../../.svelte-kit/types/src/routes/blog/edit/[slug]/$types';
	import type { ISafeBlogAuthor } from '../../../../types/Blog';
	import type UserProfile from '../../../../types/UserProfile';

	export let data: PageData;

	// Profile data derived from the SSR process
	// @see ./+page.server.ts
	let profile: UserProfile = data.user;
	let blog: ISafeBlogAuthor = data.blog;
</script>

<svelte:head>
	<title>Editing "{blog.Title}" | Resdev</title>
</svelte:head>

<h1>{profile.ID}</h1>
