import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRightIcon,
	DatabaseIcon,
	LayoutDashboardIcon,
	PaletteIcon,
	RouteIcon,
	ShieldCheckIcon,
	SparklesIcon,
	WrenchIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({ component: LandingPage });

type Feature = {
	icon: ComponentType;
	title: string;
	description: string;
};

const features: Feature[] = [
	{
		icon: RouteIcon,
		title: "TanStack Router",
		description:
			"File-based, fully typed routes, validated search params and code splitting out of the box.",
	},
	{
		icon: DatabaseIcon,
		title: "TanStack Query",
		description:
			"Server state with query option factories, route loaders that prefetch and sensible cache defaults.",
	},
	{
		icon: ShieldCheckIcon,
		title: "Pluggable auth",
		description:
			"Guarded routes, redirect-back after login and a 3-method AuthClient interface to plug in your backend.",
	},
	{
		icon: PaletteIcon,
		title: "shadcn/ui + Base UI",
		description:
			"Accessible components you own, themed with CSS variables and ready for light and dark mode.",
	},
	{
		icon: SparklesIcon,
		title: "Tailwind CSS v4",
		description:
			"CSS-first configuration through the Vite plugin. No config file to maintain.",
	},
	{
		icon: WrenchIcon,
		title: "Biome + strict TypeScript",
		description:
			"One fast tool for lint and format, plus strict compiler flags from day one.",
	},
];

function LandingPage() {
	return (
		<div className="min-h-svh bg-background">
			<header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
				<div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6">
					<Link to="/" className="flex items-center gap-2 font-semibold">
						<span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<LayoutDashboardIcon className="size-4" />
						</span>
						Frontend Template
					</Link>
					<nav className="ml-6 hidden items-center gap-4 text-sm text-muted-foreground sm:flex">
						<a href="#features" className="hover:text-foreground">
							Features
						</a>
						<a href="#components" className="hover:text-foreground">
							Components
						</a>
						<a href="#auth" className="hover:text-foreground">
							Auth
						</a>
					</nav>
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<Button
							variant="outline"
							nativeButton={false}
							render={<Link to="/login" search={{ redirect: undefined }} />}
						>
							Sign in
						</Button>
					</div>
				</div>
			</header>

			<main>
				<section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
					<Badge variant="secondary">React 19 · Vite · TypeScript</Badge>
					<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
						A frontend starter that is ready for the real work
					</h1>
					<p className="max-w-xl text-lg text-pretty text-muted-foreground">
						Routing, data fetching, authentication and a component library
						already wired together, so a new project starts at the first
						feature.
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						<Button size="lg" nativeButton={false} render={<Link to="/home" />}>
							Open the dashboard
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							nativeButton={false}
							render={<a href="#components" />}
						>
							Browse components
						</Button>
					</div>
				</section>

				<section
					id="features"
					className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16"
				>
					<SectionTitle
						title="What's inside"
						description="Each piece is optional to keep, easy to replace."
					/>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{features.map(({ icon: Icon, title, description }) => (
							<Card key={title}>
								<CardHeader>
									<div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
										<Icon />
									</div>
									<CardTitle>{title}</CardTitle>
									<CardDescription>{description}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</section>

				<section
					id="components"
					className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16"
				>
					<SectionTitle
						title="Components"
						description="Live examples of the shadcn/ui components already installed in src/components/ui."
					/>
					<Tabs defaultValue="inputs">
						<TabsList>
							<TabsTrigger value="inputs">Inputs</TabsTrigger>
							<TabsTrigger value="buttons">Buttons & badges</TabsTrigger>
							<TabsTrigger value="feedback">Feedback</TabsTrigger>
						</TabsList>

						<TabsContent value="inputs">
							<Card>
								<CardContent className="grid gap-6 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="demo-name">Name</FieldLabel>
										<Input id="demo-name" placeholder="Ada Lovelace" />
									</Field>
									<div className="flex flex-col justify-end gap-4">
										<Field orientation="horizontal">
											<Switch id="demo-notifications" defaultChecked />
											<FieldLabel htmlFor="demo-notifications">
												Email notifications
											</FieldLabel>
										</Field>
										<Field orientation="horizontal">
											<Checkbox id="demo-terms" />
											<FieldLabel htmlFor="demo-terms">
												Accept the terms
											</FieldLabel>
										</Field>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="buttons">
							<Card>
								<CardContent className="flex flex-col gap-6">
									<div className="flex flex-wrap gap-3">
										<Button>Default</Button>
										<Button variant="secondary">Secondary</Button>
										<Button variant="outline">Outline</Button>
										<Button variant="ghost">Ghost</Button>
										<Button variant="destructive">Destructive</Button>
										<Button variant="link">Link</Button>
									</div>
									<div className="flex flex-wrap items-center gap-3">
										<Badge>Default</Badge>
										<Badge variant="secondary">Secondary</Badge>
										<Badge variant="outline">Outline</Badge>
										<Badge variant="destructive">Destructive</Badge>
										<Tooltip>
											<TooltipTrigger
												render={<Button variant="outline" size="sm" />}
											>
												Hover me
											</TooltipTrigger>
											<TooltipContent>
												Tooltips are wired in the app root
											</TooltipContent>
										</Tooltip>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="feedback">
							<Card>
								<CardContent className="grid gap-6 sm:grid-cols-2">
									<div className="flex flex-col gap-4">
										<Alert>
											<SparklesIcon />
											<AlertTitle>Heads up</AlertTitle>
											<AlertDescription>
												Alerts highlight important information.
											</AlertDescription>
										</Alert>
										<Button
											variant="outline"
											onClick={() =>
												toast.success("Toast from Sonner", {
													description: "Mounted once in main.tsx.",
												})
											}
										>
											Show toast
										</Button>
									</div>
									<div className="flex flex-col gap-3">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
										<Skeleton className="h-24 w-full" />
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</section>

				<section
					id="auth"
					className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16"
				>
					<SectionTitle
						title="Bring your own backend"
						description="The app only knows the AuthClient interface. Implement it and you are done."
					/>
					<div className="grid gap-4 lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>src/features/auth/types.ts</CardTitle>
								<CardDescription>The whole contract</CardDescription>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
									<code>{`interface AuthClient {
  getSession(): Promise<User | null>
  signIn(credentials): Promise<User>
  signOut(): Promise<void>
}`}</code>
								</pre>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Try it</CardTitle>
								<CardDescription>
									Without VITE_API_URL the template uses a mock client persisted
									in localStorage.
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
								<p>
									Visiting <code className="text-foreground">/home</code> while
									signed out sends you to the login and brings you back
									afterwards.
								</p>
								<Button
									className="self-start"
									nativeButton={false}
									render={<Link to="/home" />}
								>
									Go to /home
								</Button>
							</CardContent>
						</Card>
					</div>
				</section>
			</main>

			<footer className="border-t py-8 text-center text-sm text-muted-foreground">
				Built with TanStack, shadcn/ui and Tailwind CSS.
			</footer>
		</div>
	);
}

function SectionTitle({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="mb-8 flex flex-col gap-2">
			<h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
			<p className="text-muted-foreground">{description}</p>
		</div>
	);
}
