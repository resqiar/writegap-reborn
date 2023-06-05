<script lang="ts">
	import type { ISafeBlog } from '../../types/Blog';

	export let item: ISafeBlog;

	let showSummary: boolean = false;
</script>

<a
	href={`/blog/${item.ID}`}
	class="card h-min w-96 flex-wrap bg-base-300 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
>
	{#if item.CoverURL}
		<figure>
			<img alt="Blog Cover" src={item.CoverURL} class="max-h-[200px] w-full object-cover" />
		</figure>
	{/if}

	<div class="card-body pb-6">
		<h2 class="card-title text-xl font-bold">{item.Title}</h2>

		<div class="my-2">
			<div class="flex items-center gap-2">
				<div class="placeholder avatar">
					<div class="w-10 rounded-full bg-neutral-focus text-neutral-content">
						<span class="text-xl">K</span>
					</div>
				</div>

				<div>
					<p class="text-sm font-semibold">The Author Name</p>
					<p class="text-sm">
						published at <span class="font-semibold">{new Date().toDateString()}</span>
					</p>
				</div>
			</div>
		</div>

		<div>
			<p class={`text-md ${!showSummary ? 'line-clamp-2' : ''}`}>
				{item.Summary}
			</p>
		</div>

		{#if item.Summary.length > 80}
			<div class="mt-2 flex justify-center text-sm hover:underline">
				{#if !showSummary}
					<button class="flex items-end gap-1" on:click={() => (showSummary = true)}>
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
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
						See More</button
					>
				{:else}
					<button class="flex items-start gap-1" on:click={() => (showSummary = false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
						</svg>
						Show Less</button
					>
				{/if}
			</div>
		{/if}
	</div>
</a>
