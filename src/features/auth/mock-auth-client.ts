import { type AuthClient, AuthError, type User } from "./types";

const STORAGE_KEY = "auth:mock-session";
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_CREDENTIALS = {
	email: "demo@example.com",
	password: "password",
};

const MOCK_USER: User = {
	id: "1",
	name: "Demo User",
	email: MOCK_CREDENTIALS.email,
};

/** Fake backend persisted in localStorage — lets the template run with no server. */
export const mockAuthClient: AuthClient = {
	async getSession() {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as User) : null;
	},

	async signIn({ email, password }) {
		await delay();
		if (
			email.toLowerCase() !== MOCK_CREDENTIALS.email ||
			password !== MOCK_CREDENTIALS.password
		) {
			throw new AuthError();
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
		return MOCK_USER;
	},

	async signOut() {
		await delay(200);
		localStorage.removeItem(STORAGE_KEY);
	},
};
