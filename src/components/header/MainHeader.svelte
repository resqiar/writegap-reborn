<script lang="ts">
	import { UserProfileStore } from '../../stores/UserStore';
	import type UserProfile from '../../types/UserProfile';

	import Logo from '../brand/Logo.svelte';

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
	// user data coming from the store.
	// if user is logged-in value would be type of @UserProfile, otherwise null;
	let user: UserProfile | null = null;

	UserProfileStore.subscribe((value) => (user = value));
</script>

<div class="navbar bg-base-100 px-16 py-4">
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
		</ul>
	</div>

	<!-- End -->
	<div class="navbar-end flex items-center gap-2">
		{#if user}
			<!-- ONLY SHOW WHEN USER LOGGED-IN -->
			<div class="dropdown-bottom dropdown-end dropdown">
				<label tabindex="-1" class="btn-ghost btn-square btn" for="menu-dropdown">
					<!-- AVATAR -->
					<div class="placeholder avatar">
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
				<ul
					id="menu-dropdown"
					tabindex="-1"
					class="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow-2xl"
				>
					<li>
						<a href="/blog/manage">
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
									d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
								/>
							</svg>
							My Blog</a
						>
					</li>
					<li>
						<a href="/profile">
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
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							Profile</a
						>
					</li>
					<li>
						<a href="/auth">
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
									d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								/>
							</svg>
							Switch Account</a
						>
					</li>
				</ul>
			</div>
		{:else}
			<!-- OTHERWISE, SHOW LOGIN LINK -->
			<a href="/auth" class="m-0 mx-2 rounded p-0">
				<p class="px-2 py-2 hover:underline">Login</p>
			</a>
		{/if}

		<!-- GITHUB BUTTON -->
		<a
			href="https://github.com/resqiar"
			target="_blank"
			aria-label="Author's GitHub"
			title="Author's GitHub"
			class="btn-ghost btn-square btn"
			rel="noreferrer"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
				/>
			</svg>
		</a>
	</div>
</div>
