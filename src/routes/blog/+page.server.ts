import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { ISafeBlogAuthor } from '../../types/Blog';

export async function load({ fetch }: ServerLoadEvent) {
	let blogs: ISafeBlogAuthor[] = [];
	let error: boolean = false;

	try {
		const blogRes = await fetch(`${PUBLIC_SERVER_URL}/blog/list`)

		if (blogRes.ok) {
			const { result } = await blogRes.json();

			// if blog is null, set it to empty
			if (!result) {
				blogs = [];
			} else {
				blogs = result;
			}
		} else {
			error = true;
		}
	} catch (error) {
		console.error(error);
	}

	return {
		blogs: blogs,
		error: error
	};
}
