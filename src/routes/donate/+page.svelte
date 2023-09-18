<script lang="ts">
	import Logo from '../../components/brand/Logo.svelte';
	import MobileNavigation from '../../components/menu/MobileNavigation.svelte';
	import ThemeChangeMenu from '../../components/menu/ThemeChangeMenu.svelte';
	import MetaHead from '../../components/meta/MetaHead.svelte';

	const page = [
		{
			name: 'Dashboard',
			href: '/'
		},
		{
			name: 'Blog',
			href: '/blog'
		},
		{
			name: 'Playground',
			href: '/playground'
		}
	];
</script>

<!-- META TAG -->
<MetaHead
	title="Donate to Platform | Resqiar.com"
	description="I work on this page during my free time. If you appreciate it and would like to support my
		efforts, you have the option to support me here, Thanks!"
/>

<header class="navbar bg-base-100 px-4 py-4 lg:px-16">
	<!-- Start -->
	<div class="navbar-start">
		<a href="/"><Logo /></a>
	</div>
	<!-- Center -->
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0 text-[14px] font-semibold">
			{#each page as p}
				<li>
					<a href={p.href} class="m-0 mx-2 rounded p-0">
						<p class="px-2 py-2">{p.name}</p>
					</a>
				</li>
			{/each}

			<li>
				<a href="https://parser.resqiar.com" class="m-0 mx-2 rounded p-0">
					<p class="flex items-center gap-1 px-2 py-2">
						Parser
						<span class="badge badge-warning badge-sm text-xs">beta</span>
					</p>
				</a>
			</li>
		</ul>
	</div>

	<!-- End -->
	<div class="navbar-end flex items-center lg:gap-2">
		<!-- THEME CHANGE MENU -->
		<ThemeChangeMenu />

		<!-- MOBILE NAVIGATION -->
		<MobileNavigation />
	</div>
</header>

<main class="mx-2 my-6 gap-4 lg:mx-16 lg:my-16">
	<h1 class="text-2xl font-bold lg:text-5xl">🌠 Do you like the page?</h1>
	<p class="py-2 text-justify lg:text-start lg:text-lg">
		I work on this page during my free time. If you appreciate it and would like to support my
		efforts, you have the option to support me. <strong class="text-xl">However</strong>, if that's
		not something you're inclined to do, that's perfectly fine too. You're welcome to continue
		enjoying the page at no cost. Thank you!
	</p>

	<iframe
		id="kofiframe"
		src="https://ko-fi.com/resqiar/?hidefeed=true&widget=true&embed=true&preview=true"
		class="mt-6 w-full border-2 border-dashed border-amber-800"
		height="712"
		title="resqiar"
	/>
</main>
