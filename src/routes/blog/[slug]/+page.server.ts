import { PUBLIC_SERVER_URL } from '$env/static/public';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../types/UserProfile';
import { parseMD } from '../../../libs/ParseMarkdown';

export async function load({ fetch, params }: ServerLoadEvent) {
	let blogID = params.slug;
	let userProfile: UserProfile | null = null;

	try {
		const [userReq, blogReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/blog/get`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: blogID
				})
			})
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect to 404 page
		if (blogReq.status === 'rejected' || !blogReq.value.ok) throw Error();

		console.log('BLOG', blogReq.status);
		console.log('BLOG', blogReq.value.status);

		if (userReq.status === 'fulfilled' && userReq.value.ok) {
			const res = await userReq.value.json();
			userProfile = res.result;
		}

		// Extract the result value from the fulfilled request
		const { result } = await blogReq.value.json();

		// Compile the Markdown content and bind the compiled
		// back into the result content.
		result.Content = await parseMD(result.Content);

		return {
			user: userProfile,
			blog: result
		};
	} catch (err) {
		throw error(404);
	}
}
