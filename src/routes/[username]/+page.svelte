<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MetaHead from '../../components/meta/MetaHead.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';
	import UserProfileBody from '../../components/body/UserProfileBody.svelte';
	import type UserProfile from '../../types/UserProfile';
	import type { ISafeUser } from '../../types/UserProfile';
	import type { PageData } from './$types';
	import type { ISafeBlogAuthor } from '../../types/Blog';

	export let data: PageData;

	let currentUser: UserProfile | null = data.user;
	let profile: ISafeUser = data.profile;
	let blogs: ISafeBlogAuthor[] | null = data.blogs;

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead
	title={`${profile.Fullname} - @${profile.Username} Profile | Resqiar.com`}
	description={profile.Bio}
	imageURL={profile.PictureURL}
/>

<main>
	<MainHeader user={currentUser} active={-1} />

	<UserProfileBody {profile} {blogs} {currentUser} />
</main>
