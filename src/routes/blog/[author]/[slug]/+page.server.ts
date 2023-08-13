import { SERVER_URL } from '$env/static/private';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../../types/UserProfile';
import parseMD from '../../../../libs/ParseMarkdown';

export async function load({ fetch, params }: ServerLoadEvent) {
	let author = params.author;
	let slug = params.slug;

	let userProfile: UserProfile | null = null;

	try {
		const startReqTime = performance.now();
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
		const endReqTime = performance.now();

		console.log("REQUEST TAKEN", endReqTime - startReqTime);

		// Compile the Markdown content and bind the compiled
		// back into the result content.
		const startParseTime = performance.now();
		result.Content = await parseMD(result.Content);
		const endParseTime = performance.now();

		console.log("PARSE TAKEN", endParseTime - startParseTime);

		return {
			user: userProfile,
			blog: result
		};
	} catch (err) {
		throw error(404);
	}
}
