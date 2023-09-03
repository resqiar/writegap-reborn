import { SERVER_URL } from '$env/static/private';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

export async function load({ fetch, params }: ServerLoadEvent) {
	let author = params.author;
	let slug = params.slug;

	try {
		const blogReq = await fetch(`${SERVER_URL}/blog/get/${author}/${slug}`)

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect to 404 page
		if (!blogReq.ok) throw Error();

		const res = await blogReq.json();

		return {
			blog: res.result
		};
	} catch (err) {
		throw error(404);
	}
}
