import { PUBLIC_IK_END, PUBLIC_IK_KEY, PUBLIC_SERVER_URL, PUBLIC_IK_MODE } from '$env/static/public';
import ImageKit from 'imagekit-javascript';
import type { ICreateBlogInput } from '../types/CreateBlogInput';

export async function handleBlogCreate(input: ICreateBlogInput): Promise<string | undefined> {
	if (!input.title) return;

	// reference for cover URL / image URL
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

		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: input.title,
				summary: input.summary,
				content: input.content,
				coverURL: imageURL ? imageURL : null,
				prev: input.prev ? input.prev : " ",
				next: input.next ? input.next : " ",
			})
		});

		const res = await req.json();

		// if res contains error obj
		if (res.error) {
			// end loading
			input.onLoadingEnd();

			// call onError with given error message
			input.onError(res.error);
		}

		input.onLoadingEnd();

		// return ID of the created blog
		return res.result.ID;
	} catch (error: any) {
		input.onLoadingEnd();
		input.onError('Something went wrong, please try again later!');
	}
}
