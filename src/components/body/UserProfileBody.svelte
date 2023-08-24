<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';
	import type { ISafeUser } from '../../types/UserProfile';
	import BlogCard from '../cards/BlogCard.svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
	import LinkIcon from '../icons/LinkIcon.svelte';
	import LinkedInIcon from '../icons/LinkedInIcon.svelte';
	import TwitterIcon from '../icons/TwitterIcon.svelte';
	import YoutubeIcon from '../icons/YoutubeIcon.svelte';
	import EditProfileModal from '../modal/EditProfileModal.svelte';

	export let currentUser: ISafeUser | null;
	export let profile: ISafeUser;
	export let blogs: ISafeBlogAuthor[] | null;
	const isEditable: boolean = currentUser?.ID === profile.ID;
</script>

<!-- ONLY SHOW IF THE USER IS LOGIN AND HAS THE SAME ID AS CURRENT LOOKED PROFILE -->
{#if isEditable && currentUser}
	<div class="flex items-center justify-center bg-base-300 py-1 pb-2">
		<EditProfileModal {currentUser} />
	</div>
{/if}

<div class="hero bg-base-200 pt-6 lg:min-h-[600px] lg:pt-0">
	<div
		class="hero-content h-full w-full flex-col justify-center gap-12 py-0 lg:flex-row-reverse lg:px-8"
	>
		<img
			alt="Hero"
			src={profile.PictureURL}
			width="400"
			height="200"
			class="max-w-[250px] rounded-lg object-cover lg:mr-8 lg:max-w-sm"
		/>

		<div class="w-full lg:max-w-[650px] lg:pr-16">
			<h1
				class="justify text-center text-3xl font-bold md:text-start lg:text-5xl lg:leading-[60px]"
			>
				{profile.Fullname}
			</h1>

			<p class="py-2 text-center font-semibold leading-6 md:text-start">
				@{profile.Username}
				<span class="font-normal"
					>- Joined
					{new Date(profile.CreatedAt).toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric'
					})}
				</span>
			</p>

			<p class="mt-4 whitespace-break-spaces py-2 leading-6 md:mt-0">
				{profile.Bio}
			</p>

			<!-- SOCIAL MEDIA -->
			<div class="mb-12 mt-4 flex flex-col items-center lg:mb-0 lg:flex-row">
				<div>
					{#if profile.WebsiteURL.trim().length}
						<a
							href={profile.WebsiteURL}
							target="_blank"
							class="btn btn-square btn-ghost"
							title="Website"
							rel="nofollow noopener"
						>
							<LinkIcon />
						</a>
					{/if}

					{#if profile.GithubURL.trim().length}
						<a
							href={profile.GithubURL}
							target="_blank"
							class="btn btn-square btn-ghost"
							title="GitHub"
							rel="nofollow noopener"
						>
							<GithubIcon />
						</a>
					{/if}

					{#if profile.LinkedinURL.trim().length}
						<a
							href={profile.LinkedinURL}
							target="_blank"
							class="btn btn-square btn-ghost"
							title="LinkedIn"
							rel="nofollow noopener"
						>
							<LinkedInIcon />
						</a>
					{/if}

					{#if profile.TwitterURL.trim().length}
						<a
							href={profile.TwitterURL}
							target="_blank"
							class="btn btn-square btn-ghost"
							title="Twitter"
							rel="nofollow noopener"
						>
							<TwitterIcon />
						</a>
					{/if}

					{#if profile.YoutubeURL.trim().length}
						<a
							href={profile.YoutubeURL}
							target="_blank"
							class="btn btn-square btn-ghost"
							title="Youtube"
							rel="nofollow noopener"
						>
							<YoutubeIcon />
						</a>
					{/if}
				</div>
			</div>

			<!-- FEATURE LOCKED -->
			<!-- <div -->
			<!-- 	class="pointer-events-none relative mb-12 mt-6 flex w-fit flex-wrap justify-center gap-12 px-4 md:mb-4" -->
			<!-- > -->
			<!-- 	<div -->
			<!-- 		class="absolute inset-0 flex w-full items-center justify-center gap-2 backdrop-blur-[3px]" -->
			<!-- 	> -->
			<!-- 		<svg -->
			<!-- 			xmlns="http://www.w3.org/2000/svg" -->
			<!-- 			fill="none" -->
			<!-- 			viewBox="0 0 24 24" -->
			<!-- 			stroke-width="1.5" -->
			<!-- 			stroke="currentColor" -->
			<!-- 			class="h-4 w-4" -->
			<!-- 		> -->
			<!-- 			<path -->
			<!-- 				stroke-linecap="round" -->
			<!-- 				stroke-linejoin="round" -->
			<!-- 				d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" -->
			<!-- 			/> -->
			<!-- 		</svg> -->
			<!---->
			<!-- 		<p class="font-bold">Feature Locked for Future Update</p> -->
			<!-- 	</div> -->
			<!---->
			<!-- 	<p class="flex flex-col items-center lg:text-lg"> -->
			<!-- 		<span class="font-bold lg:text-xl">102 </span>Followers -->
			<!-- 	</p> -->
			<!---->
			<!-- 	<p class="flex flex-col items-center lg:text-lg"> -->
			<!-- 		<span class="font-bold lg:text-xl">10 </span>Blogs -->
			<!-- 	</p> -->
			<!---->
			<!-- 	<p class="flex flex-col items-center lg:text-lg"> -->
			<!-- 		<span class="font-bold lg:text-xl">1K </span>Impressions -->
			<!-- 	</p> -->
			<!---->
			<!-- 	<p class="flex flex-col items-center lg:text-lg"> -->
			<!-- 		<span class="font-bold lg:text-xl">500 </span>Upvotes -->
			<!-- 	</p> -->
			<!-- </div> -->
		</div>
	</div>
</div>

<div class="my-12 min-h-[300px]">
	<div class="mx-6 my-6 lg:mx-24">
		<h1 class="text-3xl font-bold">Author's Blogs</h1>
	</div>

	<section class="my-6 flex flex-col flex-wrap justify-center gap-x-4 gap-y-6 lg:mb-24 lg:flex-row">
		{#if blogs && blogs.length}
			<!-- ONLY SHOW WHEN THERE IS A BLOG -->
			{#each blogs as item}
				<BlogCard {item} />
			{/each}
		{:else}
			<!-- OTHERWISE, DISPLAY MESSAGE TO THE USER, -->
			<div class="flex items-center gap-2 py-12">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-12 w-12"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
					/>
				</svg>

				<div>
					<h1 class="text-xl font-semibold">No Blogs Just Yet!</h1>
					<p>The author currently has no blogs to be shown here. Maybe check back later?</p>
				</div>
			</div>
		{/if}
	</section>
</div>
