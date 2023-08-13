import { SERVER_URL } from '$env/static/private';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../../types/UserProfile';
// import parseMD from '../../../../libs/ParseMarkdown';

export async function load({ fetch, params }: ServerLoadEvent) {
	let author = params.author;
	let slug = params.slug;

	console.log(author, slug);

	let userProfile: UserProfile | null = null;

	try {
		const [userReq, blogReq] = await Promise.allSettled([
			fetch(`${SERVER_URL}/user/profile`),
			fetch(`${SERVER_URL}/blog/get/${author}/${slug}`)
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect to 404 page
		if (blogReq.status === 'rejected' || !blogReq.value.ok) throw Error();

		if (userReq.status === 'fulfilled' && userReq.value.ok) {
			const res = await userReq.value.json();
			userProfile = res.result;
		}

		// Extract the result value from the fulfilled request
		const { result } = await blogReq.value.json();

		// Compile the Markdown content and bind the compiled
		// back into the result content.
		// result.Content = await parseMD(result.Content);

		result.Content = "DUMMY RESULT";

		return {
			user: userProfile,
			blog: result
		};
	} catch (err) {
		throw error(404);
	}
}
