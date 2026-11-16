/** Only allow same-origin relative paths — prevents open redirects via `?redirect=`. */
export function safeRedirect(path: string | undefined, fallback = "/home") {
	if (path?.startsWith("/") && !path.startsWith("//")) return path;
	return fallback;
}
