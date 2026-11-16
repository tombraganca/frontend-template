import { Link } from "@tanstack/react-router";
import {
	ChartBarIcon,
	CircleHelpIcon,
	CommandIcon,
	DatabaseIcon,
	FileChartColumnIcon,
	FileIcon,
	FolderIcon,
	LayoutDashboardIcon,
	ListIcon,
	SearchIcon,
	Settings2Icon,
	UsersIcon,
} from "lucide-react";
import type * as React from "react";
import { NavDocuments } from "@/components/layout/nav-documents";
import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/home",
			icon: <LayoutDashboardIcon />,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: <ListIcon />,
		},
		{
			title: "Analytics",
			url: "#",
			icon: <ChartBarIcon />,
		},
		{
			title: "Projects",
			url: "#",
			icon: <FolderIcon />,
		},
		{
			title: "Team",
			url: "#",
			icon: <UsersIcon />,
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: <Settings2Icon />,
		},
		{
			title: "Get Help",
			url: "#",
			icon: <CircleHelpIcon />,
		},
		{
			title: "Search",
			url: "#",
			icon: <SearchIcon />,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: <DatabaseIcon />,
		},
		{
			name: "Reports",
			url: "#",
			icon: <FileChartColumnIcon />,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: <FileIcon />,
		},
	],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="data-[slot=sidebar-menu-button]:p-1.5!"
							render={<Link to="/home" />}
						>
							<CommandIcon className="size-5!" />
							<span className="text-base font-semibold">Acme Inc.</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
