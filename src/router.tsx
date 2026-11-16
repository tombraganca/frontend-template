import type { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { createQueryClient } from "@/lib/query-client";
import { routeTree } from "./routeTree.gen";

export type RouterContext = {
	queryClient: QueryClient;
};

export function getRouter() {
	const queryClient = createQueryClient();

	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		// TanStack Query owns data freshness; the router's own preload cache must not.
		defaultPreloadStaleTime: 0,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}

	/** Static metadata per route, e.g. the page title shown in the dashboard header. */
	interface StaticDataRouteOption {
		title?: string;
	}
}
