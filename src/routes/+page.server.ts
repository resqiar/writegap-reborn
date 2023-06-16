import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../types/UserProfile';

export async function load({ fetch, cookies }: ServerLoadEvent) {
	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null.
	// This way we can save bandwith for the server.
	if (!session_id) return { user: null };

	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile`, { credentials: 'include' });

		console.log(PUBLIC_SERVER_URL);
		console.log(req.status);
		console.log(req);

		// if request status is not 200 (OK)
		// return user as null
		if (!req.ok)
			return {
				user: null
			};

		const res = await req.json();
		const userProfile: UserProfile = res.result;

		return {
			user: userProfile
		};
	} catch (error) {
		return {
			user: null
		};
	}
}
