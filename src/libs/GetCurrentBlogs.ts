import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { IBlog } from '../types/Blog';

export default async function getCurrentBlogs(): Promise<IBlog[] | undefined> {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/list/current`, {
			method: 'POST',
			credentials: 'include'
		});

		if (req.ok) {
			// convert to JSON
			const { result } = await req.json();
			return result;
		}
	} catch (error) {
		console.error(error);
	}
}
