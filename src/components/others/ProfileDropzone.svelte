<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';

	export let customClass: string = '';
	export let preview: string = '';

	let onDragHover: boolean = false;
	let fileError: boolean = false;

	export let onDropSuccess: (file: File) => void;

	function handleFilesSelect(e: any) {
		fileError = false;

		// get accept image files from the event
		const { acceptedFiles } = e.detail;
		if (acceptedFiles.length) {
			// call parent callback with the successful file as
			// a parameter
			return onDropSuccess(acceptedFiles[0]);
		}

		fileError = true;
	}
</script>

<div class="flex flex-col items-center">
	<Dropzone
		inputElement={null}
		on:drop={handleFilesSelect}
		on:dragenter={() => (onDragHover = true)}
		on:filedropped={() => (onDragHover = false)}
		on:dragleave={() => (onDragHover = false)}
		disableDefaultStyles={true}
		multiple={false}
		accept={['image/jpg', 'image/jpeg', 'image/png']}
		containerClasses={`${
			onDragHover ? 'border-2 border-amber-500 border-dashed' : ''
		} ${customClass} flex items-center justify-center`}
	>
		{#if preview}
			<img
				src={preview}
				alt="Profile Preview"
				class="h-[100px] w-[100px] rounded-full object-cover"
			/>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
				/>
			</svg>
		{/if}
	</Dropzone>

	{#if fileError}
		<p class="text-sm text-red-500">Only png, jpg or jpeg formats are accepted</p>
	{/if}
</div>
