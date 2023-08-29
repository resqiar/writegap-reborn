import { PUBLIC_IK_END, PUBLIC_IK_KEY, PUBLIC_SERVER_URL, PUBLIC_IK_MODE } from '$env/static/public';
import ImageKit from 'imagekit-javascript';

interface IUpdateUserInput {
	username: string;
	fullname: string;
	bio: string;
	defaultUsername: string;
	defaultFullname: string;
	defaultBio: string;

	websiteURL: string;
	githubURL: string;
	linkedinURL: string;
	twitterURL: string;
	youtubeURL: string;
	image: File | null;

	onError: (message: string) => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}

export async function handleUserUpdate(input: IUpdateUserInput): Promise<void> {
	// reference for image URL
	let imageURL: string | null = null;

	// call "start loading" callback. This-
	// makes parent component show loading state
	input.onLoadingStart();

	try {
		if (input.image) {
			// Initialize ImageKit libs.
			// it requires a public key of ImageKit,
			// url of account, and server endpoint for signature.
			const imagekit = new ImageKit({
				publicKey: PUBLIC_IK_KEY,
				urlEndpoint: PUBLIC_IK_END,
				authenticationEndpoint: `${PUBLIC_SERVER_URL}/auth/ik`
			});

			// Start uploading to imagekit
			const result = await imagekit.upload({
				file: input.image,
				fileName: input.image.name,
				folder: PUBLIC_IK_MODE === 'prod' ? 'live' : 'local'
			});

			// Bind result to previous reference.
			imageURL = result.url;
		}

		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile/update`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Username: input.username === input.defaultUsername ? '' : input.username,
				Fullname: input.fullname === input.defaultFullname ? '' : input.fullname,
				Bio: input.bio === input.defaultBio ? '' : input.bio,
				PictureURL: imageURL ? imageURL : '',
				WebsiteURL: input.websiteURL ? input.websiteURL.trim() : ' ',
				GithubURL: input.githubURL ? input.githubURL.trim() : ' ',
				LinkedinURL: input.linkedinURL ? input.linkedinURL.trim() : ' ',
				TwitterURL: input.twitterURL ? input.twitterURL.trim() : ' ',
				YoutubeURL: input.youtubeURL ? input.youtubeURL.trim() : ' '
			})
		});

		if (!req.ok) {
			const res = await req.json();
			input.onError(res.error);
			return input.onLoadingEnd();
		}

		input.onLoadingEnd();

		// if the changes include a new username,
		// that means we need to redirect the user to a new URL.
		if (input.username !== input.defaultUsername) {
			return window.location.replace(`${window.location.origin}/${input.username}`);
		}

		// otherwise, just reload -
		// ik it is bad UX, but im too lazy to complicate things rn.
		window.location.reload();
	} catch (err) {
		input.onLoadingEnd();
		input.onError(err as string);
	}
}
