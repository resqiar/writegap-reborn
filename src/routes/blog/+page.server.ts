import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../types/UserProfile';

export async function load({ fetch }: ServerLoadEvent) {
	let user: UserProfile | null = null;
	let blogs: any[] = [];
	let error: boolean = false;

	try {
		// Initiate fetch requests for 2 or more fetch requests concurrently,
		// that means the JS runtime will processes these simultaniously.
		const [userRes, blogRes] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/blog/list`)
		]);

		if (userRes.status === 'fulfilled') {
			const { result } = await userRes.value.json();
			user = result;
		}

		if (blogRes.status === 'fulfilled') {
			const { result } = await blogRes.value.json();
			blogs = result;
		} else {
			error = true;
		}
	} catch (error) {
		console.error(error);
	}

	return {
		user: user,
		blogs: blogs,
		error: error
	};
}
