import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeftIcon, LayoutDashboardIcon } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/login-form";
import { sessionQueryOptions } from "@/features/auth/queries";
import { safeRedirect } from "@/features/auth/safe-redirect";

export const Route = createFileRoute("/login")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(undefined),
	}),
	// Already signed in? Skip the form.
	beforeLoad: async ({ context, search }) => {
		const user = await context.queryClient.ensureQueryData(sessionQueryOptions);
		if (user) throw redirect({ to: safeRedirect(search.redirect) });
	},
	component: LoginPage,
});

function LoginPage() {
	const { redirect: redirectTo } = Route.useSearch();

	return (
		<main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Link
					to="/"
					className="flex items-center gap-2 self-center font-semibold"
				>
					<span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<LayoutDashboardIcon className="size-4" />
					</span>
					Acme Inc.
				</Link>

				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Welcome back</CardTitle>
						<CardDescription>
							Sign in with your email and password
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm redirectTo={redirectTo} />
					</CardContent>
				</Card>

				<Button
					variant="ghost"
					size="sm"
					className="self-center"
					nativeButton={false}
					render={<Link to="/" />}
				>
					<ArrowLeftIcon data-icon="inline-start" />
					Back to home
				</Button>
			</div>
		</main>
	);
}
