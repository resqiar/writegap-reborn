import type { ISafeUser } from './UserProfile';

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

export interface ISafeBlog {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;
	Title: string;
	Summary: string;
	Content: string;
	CoverURL: string;
	AuthorID: string;
}

export interface ISafeBlogAuthor extends ISafeBlog {
	Author: ISafeUser;
}
