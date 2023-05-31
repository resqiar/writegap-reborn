<script lang="ts">
	import { fade } from 'svelte/transition';
	import ImageDropzone from '../others/ImageDropzone.svelte';

	let imageFile: File | null = null;
	let preview: string | ArrayBuffer | null = null;

	$: if (imageFile) {
		const previewReader: FileReader = new FileReader();

		previewReader.onloadend = () => {
			// set image preview URL
			preview = previewReader.result;
		};

		previewReader.readAsDataURL(imageFile);
	}

	let content: string = '';
</script>

<main class="mb-32 px-4 py-8 lg:px-24">
	<div>
		<h1 class="text-2xl font-bold">Create Blog</h1>
		<p>Begin your own story and let the world know.</p>
	</div>

	<div class="flex flex-col gap-4 lg:max-w-4xl">
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
				<h2 class="font-semibold">Blog Title</h2>
			</div>
			<input
				id="title-input"
				type="text"
				placeholder="e.g The Programmer Story: Hello World"
				class="input-bordered input w-full"
			/>
			<label class="label" for="title-input">
				<span class="label-text-alt">0/70</span>
			</label>
		</div>

		<!-- SUMMARY INPUT -->
		<div class="form-control w-full">
			<div class="mx-1 my-2">
				<h2 class="font-semibold">Blog Summary</h2>
				<p class="text-sm">Blog summary is used for short introduction into your blog.</p>
			</div>
			<textarea
				class="textarea-bordered textarea"
				placeholder="e.g The Programmer Story: Hello World follows Alex, a skilled programmer, on a transformative journey. Alex creates an AI program named Hello World that simulates human emotions. As the program evolves, Alex realizes its immense potential..."
			/>
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
</main>
