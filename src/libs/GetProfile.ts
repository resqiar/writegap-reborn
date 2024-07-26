import { PUBLIC_SERVER_URL } from "$env/static/public";
import type UserProfile from "../types/UserProfile";

export async function handleGetProfile(): Promise<UserProfile | null> {
	try {
		const req = await fetch(`${PUBLIC_SERVER_URL}/user/profile`, { credentials: "include" });

		// if request status is not 200 (OK)
		if (!req.ok) return null;

		const res = await req.json();
		return res.result as UserProfile;
	} catch (error) {
		console.log(error);
		return null
	}
}

