export interface ICreateBlogInput {
	title: string;
	summary: string;
	content: string;

	onError: (error: string) => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}
