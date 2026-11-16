import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { authClient } from "./auth-client";

/** Query key factory — keep every key of a feature in one place. */
export const authKeys = {
	all: ["auth"] as const,
	session: () => [...authKeys.all, "session"] as const,
};

/**
 * The session is just another query. Route guards read it with `ensureQueryData`
 * and components with `useCurrentUser()`, so there is a single source of truth.
 */
export const sessionQueryOptions = queryOptions({
	queryKey: authKeys.session(),
	queryFn: () => authClient.getSession(),
	staleTime: 5 * 60 * 1000,
	retry: false,
});

/** Current user. Only call inside authenticated routes (the guard guarantees a user). */
export function useCurrentUser() {
	const { data } = useSuspenseQuery(sessionQueryOptions);
	if (!data)
		throw new Error("useCurrentUser() called without an active session");
	return data;
}

export function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: authClient.signIn,
		onSuccess: (user) => {
			queryClient.setQueryData(sessionQueryOptions.queryKey, user);
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: authClient.signOut,
		onSuccess: async () => {
			// Leave the protected tree first so nothing refetches with a dead session...
			await navigate({ to: "/login", search: { redirect: undefined } });
			// ...then drop everything cached for the previous user.
			queryClient.clear();
			queryClient.setQueryData(sessionQueryOptions.queryKey, null);
			await router.invalidate();
		},
	});
}
