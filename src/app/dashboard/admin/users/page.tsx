import type { Metadata } from "next";
import { Users } from "lucide-react";

import UserRoleSelect from "@/components/dashboard/admin/UserRoleSelect";
import FilterTabs from "@/components/dashboard/shared/FilterTabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsers } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "Manage Users | FixMate",
};

const ROLE_FILTERS = [
    { value: "all", label: "All" },
    { value: "customer", label: "Customers" },
    { value: "technician", label: "Technicians" },
    { value: "admin", label: "Admins" },
];

const initials = (name = "") =>
    name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

export default async function ManageUsersPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
    const session = await requireRole("admin");
    const users = await getAllUsers(await getServerToken());

    const { role } = await searchParams;
    const active = ROLE_FILTERS.some((filter) => filter.value === role) ? role! : "all";
    const visible = active === "all" ? users : users.filter((user) => user.role === active);
    const counts = Object.fromEntries(
        ROLE_FILTERS.map(({ value }) => [value, value === "all" ? users.length : users.filter((user) => user.role === value).length])
    );

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Manage users</h1>
                    <p className="text-sm text-muted-foreground">Change a user&apos;s role. You can&apos;t change your own.</p>
                </div>
                <FilterTabs options={ROLE_FILTERS} active={active} counts={counts} param="role" label="Filter users by role" />
            </div>

            {visible.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <Users className="size-10 text-muted-foreground" aria-hidden="true" />
                    <p className="font-semibold">No users here</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="pl-5">User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="pr-5">Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="py-3 pl-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-9">
                                                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                                                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                                                    {initials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell>
                                        <UserRoleSelect
                                            userId={user._id}
                                            userName={user.name}
                                            role={user.role}
                                            isSelf={user.email === session.user.email}
                                        />
                                    </TableCell>
                                    <TableCell className="pr-5 text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
