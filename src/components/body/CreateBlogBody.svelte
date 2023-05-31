<script lang="ts">
	import { fade } from 'svelte/transition';
	import { handleBlogCreate } from '../../libs/CreateBlog';
	import ConfirmationModal from '../modal/ConfirmationModal.svelte';
	import ImageDropzone from '../others/ImageDropzone.svelte';

	let title: string = '';
	let summary: string = '';
	let content: string = '';
	let imageFile: File | null = null;
	let preview: string | ArrayBuffer | null = null;
	let errorMessage: string = '';
	let createLoading: boolean = false;

	$: if (imageFile) {
		const previewReader: FileReader = new FileReader();

		previewReader.onloadend = () => {
			// set image preview URL
			preview = previewReader.result;
		};

		previewReader.readAsDataURL(imageFile);
	}

	async function createDraft() {
		// call server to create the blog,
		// the default value of published is always false.
		// So if we need to publish the blog, then we need to manually
		// publish in different route.
		const id = await handleBlogCreate({
			title,
			summary,
			content,
			onLoadingStart: () => (createLoading = true),
			onLoadingEnd: () => (createLoading = false),
			onError: (err: string) => (errorMessage = err)
		});

		// for now just redirect to manage blog when creating only a draft
		// in the future, it is a good way to handle successful with
		// displaying a success message.
		if (id) return (window.location.href = '/blog/manage');
	}
</script>

<main class="mb-32 px-4 py-8 lg:px-24">
	<div>
		<h1 class="text-2xl font-bold">Create Blog</h1>
		<p>Begin your own story and let the world know.</p>
	</div>

	<section class="flex flex-col gap-8 lg:flex-row">
		<div class="flex flex-col gap-4 lg:w-[80%]">
			<div class="divider mt-2" />

			<div>
				<!-- DRAG DROP IMAGE -->
				<div class="flex w-full items-center justify-between">
					<div class="mx-1 my-2">
						<h2 class="font-semibold">Blog Image Cover</h2>
						<p class="text-sm">
							The image acts as a thumbnail, therefore make it as interesting as possible.
						</p>
					</div>

					<!-- DELETE / REVERT IMAGE -->
					{#if preview}
						<button
							on:click={() => {
								imageFile = null;
								preview = null;
							}}
							title="Discard Image"
							class="btn-sm btn-circle btn"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/></svg
							>
						</button>
					{/if}
				</div>

				<!-- IMAGE PREVIEW -->
				{#if preview}
					<div>
						<img
							class="max-h-[500px] w-full rounded-lg object-cover"
							src={preview.toString()}
							alt="preview"
						/>
					</div>
				{:else}
					<!-- IMAGE FILE DROPZONE -->
					<ImageDropzone onDropSuccess={(file) => (imageFile = file)} />
				{/if}
			</div>

			<!-- TITLE INPUT -->
			<div class="form-control w-full">
				<div class="mx-1 my-2">
					<h2 class="font-semibold">Blog Title*</h2>
				</div>
				<input
					bind:value={title}
					id="title-input"
					type="text"
					placeholder="e.g The Programmer Story: Hello World"
					class="input-bordered input w-full"
					maxlength={100}
				/>
				<label class="label" for="title-input">
					<span class="label-text-alt">{title.length}/100</span>
				</label>
			</div>

			<!-- SUMMARY INPUT -->
			<div class="form-control w-full">
				<div class="mx-1 my-2">
					<h2 class="font-semibold">Blog Summary</h2>
					<p class="text-sm">Blog summary is used for short introduction into your blog.</p>
				</div>
				<textarea
					bind:value={summary}
					class="textarea-bordered textarea"
					placeholder="e.g The Programmer Story: Hello World follows Alex, a skilled programmer, on a transformative journey. Alex creates an AI program named Hello World that simulates human emotions. As the program evolves, Alex realizes its immense potential..."
					maxlength={300}
				/>
				<label class="label" for="title-input">
					<span class="label-text-alt">{summary.length}/300</span>
				</label>
			</div>

			<div>
				<div class="mx-1 my-2">
					<h2 class="font-semibold">Blog Content</h2>
				</div>

				<!-- CONTENT EDITOR COMPONENT -->
				<!-- LAZY LOAD TO SPEED UP TTI AND MINIMIZE CODE SIZE (reduce almost 50% size) -->
				{#await import('../others/ContentEditor.svelte')}
					<div
						transition:fade
						class="min-h-[300px] bg-base-300 rounded-lg flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 animate-bounce"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>
						<p class="animate-pulse">Initializing Editor...</p>
					</div>
				{:then Module}
					<div transition:fade>
						<Module.default handleContentChange={(e) => (content = e.detail.value)} {content} />
					</div>
				{/await}
			</div>
		</div>

		<!-- RIGHT SIDE OF THE LAYOUT -->
		<div class="lg:w-[20%]">
			<!-- IF TITLE IS PRESENT, SHOW SUBMIT COMPONENT -->
			{#if title}
				<div
					transition:fade
					class="flex w-full flex-col items-center justify-center rounded-lg bg-base-300 py-4"
				>
					<h2 class="font-semibold">Ready to Submit?</h2>
					<p class="text-center text-sm">
						Don't worry, you can choose to create it as draft or immediately publish the blog.
					</p>

					<div class="my-4 flex w-full flex-col gap-2 px-4">
						<div>
							<label
								for="create-as-draft-modal"
								class="btn-sm btn w-full gap-2 rounded-full text-sm font-normal normal-case"
							>
								Create as <span class="font-semibold text-red-300">Draft</span>
							</label>

							<!-- CONFIRMATION MODAL FOR DRAFT -->
							<ConfirmationModal
								id="create-as-draft-modal"
								title="Create Blog as Draft?"
								desc="Drafting a blog post will securely store it within your account without immediate publication. This allows for subsequent editing according to your preferences."
								error={errorMessage}
								loading={createLoading}
								on:click={createDraft}
							/>
						</div>

						<div>
							<label
								for="create-as-published-modal"
								class="btn-sm btn w-full gap-2 rounded-full text-sm font-normal normal-case"
							>
								Create as <span class="font-semibold text-amber-300">Published</span>
							</label>

							<!-- CONFIRMATION MODAL FOR PUBLISHED -->
							<ConfirmationModal
								id="create-as-published-modal"
								title="Create Blog as Published?"
								desc="Create a blog post as published will both store it within your account and make it immediately accessible to the public. This grants all users the ability to access your published blogs."
								error={errorMessage}
								loading={createLoading}
							/>
						</div>
					</div>
				</div>
			{:else}
				<!-- OTHERWISE SHOW A MESSAGE  -->
				<div
					transition:fade
					class="flex w-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-red-500 py-16"
				>
					<p class="px-2 text-center text-sm font-bold">
						Please complete the required (*) field before creating a blog.
					</p>
				</div>
			{/if}
		</div>
	</section>
</main>
