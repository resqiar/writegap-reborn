export interface IUpdateBlogInput {
	blogID: string;
	title: string;
	summary: string;
	content: string;
	image: File | null;
	prev: string;
	next: string;

	onError: () => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}
