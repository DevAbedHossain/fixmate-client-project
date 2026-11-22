import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

/** Dashboard layout: collapsible sidebar + top bar, no public navbar/footer. */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <DashboardHeader />

                {/* Full-width content */}
                <main className="flex-1 bg-muted/30 p-4 md:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
