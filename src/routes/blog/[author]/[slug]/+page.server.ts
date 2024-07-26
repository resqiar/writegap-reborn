import { SERVER_URL } from '$env/static/private';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../../types/UserProfile';

export async function load({ fetch, cookies, params }: ServerLoadEvent) {
	let author = params.author;
	let slug = params.slug;
	let userProfile: UserProfile | null = null;

	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null.
	// This way we can save bandwith for the server.
	if (!session_id) {
		try {
			const blogReq = await fetch(`${SERVER_URL}/blog/get/${author}/${slug}`);

			// if request status is not 200 (OK)
			// throw error, the catched error then redirect to 404 page
			if (!blogReq.ok) throw Error();
			const res = await blogReq.json();

			return {
				user: userProfile,
				blog: res.result
			};
		} catch (err) {
			throw error(404);
		}
	} else {
		try {
			const [userReq, blogReq] = await Promise.allSettled([
				fetch(`${SERVER_URL}/user/profile`),
				fetch(`${SERVER_URL}/blog/get/${author}/${slug}`)
			]);

			// if request status is not 200 (OK)
			// throw error, the catched error then redirect to 404 page
			if (blogReq.status === 'rejected' || !blogReq.value.ok) throw Error();
			const res = await blogReq.value.json();

			if (userReq.status === 'fulfilled' && userReq.value.ok) {
				const res = await userReq.value.json();
				userProfile = res.result;
			}

			return {
				user: userProfile,
				blog: res.result
			};
		} catch (err) {
			throw error(404);
		}
	}
}
