<script lang="ts">
	import type { ISafeBlogAuthor } from '../../types/Blog';

	export let blog: ISafeBlogAuthor;
</script>

<main class="my-6 flex justify-center">
	<div class="mx-16 flex flex-col lg:w-[70%]">
		<div class="my-6 self-center">
			<h1 class="text-center text-4xl font-bold">
				Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur
				cupidatat.
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
					blog created at <span class="font-semibold"
						>{new Date(blog.CreatedAt).toLocaleString()}</span
					>
				</p>
			</div>
		</div>

		<div class="w-full self-center rounded shadow-2xl">
			<img class="aspect-video w-full rounded object-cover" src={blog.CoverURL} alt="Blog Cover" />
		</div>

		<div class="my-4">
			<p>
				Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint
				ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
				officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate
				dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea
				nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat
				officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
				officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
				Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
			</p>
		</div>
	</div>
</main>
