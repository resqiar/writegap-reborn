<script lang="ts">
	// @ts-nocheck
	import Id from 'svelte-flag-icons/Id.svelte';
	import Jp from 'svelte-flag-icons/Jp.svelte';
	import Sa from 'svelte-flag-icons/Sa.svelte';

	export let blogAuthor: string;
	export let blogSlug: string;
	const URL: string = `https://www-resqiar-com.translate.goog/blog/${blogAuthor}/${blogSlug}?_x_tr_sl=en&_x_tr_tl=`;
</script>

<div class="dropdown-end dropdown">
	<label tabindex="-1" class="btn btn-circle btn-ghost btn-sm lg:btn-md" for="translate-menu">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-4 w-4 lg:h-6 lg:w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
			/>
		</svg>
	</label>

	<ul
		id="translate-menu"
		tabindex="-1"
		class="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow-2xl"
	>
		<!-- INDONESIAN / BAHASA -->
		<li>
			<a
				href={URL + 'id'}
				target="_blank"
				referrerpolicy="no-referrer"
				class="flex items-center gap-2"
			>
				<Id size="25" />
				Read in Bahasa</a
			>
		</li>

		<!-- JAPANESE -->
		<li>
			<a
				href={URL + 'ja'}
				target="_blank"
				referrerpolicy="no-referrer"
				class="flex items-center gap-2"
			>
				<Jp size="25" />
				Read in Japanese</a
			>
		</li>

		<!-- ARABIC -->
		<li>
			<a
				href={URL + 'ar'}
				target="_blank"
				referrerpolicy="no-referrer"
				class="flex items-center gap-2"
			>
				<Sa size="25" />
				Read in Arabic</a
			>
		</li>

		<li>
			<a
				href={URL + 'zh-TW'}
				target="_blank"
				referrerpolicy="no-referrer"
				class="flex items-center gap-2"
			>
				Other Languages...</a
			>
		</li>
	</ul>
</div>
