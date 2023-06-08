import { PUBLIC_IK_END, PUBLIC_IK_KEY, PUBLIC_SERVER_URL } from '$env/static/public';
import ImageKit from 'imagekit-javascript';
import type { IUpdateBlogInput } from '../types/UpdateBlogInput';

export async function handleBlogUpdate(input: IUpdateBlogInput): Promise<boolean | undefined> {
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
				folder: import.meta.env.VITE_NODE_ENV === 'production' ? 'live' : 'local'
			});

			// Bind result to previous reference.
			imageURL = result.url;
		}

		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/update`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: input.blogID,
				title: input.title,
				summary: input.summary,
				content: input.content,
				coverURL: imageURL ? imageURL : null
			})
		});

		if (req.status !== 200) {
			// end loading
			input.onLoadingEnd();

			// call onError
			input.onError();

			// return false when failed
			return false;
		}

		input.onLoadingEnd();

		// return true when success
		return true;
	} catch (error: any) {
		input.onLoadingEnd();
		input.onError();

		// return false when error
		return false;
	}
}
