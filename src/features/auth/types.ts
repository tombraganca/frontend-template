export type User = {
	id: string;
	name: string;
	email: string;
	avatarUrl?: string;
};

export type Credentials = {
	email: string;
	password: string;
};

/**
 * The only contract the app depends on. To integrate your backend (REST, Firebase,
 * Supabase, Auth0, Clerk...), implement these three methods and export it from
 * `auth-client.ts`. Nothing else in the app needs to change.
 */
export interface AuthClient {
	/** Returns the current user, or `null` when there is no valid session. */
	getSession(): Promise<User | null>;
	/** Throws `AuthError` on invalid credentials. */
	signIn(credentials: Credentials): Promise<User>;
	signOut(): Promise<void>;
}

export class AuthError extends Error {
	constructor(message = "Invalid email or password.") {
		super(message);
		this.name = "AuthError";
	}
}
