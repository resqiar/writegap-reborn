<script lang="ts">
	export let id: string;
	export let title: string = '';
	export let desc: string = '';
	export let error: string = '';
	export let loading: boolean = false;
	export let confirmButtonMessage: string = 'Create';
</script>

<input type="checkbox" {id} class="modal-toggle" />
<label for={id} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">
			{desc}
		</p>

		{#if error}
			<div class="alert alert-error shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 flex-shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{error}</span>
				</div>
			</div>
		{/if}

		<div class="modal-action">
			<label
				for={id}
				on:keydown={() => (error = '')}
				on:click={() => (error = '')}
				class="btn-ghost btn">Cancel</label
			>
			<button on:click class={`btn-ghost btn ${loading ? 'loading' : ''}`}
				>{confirmButtonMessage}</button
			>
		</div>
	</label>
</label>
