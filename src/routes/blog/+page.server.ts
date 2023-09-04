import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { ISafeBlogAuthor } from '../../types/Blog';
import type UserProfile from '../../types/UserProfile';

export async function load({ fetch, cookies }: ServerLoadEvent) {
	let blogs: ISafeBlogAuthor[] = [];
	let error: boolean = false;
	let user: UserProfile | null = null;

	const session_id = cookies.get('session_id');

	// If there is no session cookies - or expired cookies,
	// immediately return user as null.
	// This way we can save bandwith for the server.
	if (!session_id) {
		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/blog/list`);

			if (req.ok) {
				const res = await req.json();

				// if blog is null,  set it to empty
				if (!res.result) {
					blogs = [];
				} else {
					blogs = res.result;
				}
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

			if (userRes.status === 'fulfilled' && userRes.value.ok) {
				const res = await userRes.value.json();
				user = res.result;
			}

			if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
				const res = await blogRes.value.json();

				// if blog is null, set it to empty
				if (!res.result) {
					blogs = [];
				} else {
					blogs = res.result;
				}
			} else {
				error = true;
			}
		} catch (error) {
			console.error(error);
		}
	}

	return {
		blogs: blogs,
		user: user,
		error: error
	}
}
