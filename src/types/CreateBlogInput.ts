export interface ICreateBlogInput {
	title: string;
	summary: string;
	content: string;
	image: File | null;
	prev: string;
	next: string;

	onError: (error: string) => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}
