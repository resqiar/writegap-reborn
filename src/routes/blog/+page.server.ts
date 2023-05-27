import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/list`);

		const res = await req.json();

		return {
			blogs: res.result
		};
	} catch (error) {
		return {
			blogs: null,
			error: true
		};
	}
}
