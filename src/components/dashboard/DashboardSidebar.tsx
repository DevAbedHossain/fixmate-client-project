"use client"

import type { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
    BookAIcon,
    Bookmark,
    Briefcase,
    Building2,
    CreditCard,
    FileText,
    Home,
    LayoutDashboard,
    PlusCircle,
    Settings,
    Users,
    Wrench,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import Link from "next/link";
import { IRole } from "@/types/UserType";
import { Avatar, AvatarBadge, AvatarImage } from "../ui/avatar";

export type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

const menuItemsByRole: Record<IRole, MenuItem[]> = {
    customer: [
        { id: "home", name: "Home", url: "/", icon: Home },
        { id: "dashboard", name: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard },
        { id: "bookings", name: "Bookings", url: "/dashboard/customer/bookings", icon: BookAIcon },
        { id: "payments", name: "Payments", url: "/dashboard/customer/payments", icon: Bookmark },
        { id: "profile-update", name: "Profile Update", url: "/dashboard/customer/profile-update", icon: Settings },
    ],
    technician: [
        { id: "home", name: "Home", url: "/", icon: Home },
        { id: "dashboard", name: "Dashboard", url: "/dashboard/technician", icon: LayoutDashboard },
        { id: "add-service", name: "Add Service", url: "/dashboard/technician/add-service", icon: Building2 },
        { id: "my-services", name: "My Services", url: "/dashboard/technician/my-services", icon: Briefcase },
        { id: "manage-requests", name: "Manage Requests", url: "/dashboard/technician/manage-requests", icon: PlusCircle },
        { id: "profile-update", name: "Profile Update", url: "/dashboard/technician/profile-update", icon: Settings },
    ],
    admin: [
        { id: "home", name: "Home", url: "/", icon: Home },
        { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
        { id: "services", name: "Services", url: "/dashboard/admin/services", icon: Building2 },
        { id: "bookings", name: "Bookings", url: "/dashboard/admin/bookings", icon: Briefcase },
        { id: "transactions", name: "Transactions", url: "/dashboard/admin/transactions", icon: CreditCard },
        { id: "profile-update", name: "Profile Update", url: "/dashboard/admin/profile-update", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const role: IRole = (session?.user?.role as IRole) || "customer"

    return (
        <Sidebar>
            <SidebarHeader>
                <Link
                    href="/"
                    className="flex w-fit items-center gap-2 mb-5"
                    aria-label="FixMate home"
                >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                        <Wrench className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="hidden text-lg font-bold tracking-tight sm:inline">
                        FixMate
                    </span>
                </Link>
                <div className=" flex gap-1 items-center py-3">
                    <img className="rounded-full w-10 object-cover h-10 border-2 border-[#155dfc]" src={session?.user.image as string} alt={session?.user.name as string} />
                    <div className="mx-2 flex flex-col gap-0.5 rounded-lg py-3">
                        <span className="truncate text-sm font-semibold ">
                            {session?.user?.name || "Guest User"}
                        </span>
                        <span className="text-xs capitalize text-[#a1a4aa]">{role}</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenu>
                    {menuItemsByRole[role].map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                isActive={pathname === item.url}
                                render={<Link href={item.url} />}
                                className="data-active:before:absolute data-active:before:left-0 data-active:before:top-1/2 data-active:before:h-4 data-active:before:w-0.5 data-active:before:-translate-y-1/2 data-active:before:rounded-full data-active:before:bg-[#5c53fe]"
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Avatar>
                                <AvatarImage src={session?.user.image as string} alt={session?.user.name} />
                                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                            </Avatar>
                            {session?.user.name}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
