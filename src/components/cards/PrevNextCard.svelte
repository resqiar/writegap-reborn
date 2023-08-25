<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';

	export let item: ISafeBlogAuthor;

	let showSummary: boolean = false;
</script>

<div class="card image-full w-full flex-wrap bg-base-300 shadow-xl lg:h-[100px] lg:w-96">
	{#if item.CoverURL}
		<figure><img src={item.CoverURL} class="h-full w-full object-cover" alt="Blog Cover" /></figure>
	{/if}

	<div class="card-body">
		<h2 class="card-title text-xl font-bold">{item.Title}</h2>

		<div>
			<p class={`text-md ${!showSummary ? 'line-clamp-2' : ''}`}>
				{item.Summary}
			</p>
		</div>

		{#if item.Summary.length > 80}
			<div class="mt-2 flex justify-center text-sm hover:underline">
				{#if !showSummary}
					<button class="flex items-end gap-1" on:click|preventDefault={() => (showSummary = true)}>
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
					<button
						class="flex items-start gap-1"
						on:click|preventDefault={() => (showSummary = false)}
					>
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
</div>
