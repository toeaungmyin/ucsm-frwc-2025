import {ChartArea, ContactRound, Settings , User } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Navtitle from "./nav/nav-title";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: ChartArea,
    },
    {
        title: "Voters",
        url: "/dashboard/voters",
        icon: User,
    },

    {
        title: "Candidates",
        url: "/dashboard/candidates",
        icon: ContactRound,
    },
    {
        title: "Settings",
        url: "/dashboard/setting",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Navtitle />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span className="text-base font-normal">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
