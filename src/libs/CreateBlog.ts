import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ICreateBlogInput } from '../types/CreateBlogInput';

export async function handleBlogCreate(input: ICreateBlogInput): Promise<string | undefined> {
	if (!input.title) return;

	// call start loading callback. This-
	// makes parent component show loading state
	input.onLoadingStart();

	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: input.title,
				summary: input.summary,
				content: input.content
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
