<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';
	import '../../styles/mdeditor.css';

	export let blog: ISafeBlogAuthor;
</script>

<main class="my-2 flex justify-center lg:my-6">
	<div class="mx-4 flex flex-col lg:mx-16 lg:w-[70%]">
		<div class="my-4 self-center lg:my-6">
			<h1 class="text-center text-4xl font-bold">
				{blog.Title}
			</h1>
		</div>

		<div class="my-4 flex items-center justify-between gap-2 rounded bg-base-300 p-2 py-4 lg:p-4">
			<div class="flex items-center gap-2">
				<div class="avatar">
					<div class="w-8 rounded-full lg:w-10">
						<img src={blog.Author.PictureURL} alt="Author" />
					</div>
				</div>

				<div>
					<p class="font-bold">{blog.Author.Username}</p>
					<p class="text-sm">
						published at <span class="font-semibold"
							>{new Date(blog.PublishedAt).toDateString()}</span
						>
					</p>
				</div>
			</div>

			<div>
				<button disabled class="btn-ghost disabled btn-sm btn-circle btn lg:btn-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4 lg:h-6 lg:w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
				</button>

				<button disabled class="btn-ghost disabled btn-sm btn-circle btn lg:btn-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4 lg:h-6 lg:w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
				</button>

				<button disabled class="btn-ghost disabled btn-sm btn-circle btn lg:btn-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4 lg:h-6 lg:w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
						/>
					</svg>
				</button>
			</div>
		</div>

		{#if blog.CoverURL}
			<div class="my-4 w-full self-center rounded shadow-2xl">
				<img
					class="aspect-video w-full rounded object-cover"
					src={blog.CoverURL}
					alt="Blog Cover"
				/>
			</div>
		{/if}

		<div class="markdown-body my-4">
			{@html blog.Content}
		</div>
	</div>
</main>
