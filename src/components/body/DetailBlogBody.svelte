<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';
	import '../../styles/mdeditor.css';
	import TesterBadge from '../badges/TesterBadge.svelte';
	import TranslationMenu from '../menu/TranslationMenu.svelte';
	import { handleGetPrevNext } from '../../libs/GetPrevNext';
	import { onMount } from 'svelte';
	import PrevNextCard from '../cards/PrevNextCard.svelte';
	import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon.svelte';
	import CircleArrowRightIcon from '../icons/CircleArrowRightIcon.svelte';

	export let blog: ISafeBlogAuthor;

	let prevBlog: ISafeBlogAuthor | null = null;
	let nextBlog: ISafeBlogAuthor | null = null;

	onMount(
		async () =>
			await handleGetPrevNext(
				blog.Prev.trim(),
				blog.Next.trim(),
				(prev: ISafeBlogAuthor | null, next: ISafeBlogAuthor | null) => {
					if (prev) {
						prevBlog = prev;
					}
					if (next) {
						nextBlog = next;
					}
				}
			)
	);
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
				{#if blog.Author.PictureURL}
					<div class="avatar">
						<div class="w-8 rounded-full lg:w-12">
							<img
								src={blog.Author.PictureURL}
								alt={`${blog.Author.Username}'s Profile`}
								loading="lazy"
							/>
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="w-10 rounded-full bg-neutral-focus text-neutral-content lg:w-12">
							<span class="text-xl">{blog.Author.Username[0]}</span>
						</div>
					</div>
				{/if}

				<div>
					<div class="flex items-center gap-1">
						<p class="text-sm font-bold">{blog.Author.Username}</p>

						<!-- SHOW BADGES -->
						{#if blog.Author.IsTester}
							<span class="mx-1 hidden lg:flex">&#x2022</span>
							<div class="hidden lg:flex">
								<TesterBadge />
							</div>
						{/if}
					</div>

					<div class="flex flex-col lg:flex-row lg:items-center">
						<p class="text-xs lg:text-sm">
							published at <span class="font-semibold"
								>{new Date(blog.PublishedAt).toDateString()}</span
							>
						</p>

						<!-- IF THE BLOG IS UPDATED AT LEAST 1 SEC AFTER PUBLICATION -->
						<!-- THEN SHOW THE LAST UPDATED MESSAGE -->
						{#if new Date(blog.UpdatedAt).getTime() - new Date(blog.PublishedAt).getTime() > 1000}
							<span class="mx-1 hidden lg:flex">&#x2022</span>
							<p class="text-xs lg:text-sm">
								Last updated
								<span class="font-semibold">{new Date(blog.UpdatedAt).toDateString()}</span>
							</p>
						{/if}
					</div>
				</div>
			</div>

			<div class="flex gap-2">
				{#if prevBlog || nextBlog}
					<div class="flex w-full items-center">
						{#if prevBlog}
							<a
								href={`/blog/${prevBlog.Author.Username}/${prevBlog.Slug}`}
								rel="nofollow noopener"
								target="_blank"
								class="btn btn-circle btn-ghost btn-sm lg:btn-md"
								title="Previous Blog"
							>
								<CircleArrowLeftIcon />
							</a>
						{/if}

						{#if nextBlog}
							<a
								href={`/blog/${nextBlog.Author.Username}/${nextBlog.Slug}`}
								rel="nofollow noopener"
								target="_blank"
								class="btn btn-circle btn-ghost btn-sm lg:btn-md"
								title="Next Blog"
							>
								<CircleArrowRightIcon />
							</a>
						{/if}
					</div>
				{/if}

				<!-- TRANSLATION Menu -->
				<TranslationMenu blogID={blog.ID} />
			</div>
		</div>

		{#if blog.CoverURL}
			<div class="mb-12 mt-4 w-full self-center rounded shadow-2xl">
				<img
					class="aspect-video w-full rounded object-cover"
					src={blog.CoverURL}
					alt="Blog Cover"
				/>
			</div>
		{/if}

		{#if prevBlog || nextBlog}
			<div
				class="mt-4 flex w-full flex-col gap-4 lg:mb-12 lg:flex-row lg:items-center lg:justify-between"
			>
				<div>
					{#if prevBlog}
						<a
							href={`/blog/${prevBlog.Author.Username}/${prevBlog.Slug}`}
							rel="nofollow noopener"
							target="_blank"
							class="flex flex-col items-start gap-2"
						>
							<div class="flex items-center gap-2">
								<CircleArrowLeftIcon />
								<h3 class="text-xl font-bold lg:text-2xl">Previous Blog</h3>
							</div>

							<PrevNextCard item={prevBlog} />
						</a>
					{/if}
				</div>

				<div>
					{#if nextBlog}
						<a
							href={`/blog/${nextBlog.Author.Username}/${nextBlog.Slug}`}
							rel="nofollow noopener"
							target="_blank"
							class="flex flex-col items-end gap-2"
						>
							<div class="flex items-center gap-2">
								<h3 class="text-xl font-bold lg:text-2xl">Next Blog</h3>
								<CircleArrowRightIcon />
							</div>

							<PrevNextCard item={nextBlog} />
						</a>
					{/if}
				</div>
			</div>
		{/if}

		<article class="markdown-body my-4 px-4 lg:px-0">
			{@html blog.Content}
		</article>
	</div>
</main>
