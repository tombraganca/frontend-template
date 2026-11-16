import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartAreaInteractive } from "@/features/dashboard/chart-area-interactive";
import { DataTable } from "@/features/dashboard/data-table";
import { documentsQueryOptions } from "@/features/dashboard/queries";
import { SectionCards } from "@/features/dashboard/section-cards";

export const Route = createFileRoute("/_authenticated/home/")({
	staticData: { title: "Documents" },
	// Start fetching before the page renders; the component reads from the same cache.
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(documentsQueryOptions),
	pendingComponent: HomeSkeleton,
	component: HomePage,
});

function HomePage() {
	const { data: documents } = useSuspenseQuery(documentsQueryOptions);

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
			<div className="px-4 lg:px-6">
				<ChartAreaInteractive />
			</div>
			<DataTable data={documents} />
		</div>
	);
}

function HomeSkeleton() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
			<div className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
				{["a", "b", "c", "d"].map((key) => (
					<Skeleton key={key} className="h-40" />
				))}
			</div>
			<Skeleton className="h-80" />
			<Skeleton className="h-96" />
		</div>
	);
}
