import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { ISafeBlogAuthor } from "../types/Blog";

export async function handleGetUserBlogs(username: string): Promise<ISafeBlogAuthor[]> {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/blog/get/${username}`, {
			credentials: 'include'
		});

		if (req.ok) {
			const { result } = await req.json();
			if (result) return result;
			return [];
		}

		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
}
