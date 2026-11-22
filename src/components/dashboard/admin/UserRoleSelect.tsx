"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { updateUserRole } from "@/lib/api";
import { getClientToken } from "@/lib/auth-client";
import type { IRole } from "@/types/UserType";

const ROLES: IRole[] = ["customer", "technician", "admin"];

interface UserRoleSelectProps {
    userId: string;
    userName: string;
    role: IRole;
    /** The admin cannot change their own role */
    isSelf: boolean;
}

export default function UserRoleSelect({ userId, userName, role, isSelf }: UserRoleSelectProps) {
    const router = useRouter();
    const [value, setValue] = useState<IRole>(role);
    const [saving, setSaving] = useState(false);

    const handleChange = async (nextRole: IRole) => {
        const previous = value;
        setValue(nextRole);
        setSaving(true);
        try {
            await updateUserRole(userId, nextRole, await getClientToken());
            toast.add({ type: "success", title: "Role updated", description: `${userName} is now a ${nextRole}.` });
            router.refresh();
        } catch (error) {
            setValue(previous);
            toast.add({ type: "error", title: "Could not update role", description: error instanceof Error ? error.message : "Please try again." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <select
                value={value}
                disabled={isSelf || saving}
                onChange={(event) => handleChange(event.target.value as IRole)}
                aria-label={`Role for ${userName}`}
                title={isSelf ? "You cannot change your own role" : undefined}
                className="h-9 cursor-pointer rounded-lg border border-input bg-background px-2.5 text-sm capitalize outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {ROLES.map((option) => (
                    <option key={option} value={option} className="capitalize">
                        {option}
                    </option>
                ))}
            </select>
            {saving && <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden="true" />}
            {isSelf && <span className="text-xs text-muted-foreground">(you)</span>}
        </div>
    );
}
