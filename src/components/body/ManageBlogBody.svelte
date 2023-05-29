<script lang="ts">
	let tabIndex: number = 0;
</script>

<main class="py-8 lg:px-20">
	<div class="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
		<!-- BLOGS TITLE & SUBTITLE -->
		<div class="mx-4">
			<h1 class="text-2xl font-bold">Manage Your Blogs</h1>
			<p>Keep track of which blogs are online and which are offline.</p>
		</div>

		<!-- CREATE BLOG BUTTON/LINK -->
		<a
			href="/blog/create"
			class="flex items-center justify-center gap-2 px-4 normal-case hover:underline"
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
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
				/>
			</svg>
			Create Blog
		</a>
	</div>

	<!-- TABS -->
	<div class="tabs mx-4 mt-4">
		<button
			on:click={() => (tabIndex = 0)}
			class={`tab tab-lifted ${
				tabIndex === 0 ? 'tab-active !bg-base-200 font-semibold' : 'font-medium'
			}`}>Published</button
		>
		<button
			on:click={() => (tabIndex = 1)}
			class={`tab tab-lifted ${
				tabIndex === 1 ? 'tab-active !bg-base-200 font-semibold' : 'font-medium'
			}`}>Drafted</button
		>
	</div>

	<!-- TABS COMPONENTS -->
	<div class="mx-2 rounded-xl bg-base-200 lg:mx-0">
		<!-- DYNAMIC COMPONENTS BASED ON TAB INDEX -->
		<div class="flex h-[400px] w-full flex-col items-center justify-center gap-2 lg:flex-row">
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
					d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
				/>
			</svg>
			<div class="flex flex-col items-center gap-1 lg:flex-row">
				<p>You dont have any published blogs yet.</p>
				<a href="/blog/create" class="text-primary hover:underline">Create?</a>
			</div>
		</div>
	</div>
</main>
