import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getRouter } from "./router";

const router = getRouter();
const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<QueryClientProvider client={router.options.context.queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>
						<RouterProvider router={router} />
						<Toaster richColors />
					</TooltipProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}
