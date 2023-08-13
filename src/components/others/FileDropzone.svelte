<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';

	export let title: string = '';
	export let subTitle: string = '';
	export let customClass: string = '';
	export let acceptFiles: string[] = [];

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

<Dropzone
	inputElement={null}
	on:drop={handleFilesSelect}
	on:dragenter={() => (onDragHover = true)}
	on:filedropped={() => (onDragHover = false)}
	on:dragleave={() => (onDragHover = false)}
	disableDefaultStyles={true}
	multiple={false}
	accept={acceptFiles}
	containerClasses={`${
		onDragHover ? 'border-2 border-amber-500 border-dashed' : ''
	} ${customClass}`}
>
	<p class="font-semibold">{title}</p>
	<p class="text-sm">{subTitle}</p>

	{#if fileError}
		<p class="text-sm text-red-500">
			Failed to accept the file, are you sure using the correct format?
		</p>
	{/if}
</Dropzone>
