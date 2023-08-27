<script lang="ts">
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import debounce from '../../libs/Debounce';
	import type { ISafeUser } from '../../types/UserProfile';
	import { handleUserUpdate } from '../../libs/UpdateUser';
	import ProfileDropzone from '../others/ProfileDropzone.svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
	import LinkedInIcon from '../icons/LinkedInIcon.svelte';
	import TwitterIcon from '../icons/TwitterIcon.svelte';
	import YoutubeIcon from '../icons/YoutubeIcon.svelte';
	import LinkIcon from '../icons/LinkIcon.svelte';

	export let currentUser: ISafeUser;
	let status: boolean = false;
	let loading: boolean = false;
	let error: string | null = null;

	let username: string = currentUser.Username;
	let fullname: string = currentUser.Fullname;
	let bio: string = currentUser.Bio;
	let websiteURL: string = currentUser.WebsiteURL;
	let githubURL: string = currentUser.GithubURL;
	let linkedinURL: string = currentUser.LinkedinURL;
	let twitterURL: string = currentUser.TwitterURL;
	let youtubeURL: string = currentUser.YoutubeURL;

	let usernameError: string = '';

	let imageFile: File | null = null;
	let preview: string | ArrayBuffer | null = currentUser.PictureURL;

	async function checkUsername() {
		usernameError = '';

		if (username === currentUser.Username) return;
		if (username.trim().length < 3)
			return (usernameError = 'Username must be at least 3 characters');
		if (/[^a-z0-9_]/i.test(username)) {
			// if input includes non alphanumeric or _ (underscore)
			return (usernameError = 'New username must contains only alphanumeric & underscore');
		}

		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/user/check/${username}`, {
				credentials: 'include'
			});
			const { result } = await req.json();

			if (result) usernameError = 'Username already exist';
		} catch (error) {
			console.log(error);
		}
	}

	async function update() {
		if (usernameError) return;

		await handleUserUpdate({
			username: username,
			fullname: fullname,
			bio: bio,
			defaultUsername: currentUser.Username,
			defaultFullname: currentUser.Fullname,
			defaultBio: currentUser.Bio,

			websiteURL: websiteURL,
			githubURL: githubURL,
			linkedinURL: linkedinURL,
			twitterURL: twitterURL,
			youtubeURL: youtubeURL,
			image: imageFile,
			onLoadingStart: () => (loading = true),
			onLoadingEnd: () => (loading = false),
			onError: (message: string) => (error = message)
		});
	}

	$: if (imageFile) {
		const previewReader: FileReader = new FileReader();
		previewReader.onloadend = () => (preview = previewReader.result);
		previewReader.readAsDataURL(imageFile);
	}
	$: if (username) debounce(checkUsername, 500);
</script>

<button class="flex items-center gap-2 text-sm underline" on:click={() => (status = true)}>
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
			d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
		/>
	</svg>

	Edit Profile</button
>

<input type="checkbox" id="confirm-modal" class="modal-toggle" />
<div class:modal-open={status} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box !rounded-b-none md:!rounded-b-xl">
		<h3 class="text-lg font-bold">Edit Profile</h3>

		<!-- PROFILE PICTURE -->
		<div class="flex w-full justify-center pt-6">
			<div class="flex flex-col gap-2">
				<ProfileDropzone
					customClass="h-[100px] w-[100px] bg-base-200 rounded-full"
					preview={preview ? preview.toString() : ''}
					onDropSuccess={(file) => (imageFile = file)}
				/>

				{#if imageFile}
					<!-- RESET BUTTON -->
					<!-- ONLY SHOW WHEN IMAGEFILE EXIST -->
					<button
						class="text-sm underline"
						on:click={() => {
							imageFile = null;
							preview = currentUser.PictureURL;
						}}>Reset</button
					>
				{/if}
			</div>
		</div>

		<div class="pb-6">
			<!-- USERNAME -->
			<div class="form-control w-full">
				<label class="label" for="username">
					<span class="label-text">Username*</span>
				</label>
				<input
					bind:value={username}
					id="username"
					type="text"
					maxlength={100}
					class={`input input-bordered w-full ${usernameError ? 'input-error' : ''}`}
				/>

				{#if usernameError}
					<label class="label" for="fullname">
						<span class="label-text-alt">{usernameError}</span>
					</label>
				{/if}
			</div>

			<!-- FULLNAME -->
			<div class="form-control w-full">
				<label class="label" for="fullname">
					<span class="label-text">Fullname</span>
				</label>
				<input
					bind:value={fullname}
					id="fullname"
					type="text"
					maxlength={100}
					class="input input-bordered w-full"
				/>
			</div>

			<!-- BIO -->
			<div class="form-control w-full">
				<label class="label" for="bio">
					<span class="label-text">Bio</span>
				</label>
				<textarea bind:value={bio} id="bio" class="textarea textarea-bordered" maxlength={300} />
			</div>

			<!-- SOCIAL MEDIA -->
			<div
				title="Website"
				class="form-control mt-6 flex w-full flex-row items-center gap-2 bg-base-200 pl-2"
			>
				<LinkIcon />
				<input
					bind:value={websiteURL}
					id="github"
					type="text"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- GITHUB -->
			<div
				title="GitHub"
				class="form-control mt-6 flex w-full flex-row items-center gap-2 bg-base-200 pl-2"
			>
				<GithubIcon />
				<input bind:value={githubURL} id="github" type="text" class="input input-bordered w-full" />
			</div>

			<!-- LINKEDIN -->
			<div
				title="LinkedIn"
				class="form-control mt-6 flex w-full flex-row items-center gap-2 bg-base-200 pl-2"
			>
				<LinkedInIcon />
				<input
					bind:value={linkedinURL}
					id="linkedin"
					type="text"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- TWITTER -->
			<div
				title="Twitter"
				class="form-control mt-6 flex w-full flex-row items-center gap-2 bg-base-200 pl-2"
			>
				<TwitterIcon />
				<input
					bind:value={twitterURL}
					id="twitter"
					type="text"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- YOUTUBE -->
			<div
				title="YouTube"
				class="form-control mt-6 flex w-full flex-row items-center gap-2 bg-base-200 pl-2"
			>
				<YoutubeIcon />
				<input
					bind:value={youtubeURL}
					id="youtube"
					type="text"
					class="input input-bordered w-full"
				/>
			</div>
		</div>

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
			<button on:click={() => (status = false)} class="btn btn-ghost">Wait, cancel!</button>
			<button on:click={update} class="btn btn-primary {loading ? 'loading' : ''}">Submit</button>
		</div>
	</div>
</div>
