export default interface UserProfile {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;
	Username: string;
	Email: string;
	Bio: string;
	PictureURL: string;
	IsTester: boolean;
}

export interface ISafeUser {
	ID: string;
	CreatedAt: string;
	UpdatedAt: string;
	Username: string;
	Bio: string;
	PictureURL: string;
	IsTester: boolean;
}
