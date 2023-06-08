export interface IUpdateBlogInput {
	blogID: string;
	title: string;
	summary: string;
	content: string;
	image: File | null;

	onError: () => void;
	onLoadingStart: () => void;
	onLoadingEnd: () => void;
}
