import { httpAuthClient } from "./http-auth-client";
import { mockAuthClient } from "./mock-auth-client";
import type { AuthClient } from "./types";

/** Mock when `VITE_API_URL` is empty, real HTTP backend otherwise. Replace freely. */
export const isMockAuth = !import.meta.env.VITE_API_URL;

export const authClient: AuthClient = isMockAuth
	? mockAuthClient
	: httpAuthClient;
