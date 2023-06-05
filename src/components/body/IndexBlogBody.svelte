<script lang="ts">
	import type { ISafeBlog } from '../../types/Blog';
	import BlogCard from '../cards/BlogCard.svelte';
	import SimpleHero from '../hero/SimpleHero.svelte';

	export let blogs: ISafeBlog[] = [];
	export let isError: boolean = false;
</script>

<main>
	<!-- HERO -->
	<SimpleHero
		heroTitle="Blog & Thought"
		heroDesc="Join me on this adventure as we delve into captivating stories and a realm of knowledge that
				will ignite your inspiration and leave you craving for more."
	/>

	<section
		class="mx-2 my-6 flex flex-col flex-wrap justify-center gap-4 lg:mx-16 lg:my-24 lg:flex-row"
	>
		{#if !isError}
			<!-- IF THERE IS NO ERROR FETCHING USER DATA -->
			<!-- THEN DISPLAY THE APROPRIATE COMPONENT -->
			{#each blogs as item}
				<BlogCard {item} />
			{/each}
		{:else}
			<!-- OTHERWISE, DISPLAY ERROR MESSAGE TO THE USER, -->
			<!-- INDICATING SOMETHING WENT WRONG -->
			<div class="flex items-center gap-2">
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
					<h1 class="text-xl font-semibold">Something Went Wrong...</h1>
					<p>
						We cannot get blogs data at the moment. We are working on it, please check back later?
					</p>
				</div>
			</div>
		{/if}
	</section>
</main>
