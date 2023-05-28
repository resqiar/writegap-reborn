import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../types/UserProfile';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile`);

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
