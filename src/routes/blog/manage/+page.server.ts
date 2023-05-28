import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../types/UserProfile';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile`);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (!req.ok) throw Error();

		const res = await req.json();
		const userProfile: UserProfile = res.result;

		return {
			user: userProfile
		};
	} catch (error) {
		throw redirect(307, '/auth?redirect=/blog/manage');
	}
}
