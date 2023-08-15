import { SERVER_URL } from '$env/static/private';
import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../../types/UserProfile';

export async function load({ fetch, params, cookies }: ServerLoadEvent) {
	// Get session_id from cookies
	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null, do not proceed further.
	// This way we can save bandwith for the server.
	if (!session_id) throw redirect(307, '/auth');

	let blogID = params.slug;

	try {
		const [userReq, blogReq] = await Promise.allSettled([
			fetch(`${SERVER_URL}/user/profile`),
			fetch(`${SERVER_URL}/blog/get/preview`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: blogID
				}),
				credentials: 'include'
			})
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (userReq.status === 'rejected' || !userReq.value.ok) throw Error('201');

		const res = await userReq.value.json();
		const userProfile: UserProfile = res.result;

		if (blogReq.status === 'rejected' || !blogReq.value.ok) throw Error('404');

		// Extract the result value from the fulfilled request
		const { result } = await blogReq.value.json();
		result.Author = userProfile;

		return {
			user: userProfile,
			blog: result
		};
	} catch (err: any) {
		if (err.message === '201') throw redirect(307, '/auth');
		throw error(err.message);
	}
}
