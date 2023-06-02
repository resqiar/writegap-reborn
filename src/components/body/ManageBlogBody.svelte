<script lang="ts">
	import type { IBlog } from '../../types/Blog';
	import ManageBlog404 from '../404/ManageBlog404.svelte';
	import ManageBlogTable from '../tables/ManageBlogTable.svelte';

	export let publishedBlogs: IBlog[];
	export let draftedBlogs: IBlog[];
	export let error: boolean;

	let tabIndex: number = 0;
</script>

<main class="py-8 lg:px-20">
	<div class="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
		<!-- BLOGS TITLE & SUBTITLE -->
		<div class="mx-4">
			<h1 class="text-2xl font-bold">Manage Your Blogs</h1>
			<p>Keep track of which blogs are online and which are offline.</p>
		</div>

		<!-- CREATE BLOG BUTTON/LINK -->
		<a
			href="/blog/create"
			class="flex items-center justify-center gap-2 px-4 normal-case hover:underline"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-4 w-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
				/>
			</svg>
			Create Blog
		</a>
	</div>

	<!-- TABS -->
	<div class="tabs mx-4 mt-4">
		<button
			on:click={() => (tabIndex = 0)}
			class={`tab tab-lifted ${
				tabIndex === 0 ? 'tab-active !bg-base-200 font-semibold' : 'font-medium'
			}`}>Published</button
		>
		<button
			on:click={() => (tabIndex = 1)}
			class={`tab tab-lifted ${
				tabIndex === 1 ? 'tab-active !bg-base-200 font-semibold' : 'font-medium'
			}`}>Drafted</button
		>
	</div>

	<!-- DYNAMIC COMPONENTS BASED ON TAB INDEX -->
	<div class="mx-2 rounded-xl bg-base-200 lg:mx-0">
		<!-- IF FETCH DATA -NOT- CONTAINS ERROR -->
		{#if !error}
			<!-- IF TAB INDEX IS 0  -->
			<!-- IT MEANS THAT TAB STATUS NOW IN PUBLISHED  -->
			{#if tabIndex === 0}
				<!-- IF IT CONTAINS VALUE  -->
				{#if publishedBlogs.length}
					<div class="flex w-full flex-col items-center justify-center gap-2 lg:flex-row">
						<ManageBlogTable data={publishedBlogs} published />
					</div>
				{:else}
					<!-- ELSE SHOW 404 -->
					<ManageBlog404 published={true} />
				{/if}
				<!-- IF TAB INDEX IS NOT 0 && IT CONTAINS VALUE  -->
			{:else if draftedBlogs.length}
				<div class="flex w-full flex-col items-center justify-center gap-2 lg:flex-row">
					<ManageBlogTable data={draftedBlogs} published={false} />
				</div>
			{:else}
				<!-- ELSE SHOW 404 -->
				<ManageBlog404 published={false} />
			{/if}
		{:else}
			<!-- ELSE SHOW ERROR MESSAGE -->
			<div class="flex h-[400px] w-full flex-col items-center justify-center gap-2 lg:flex-row">
				<div class="flex flex-col items-center justify-center bg-base-200 px-4 py-16">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="my-2 h-16 w-16"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
						/>
					</svg>
					<h1 class="text-center text-lg font-bold lg:text-2xl">Whoops Something Went Wrong!</h1>
					<p class="text-center text-sm">
						We cannot get blogs data at the moment. We are working on it, please check back later?
					</p>
				</div>
			</div>
		{/if}
	</div>
</main>
