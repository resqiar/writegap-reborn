<script lang="ts">
	import { manageActionModal, type ManageAction } from '../../data/modalActionState';

	export let status: boolean = false;
	export let loading: boolean = false;
	export let error: string | null = null;
	export let actionState: ManageAction;
	export let handleOnCancel: () => void;
</script>

<!-- CONFIRMATION DIALOG -->
<input type="checkbox" id="confirm-modal" class="modal-toggle" />
<div class:modal-open={status} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box !rounded-b-none md:!rounded-b-xl">
		<h3 class="text-lg font-bold">
			{manageActionModal[actionState] ? manageActionModal[actionState].title : ''}
		</h3>
		<p class="py-4">
			{manageActionModal[actionState] ? manageActionModal[actionState].desc : ''}
		</p>
		{#if error}
			<div class="alert alert-error my-2 shadow-lg">
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
			<button on:click={handleOnCancel} class="btn-ghost btn">Wait, no!</button>
			<button on:click class="btn-primary btn {loading ? 'loading' : ''}">Alright!</button>
		</div>
	</div>
</div>
