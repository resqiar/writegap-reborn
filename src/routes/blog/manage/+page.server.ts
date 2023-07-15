import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../types/UserProfile';

export async function load({ fetch, cookies }: ServerLoadEvent) {
	// Get session_id from cookies
	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null, do not proceed further.
	// This way we can save bandwith for the server.
	if (!session_id) throw redirect(307, '/auth');

	try {
		const [userReq, blogReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/blog/list/current`, {
				method: 'POST',
				credentials: 'include'
			})
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (userReq.status === 'rejected' || !userReq.value.ok) throw Error();

		const res = await userReq.value.json();
		const userProfile: UserProfile = res.result;

		if (blogReq.status === 'rejected')
			return {
				user: userProfile,
				blogs: [],
				error: true
			};

		// convert to JSON
		const { result } = await blogReq.value.json();

		return {
			user: userProfile,
			blogs: result
		};
	} catch (error) {
		throw redirect(307, '/auth');
	}
}
