import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../../types/UserProfile';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const [userReq, admReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/auth/status/adm`, {
				method: 'POST'
			})
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (userReq.status === 'rejected' || !userReq.value.ok) throw Error();

		const res = await userReq.value.json();
		const userProfile: UserProfile = res.result;

		return {
			user: userProfile,
			// if adm request is fulfilled
			// and if the request made is ok meaning it
			// return 200, not 401, 404, 500
			// otherwise, the request of adm is rejected,
			// or the status is else of 200
			adm: admReq.status === 'fulfilled' && admReq.value.ok
		};
	} catch (error) {
		throw redirect(307, '/auth');
	}
}
