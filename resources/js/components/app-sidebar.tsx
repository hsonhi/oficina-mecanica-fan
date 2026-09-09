import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    ShieldUser,
    Users,
    Helicopter,
    Wrench,
    Cog,
    ChartNoAxesColumn,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboard } from "@/routes";
import { index as mechanics } from "@/routes/mechanics";
import { index as materials } from "@/routes/materials";
import { index as aircrafts } from "@/routes/aircrafts";
import { index as services } from "@/routes/services";
import { index as users } from "@/routes/users";
import type { NavItem } from "@/types";

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = page.props.currentTeam
        ? dashboard(page.props.currentTeam.slug)
        : "/";

    const mainNavItems: NavItem[] = [
        {
            title: "Visão geral",
            href: dashboardUrl,
            icon: ChartNoAxesColumn,
        },
        {
            title: "Usuários",
            href: users(),
            icon: ShieldUser,
        },
        {
            title: "Mecânicos",
            href: mechanics(),
            icon: Users,
        },
        {
            title: "Aeronaves",
            href: aircrafts(),
            icon: Helicopter,
        },
        {
            title: "Materiais",
            href: materials(),
            icon: Cog,
        },
        {
            title: "Serviços",
            href: services(),
            icon: Wrench,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: "Repository",
            href: "https://github.com/laravel/react-starter-kit",
            icon: FolderGit2,
        },
        {
            title: "Documentation",
            href: "https://laravel.com/docs/starter-kits#react",
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/*<SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu> */}
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/*  <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
