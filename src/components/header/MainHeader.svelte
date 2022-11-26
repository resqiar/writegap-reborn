<script lang="ts">
	import Logo from '../brand/Logo.svelte';

	export let active: number = 0;
	const page = ['Dashboard', 'Blog', 'Playground'];
	const activeClass = 'border-b-2 border-solid border-brand-light';
</script>

<div class="navbar bg-base-100 py-4 px-16">
	<div class="navbar-start">
		<a href="/"><Logo /></a>
	</div>
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal p-0 text-[14px] font-semibold">
			{#each page as p, idx}
				<li>
					<a href={'/' + p.toLowerCase()} class="m-0 mx-2 rounded p-0">
						<p class="px-2 py-2 {active === idx ? activeClass : ''}">{p}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
