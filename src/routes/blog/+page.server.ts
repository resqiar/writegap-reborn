import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type UserProfile from '../../types/UserProfile';
import type { ISafeBlog } from '../../types/Blog';

export async function load({ fetch, cookies }: ServerLoadEvent) {
	let user: UserProfile | null = null;
	let blogs: ISafeBlog[] = [];
	let error: boolean = false;

	// Get session_id from cookies
	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// Do not request the user profile, skip it.
	// This way we can save bandwidth for the server.
	if (!session_id) {
		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/blog/list`);

			if (req.ok) {
				const { result } = await req.json();
				blogs = result;
			} else {
				error = true;
			}
		} catch (error) {
			console.error(error);
		}
	} else {
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
	}

	return {
		user: user,
		blogs: blogs,
		error: error
	};
}
