<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';
	import BlogCard from '../cards/BlogCard.svelte';

	const mockup: ISafeBlogAuthor = {
		ID: 'example',
		Title: 'Example Title',
		Slug: 'example',
		Summary: 'Example Summary',
		Content: '',
		CreatedAt: '',
		PublishedAt: '',
		UpdatedAt: '',
		CoverURL: '',
		AuthorID: '',
		Author: {
			ID: 'example',
			CreatedAt: '',
			UpdatedAt: '',
			Username: 'resqiar',
			Bio: 'desc',
			PictureURL: '',
			IsTester: true
		}
	};

	const blogs: ISafeBlogAuthor[] = [...Array(10).fill(mockup)];
</script>

<div class="hero bg-base-200 lg:min-h-[600px]">
	<div
		class="hero-content h-full w-full flex-col justify-center gap-12 py-0 lg:flex-row-reverse lg:px-8"
	>
		<img
			alt="Hero"
			src="/media/talent.webp"
			width="400"
			height="200"
			class="max-w-[250px] rounded-lg bg-red-500 object-cover lg:mr-8 lg:max-w-sm"
		/>

		<div class="w-full lg:max-w-[650px] lg:pr-16">
			<h1 class="justify text-5xl font-bold lg:leading-[60px]">Resqi Ageng Rahmatullah</h1>

			<p class="py-2 font-semibold leading-6">
				@resqiar <span class="font-normal">- Joined August 2023</span>
			</p>

			<p class="py-2 leading-6">
				Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint
				ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
				officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate
				dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea
				nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat
			</p>

			<div
				class="pointer-events-none relative mt-6 flex w-fit flex-wrap justify-center gap-12 px-4"
			>
				<div
					class="absolute inset-0 flex w-full items-center justify-center gap-2 backdrop-blur-[3px]"
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
							d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
						/>
					</svg>

					<p class="font-bold">Feature Locked for Future Update</p>
				</div>

				<p class="flex flex-col items-center lg:text-lg">
					<span class="font-bold lg:text-xl">102 </span>Followers
				</p>

				<p class="flex flex-col items-center lg:text-lg">
					<span class="font-bold lg:text-xl">10 </span>Blogs
				</p>

				<p class="flex flex-col items-center lg:text-lg">
					<span class="font-bold lg:text-xl">1K </span>Impressions
				</p>

				<p class="flex flex-col items-center lg:text-lg">
					<span class="font-bold lg:text-xl">500 </span>Upvotes
				</p>
			</div>
		</div>
	</div>
</div>

<div class="my-12 min-h-[300px]">
	<div class="mx-6 my-6 lg:mx-24">
		<h1 class="text-3xl font-bold">Author's Latest Blogs</h1>
	</div>

	<section class="my-6 flex flex-col flex-wrap justify-center gap-x-4 gap-y-6 lg:mb-24 lg:flex-row">
		{#each blogs as item}
			<BlogCard {item} />
		{/each}
	</section>
</div>
