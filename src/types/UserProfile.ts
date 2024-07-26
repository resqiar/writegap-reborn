export default interface UserProfile {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;

	Fullname: string;
	Username: string;
	Email: string;
	Bio: string;
	PictureURL: string;

	// Social media fields
	WebsiteURL: string
	GithubURL: string
	LinkedinURL: string
	InstagramURL: string
	TwitterURL: string
	YoutubeURL: string

	IsTester: boolean;
}

export interface ISafeUser {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;

	Fullname: string;
	Username: string;
	Bio: string;
	PictureURL: string;

	// Social media fields
	WebsiteURL: string
	GithubURL: string
	LinkedinURL: string
	InstagramURL: string
	TwitterURL: string
	YoutubeURL: string

	IsTester: boolean;
}
