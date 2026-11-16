import { queryOptions } from "@tanstack/react-query";
import documents from "./documents.json";
import { schema } from "./schema";

export const dashboardKeys = {
	all: ["dashboard"] as const,
	documents: () => [...dashboardKeys.all, "documents"] as const,
};

/**
 * Example of a query. Swap the body of `queryFn` for a real request, e.g.
 * `http<Document[]>("/documents")`, and keep validating the response with zod.
 */
export const documentsQueryOptions = queryOptions({
	queryKey: dashboardKeys.documents(),
	queryFn: async () => schema.array().parse(documents),
});
