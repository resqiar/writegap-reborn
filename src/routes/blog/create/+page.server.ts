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
		const userReq = await fetch(`${PUBLIC_SERVER_URL}/user/profile`);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (!userReq.ok) throw Error();

		const res = await userReq.json();
		const userProfile: UserProfile = res.result;

		return {
			user: userProfile,
		};
	} catch (error) {
		throw redirect(307, '/auth');
	}
}
