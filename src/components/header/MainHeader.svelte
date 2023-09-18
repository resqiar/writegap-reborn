<script lang="ts">
	import type UserProfile from '../../types/UserProfile';

	import Logo from '../brand/Logo.svelte';
	import MainMenu from '../menu/MainMenu.svelte';
	import MobileNavigation from '../menu/MobileNavigation.svelte';
	import ThemeChangeMenu from '../menu/ThemeChangeMenu.svelte';

	export let active: number = 0;
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
	const activeClass = 'border-b-2 border-solid border-brand-light';

	// user data coming from the parent component.
	// if user is logged-in value would be type of @UserProfile, otherwise null;
	export let user: UserProfile | null = null;
</script>

<div class="navbar bg-base-100 px-4 py-4 lg:px-16">
	<!-- Start -->
	<div class="navbar-start">
		<a href="/"><Logo /></a>
	</div>

	<!-- Center -->
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0 text-[14px] font-semibold">
			{#each page as p, idx}
				<li>
					<a href={p.href} class="m-0 mx-2 rounded p-0">
						<p class="px-2 py-2 {active === idx ? activeClass : ''}">{p.name}</p>
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
		<!-- DONATE BUTTON -->
		<a href="https://ko-fi.com/resqiar" class="flex items-center normal-case hover:underline">
			<span class="hidden lg:flex">
				<svg
					class="h-4 w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
					/>
				</svg>
			</span>
			<p class="px-2 py-2">Donate</p>
		</a>

		{#if user}
			<!-- ONLY SHOW WHEN USER LOGGED-IN -->
			<div class="dropdown-end dropdown-bottom dropdown">
				<label tabindex="-1" class="btn btn-square btn-ghost" for="menu-dropdown">
					<!-- AVATAR -->
					<div class="avatar placeholder">
						<div class="w-8 rounded-full bg-neutral-focus text-neutral-content">
							{#if user.PictureURL}
								<!-- SHOW IMAGE IF AVAILABLE -->
								<img src={user.PictureURL} alt={user.Username[0]} referrerpolicy="no-referrer" />
							{:else}
								<!-- OTHERWISE, USER FIRST USERNAME LETTER AS PLACEHOLDER -->
								<span class="text-sm">{user.Username[0]}</span>
							{/if}
						</div>
					</div>
				</label>

				<!-- MENU  -->
				<MainMenu username={user.Username} />
			</div>
		{:else}
			<!-- OTHERWISE, SHOW LOGIN LINK -->
			<a href="/auth" class="m-0 mx-2 rounded p-0">
				<p class="px-2 py-2 hover:underline">Login</p>
			</a>
		{/if}

		<!-- THEME CHANGE MENU -->
		<ThemeChangeMenu />

		<!-- MOBILE NAVIGATION -->
		<MobileNavigation />
	</div>
</div>
