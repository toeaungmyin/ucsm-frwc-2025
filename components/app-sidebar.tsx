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
        url: "/4714461e6ed697c165d89eeebb15b0246ca64d418765e95bdb9b2bdba787a131",
        icon: ChartArea,
    },
    {
        title: "Voters",
        url: "/4714461e6ed697c165d89eeebb15b0246ca64d418765e95bdb9b2bdba787a131/voters",
        icon: User,
    },

    {
        title: "Candidates",
        url: "/4714461e6ed697c165d89eeebb15b0246ca64d418765e95bdb9b2bdba787a131/candidates",
        icon: ContactRound,
    },
    {
        title: "Settings",
        url: "/4714461e6ed697c165d89eeebb15b0246ca64d418765e95bdb9b2bdba787a131/setting",
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
