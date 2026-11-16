import { QueryClient } from "@tanstack/react-query";
import { HttpError } from "@/lib/http";

/**
 * One QueryClient per app instance. It is created in `getRouter()` and shared with
 * the router through context, so route loaders and components use the same cache.
 */
export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Data is considered fresh for 1 minute: avoids refetch storms on mount/focus.
				staleTime: 60 * 1000,
				// Don't retry client errors (401, 404...) — they won't fix themselves.
				retry: (failureCount, error) => {
					if (error instanceof HttpError && error.status < 500) return false;
					return failureCount < 2;
				},
			},
		},
	});
}
