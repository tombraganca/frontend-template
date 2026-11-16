import { HttpError, http } from "@/lib/http";
import { type AuthClient, AuthError, type User } from "./types";

/**
 * Cookie-based session against a REST backend. Adjust paths/payloads to your API:
 *   POST /auth/login   { email, password } -> User
 *   GET  /auth/me                          -> User (401 when logged out)
 *   POST /auth/logout
 */
export const httpAuthClient: AuthClient = {
	async getSession() {
		try {
			return await http<User>("/auth/me");
		} catch (error) {
			if (error instanceof HttpError && error.status === 401) return null;
			throw error;
		}
	},

	async signIn(credentials) {
		try {
			return await http<User>("/auth/login", {
				method: "POST",
				body: JSON.stringify(credentials),
			});
		} catch (error) {
			if (error instanceof HttpError && error.status < 500) {
				throw new AuthError(error.message);
			}
			throw error;
		}
	},

	async signOut() {
		await http<void>("/auth/logout", { method: "POST" });
	},
};
