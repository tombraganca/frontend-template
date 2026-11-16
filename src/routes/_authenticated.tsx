import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { sessionQueryOptions } from "@/features/auth/queries";

/**
 * Pathless layout: every route under `src/routes/_authenticated/` is protected
 * and rendered inside the dashboard shell (sidebar + header).
 */
export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context, location }) => {
		const user = await context.queryClient.ensureQueryData(sessionQueryOptions);
		if (!user) {
			throw redirect({ to: "/login", search: { redirect: location.href } });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="@container/main flex flex-1 flex-col gap-2">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
