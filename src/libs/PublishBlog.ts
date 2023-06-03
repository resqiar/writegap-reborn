import { PUBLIC_SERVER_URL } from '$env/static/public';

export default async function publishBlog(id: string): Promise<boolean> {
	try {
		const res = await fetch(`${PUBLIC_SERVER_URL}/blog/publish`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				id: id
			})
		});

		if (res.ok) return true;
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
