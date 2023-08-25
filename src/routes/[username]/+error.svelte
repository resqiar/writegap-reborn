<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MetaHead from '../../components/meta/MetaHead.svelte';

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Page Not Found | Resqiar.com" />

<main>
	<div class="hero min-h-screen">
		<div class="hero-content text-center">
			<div>
				<div class="my-2 flex w-full justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-20 w-20"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
						/>
					</svg>
				</div>
				<h1 class="text-4xl font-bold">404 Not Found</h1>
				<p class="mt-2 text-center">
					Oops! Looks like you've stumbled upon a missing page. Are you absolutely sure this is the
					right spot? Double-checking never hurts!
				</p>

				<div class="mt-4 flex justify-center">
					<a href="/" class="flex items-center gap-1 underline">
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
								d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
							/>
						</svg>
						Go back to homepage</a
					>
				</div>
			</div>
		</div>
	</div>
</main>
