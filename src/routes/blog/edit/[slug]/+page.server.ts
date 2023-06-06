import { PUBLIC_SERVER_URL } from '$env/static/public';
import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../../types/UserProfile';

export async function load({ fetch, params, cookies }: ServerLoadEvent) {
	let blogID = params.slug;

	// Get session_id from cookies
	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null, do not proceed further.
	// This way we can save bandwith for the server.
	if (!session_id) throw redirect(307, '/auth');

	try {
		const [userReq, blogReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/blog/get/my`, {
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
		// throw error, the catched error then redirect
		// user to auth page
		if (userReq.status === 'rejected' || !userReq.value.ok) throw Error('401');

		const res = await userReq.value.json();
		const userProfile: UserProfile = res.result;

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect to 404 page
		if (blogReq.status === 'rejected' || !blogReq.value.ok) throw Error('404');

		// Extract the result value from the fulfilled request
		const { result } = await blogReq.value.json();

		return {
			user: userProfile,
			blog: result
		};
	} catch (err: any) {
		const status = err.message;
		if (status === '401') throw redirect(307, '/auth');
		throw error(404, '404');
	}
}
