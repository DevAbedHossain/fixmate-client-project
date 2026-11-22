import type { Metadata } from "next";
import { redirect } from "next/navigation";

import ProfileUpdate from "@/components/dashboard/ProfileUpdate";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
    title: "Update Profile | FixMate",
};

/** Shared by every role. */
export default async function ProfilePage() {
    const session = await getSession();
    if (!session) redirect("/sign-in");

    const { user } = session;
    // Older profiles saved the area as `location`
    const legacyLocation = (user as { location?: string }).location;

    return (
        <ProfileUpdate
            user={{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role ?? "customer",
                image: user.image,
                phone: user.phone,
                area: user.area ?? legacyLocation,
                bio: user.bio,
            }}
        />
    );
}
