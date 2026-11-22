"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, UserCog } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const roleBadge: Record<string, string> = {
    customer: "bg-sky-100 text-sky-700",
    technician: "bg-violet-100 text-violet-700",
    admin: "bg-slate-800 text-white",
};

interface UserMenuProps {
    user: { name: string; email: string; image?: string | null; role?: string | null };
    /** Show the name next to the avatar (mobile menu) */
    showName?: boolean;
    onNavigate?: () => void;
}

/** Avatar button → dropdown with name, role badge, Dashboard, Update Profile and Sign Out. */
export default function UserMenu({ user, showName = false, onNavigate }: UserMenuProps) {
    const router = useRouter();
    const role = user.role ?? "customer";

    const handleSignOut = async () => {
        await signOut();
        onNavigate?.();
        toast.add({ type: "success", title: "Signed out", description: "See you next time!" });
        router.push("/");
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label="Open account menu"
                className="flex cursor-pointer items-center gap-2.5 rounded-full p-0.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                <Avatar className="size-10 ring-2 ring-brand/20">
                    {user.image && <AvatarImage src={user.image} alt={user.name} />}
                    <AvatarFallback className="bg-brand/10 font-semibold text-brand">
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {showName && <span className="text-sm font-medium">{user.name}</span>}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
                <div className="flex flex-col gap-1 px-2 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    <Badge className={cn("mt-1 w-fit capitalize", roleBadge[role])}>{role}</Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    render={<Link href={`/dashboard/${role}`} onClick={onNavigate} />}
                >
                    <LayoutDashboard />
                    Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    render={<Link href="/dashboard/profile" onClick={onNavigate} />}
                >
                    <UserCog />
                    Update Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
