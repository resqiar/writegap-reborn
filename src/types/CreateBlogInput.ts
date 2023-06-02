export interface ICreateBlogInput {
	title: string;
	summary: string;
	content: string;
	image: File | null;

	onError: (error: string) => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}
