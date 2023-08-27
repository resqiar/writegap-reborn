import { PUBLIC_SERVER_URL } from '$env/static/public';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../types/UserProfile';
import type { ISafeUser } from '../../types/UserProfile';
import type { ISafeBlogAuthor } from '../../types/Blog';

export async function load({ fetch, params }: ServerLoadEvent) {
	let username = params.username;
	let userProfile: UserProfile | null = null;
	let blogs: ISafeBlogAuthor[] | null = null;

	try {
		const [userReq, profileReq, blogReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/user/profile/${username}`),
			fetch(`${PUBLIC_SERVER_URL}/blog/get/${username}`)
		])

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect to 404 page
		if (profileReq.status === 'rejected' || !profileReq.value.ok) throw Error();

		if (userReq.status === 'fulfilled' && userReq.value.ok) {
			const res = await userReq.value.json();
			userProfile = res.result;
		}

		if (blogReq.status === 'fulfilled' && blogReq.value.ok) {
			const res = await blogReq.value.json();
			blogs = res.result;
		}

		const { result } = await profileReq.value.json();

		return {
			user: userProfile,
			profile: result as ISafeUser,
			blogs: blogs,
		};
	} catch (err) {
		throw error(404);
	}
}
