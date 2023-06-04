<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';
	import '../../styles/mdeditor.css';

	export let blog: ISafeBlogAuthor;
</script>

<main class="my-6 flex justify-center">
	<div class="mx-16 flex flex-col lg:w-[70%]">
		<div class="my-6 self-center">
			<h1 class="text-center text-4xl font-bold">
				{blog.Title}
			</h1>
		</div>

		<div class="my-4 flex items-center gap-4 rounded bg-base-300 p-4">
			<div class="avatar">
				<div class="w-12 rounded-full">
					<img src={blog.Author.PictureURL} alt="Author" />
				</div>
			</div>

			<div>
				<p class="font-bold">{blog.Author.Username}</p>
				<p>
					published at <span class="font-semibold">{new Date(blog.CreatedAt).toDateString()}</span>
				</p>
			</div>
		</div>

		{#if blog.CoverURL}
			<div class="w-full self-center rounded shadow-2xl">
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
