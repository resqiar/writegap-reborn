export interface IBlog {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;
	DeletedAt: string | null;
	Title: string;
	Summary: string;
	Content: string;
	Published: boolean;
	CoverURL: string;
	AuthorID: string;
}
