"use client";

import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import Link from "next/link";
import {
    Home,
    LayoutDashboard,
    CalendarDays,
    CreditCard,
    Settings,
    Users,
    BriefcaseBusiness,
    ClipboardList,
    PlusCircle,
    Wrench,
    UserRound,
    Building2,
    Receipt,
    LogOut,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";
import { IRole } from "@/types/UserType";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export type MenuItem = {
    id: string;
    name: string;
    url: string;
    icon: LucideIcon;
};

const menuItemsByRole: Record<IRole, MenuItem[]> = {
    customer: [
        { id: "home", name: "Home", url: "/", icon: Home },
        {
            id: "dashboard",
            name: "Dashboard",
            url: "/dashboard/customer",
            icon: LayoutDashboard,
        },
        {
            id: "bookings",
            name: "My Bookings",
            url: "/dashboard/customer/bookings",
            icon: CalendarDays,
        },
        {
            id: "payments",
            name: "Payments",
            url: "/dashboard/customer/payments",
            icon: CreditCard,
        },
        {
            id: "profile",
            name: "Profile Settings",
            url: "/dashboard/profile",
            icon: Settings,
        },
    ],

    technician: [
        { id: "home", name: "Home", url: "/", icon: Home },
        {
            id: "dashboard",
            name: "Dashboard",
            url: "/dashboard/technician",
            icon: LayoutDashboard,
        },
        {
            id: "add-service",
            name: "Add Service",
            url: "/dashboard/technician/add-service",
            icon: PlusCircle,
        },
        {
            id: "my-services",
            name: "My Services",
            url: "/dashboard/technician/my-services",
            icon: BriefcaseBusiness,
        },
        {
            id: "requests",
            name: "Manage Requests",
            url: "/dashboard/technician/requests",
            icon: ClipboardList,
        },
        {
            id: "profile",
            name: "Profile Settings",
            url: "/dashboard/profile",
            icon: Settings,
        },
    ],

    admin: [
        { id: "home", name: "Home", url: "/", icon: Home },
        {
            id: "dashboard",
            name: "Dashboard",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            id: "users",
            name: "Manage Users",
            url: "/dashboard/admin/users",
            icon: Users,
        },
        {
            id: "services",
            name: "Manage Services",
            url: "/dashboard/admin/services",
            icon: Building2,
        },
        {
            id: "bookings",
            name: "Manage Bookings",
            url: "/dashboard/admin/bookings",
            icon: CalendarDays,
        },
        {
            id: "transactions",
            name: "Transactions",
            url: "/dashboard/admin/transactions",
            icon: Receipt,
        },
        {
            id: "profile",
            name: "Profile Settings",
            url: "/dashboard/profile",
            icon: Settings,
        },
    ],
};

export function DashboardSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const user = session?.user;
    const role: IRole = (user?.role as IRole) || "customer";

    const menuItems = menuItemsByRole[role] || menuItemsByRole.customer;

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        toast.add({ type: "success", title: "Signed out", description: "See you next time!" });
        router.push("/");
        router.refresh();
    }

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            {/* Logo */}
            <SidebarHeader className="border-b px-4 py-5">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Wrench className="size-5" />
                    </div>

                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-xl font-bold tracking-tight">
                            FixMate
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Repair Service Platform
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* User Information */}
            <div className="px-3 py-4">
                <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
                    <Avatar className="size-10 shrink-0">
                        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                        <AvatarFallback>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                        <p className="truncate text-sm font-semibold">
                            {user?.name || "Guest User"}
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {role}
                        </p>
                    </div>
                </div>
            </div>

            <SidebarSeparator />

            {/* Navigation */}
            <SidebarContent className="px-2 py-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Main Menu
                    </SidebarGroupLabel>

                    <SidebarMenu className="gap-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.url;

                            return (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        tooltip={item.name}
                                        isActive={isActive}
                                        render={<Link href={item.url} />}
                                        className="h-10 rounded-lg px-3 transition-all data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold"
                                    >
                                        <item.icon className="size-[18px]" />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="My Account"
                            render={<Link href={`/dashboard/${user?.role}`} />}
                            className="h-11 rounded-lg"
                        >
                            <UserRound className="size-[18px]" />
                            <span>My Account</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton
                            className="h-11 rounded-lg cursor-pointer"
                            onClick={handleSignOut}
                        >
                            <LogOut className="size-[18px]" />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <div className="px-2 pb-2 pt-2 text-center text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
                    © {new Date().getFullYear()} FixMate. All rights reserved.
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

