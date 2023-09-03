<script lang="ts">
	import type { PageData } from './$types';
	import type { ISafeBlogAuthor } from '../../../../types/Blog';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import type UserProfile from '../../../../types/UserProfile';
	import DetailBlogBody from '../../../../components/body/DetailBlogBody.svelte';
	import MainHeader from '../../../../components/header/MainHeader.svelte';
	import MetaHead from '../../../../components/meta/MetaHead.svelte';
	import SchemaHead from '../../../../components/meta/SchemaHead.svelte';
	import { handleGetProfile } from '../../../../libs/GetProfile';

	export let data: PageData;

	// Blog data derived from the SSR process
	// @see ./+page.server.ts
	let blog: ISafeBlogAuthor = data.blog;

	let profile: UserProfile | null = null;

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
		profile = await handleGetProfile();
	});
</script>

<!-- META TAGs -->
<MetaHead
	title={`${blog.Title} by ${blog.Author.Username} | Blog | Resqiar.com`}
	url={`https://resqiar.com/blog/${blog.Author.Username}/${blog.Slug}`}
	description={blog.Summary}
	imageURL={blog.CoverURL}
/>
<SchemaHead {blog} />

<!-- HEADER -->
<header>
	<MainHeader active={1} user={profile} />
</header>

<!-- BODY -->
<DetailBlogBody {blog} />
