const API_URL = import.meta.env.VITE_API_URL ?? "";

export class HttpError extends Error {
	constructor(
		public status: number,
		message: string,
		public body?: unknown,
	) {
		super(message);
		this.name = "HttpError";
	}
}

/**
 * Minimal fetch wrapper: JSON in/out, cookies included, throws `HttpError` on non-2xx.
 * Need a bearer token instead of cookies? Add the `Authorization` header here — it's the
 * only place you have to touch.
 */
export async function http<T>(
	path: string,
	init: RequestInit = {},
): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		...init,
		headers: {
			...(init.body ? { "Content-Type": "application/json" } : {}),
			...init.headers,
		},
	});

	const body =
		response.status === 204
			? undefined
			: await response.json().catch(() => undefined);

	if (!response.ok) {
		const message =
			(body as { message?: string } | undefined)?.message ??
			response.statusText;
		throw new HttpError(response.status, message, body);
	}

	return body as T;
}
