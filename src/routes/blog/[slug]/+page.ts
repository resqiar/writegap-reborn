import { error } from '@sveltejs/kit';
/*
 * This function takes in a string `path` and returns
 * the first capture group of the regular expression match.
 * If the regular expression does not match or the capture group is not found,
 * the function will returns null.
 */
const slugFromPath = (path: string) => path.match(/([\w-]+)\.(svelte)/i)?.[1] ?? null;

export const load = async ({ params }: any) => {
	/*
	 * Find all files with the extensions of `.svelte`
	 * in the `/src/posts/**` directory and store them here.
	 * No matter how deep the files in, it will eventually find them.
	 */
	const modules = import.meta.glob(`/src/posts/**/*.svelte`);

	let match: { path?: string; resolver?: App.FileResolver } = {};
	/*
	 * Iterates over the key-value pairs of the `modules` object.
	 * If they are equal to match, breaks out of the loop.
	 * The `resolver` value is type-asserted to be of type `App.FileResolver`.
	 */
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, resolver: resolver as unknown as App.FileResolver };
			break;
		}
	}

	/*
	 * If `match` or `match.resolver` are `null` or `undefined`,
	 * the expression will short-circuit and return `null` or `undefined`
	 * without throwing an error. Otherwise it will contain the mdx value.
	 */
	const post = await match?.resolver?.();

	if (!post) throw error(404); // file not found, send to 404 page

	return {
		component: post.default
	};
};
