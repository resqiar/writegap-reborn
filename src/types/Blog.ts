import type { ISafeUser } from './UserProfile';

export interface IBlog {
	ID: string;
	Slug: string;
	CreatedAt: string;
	UpdatedAt: string;
	PublishedAt: string;
	DeletedAt: string | null;
	Title: string;
	Summary: string;
	Content: string;
	Published: boolean;
	CoverURL: string;
	Prev: string;
	Next: string;
	AuthorID: string;
}

export interface ISafeBlog {
	ID: string;
	Slug: string;
	CreatedAt: string;
	PublishedAt: string;
	UpdatedAt: string;
	Title: string;
	Summary: string;
	Content: string;
	CoverURL: string;
	Prev: string;
	Next: string;
	AuthorID: string;
}

export interface ISafeBlogAuthor extends ISafeBlog {
	Author: ISafeUser;
}
