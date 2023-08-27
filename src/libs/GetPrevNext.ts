import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { ISafeBlogAuthor } from "../types/Blog";

export async function handleGetPrevNext(prev: string, next: string, onFinish: (prev: ISafeBlogAuthor | null, next: ISafeBlogAuthor | null) => void): Promise<void> {
	// if current blog has nothing, just skip it
	if (!prev && !next) return;

	try {
		const [prevReq, nextReq] = await Promise.allSettled([
			prev ? fetch(`${PUBLIC_SERVER_URL}/blog/get/published/${prev}`) : null,
			next ? fetch(`${PUBLIC_SERVER_URL}/blog/get/published/${next}`) : null
		]);

		if (prevReq.status === 'fulfilled' && prevReq.value) {
			const { result } = await prevReq.value.json();
			onFinish(result, null);
		}

		if (nextReq.status === 'fulfilled' && nextReq.value) {
			const { result } = await nextReq.value.json();
			onFinish(null, result);
		}
	} catch (error) {
		console.log(error);
	}
}
