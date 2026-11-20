
// import DashboardHeader from '@/components/dashboard/DashboardHeader';
// import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// import React from 'react';

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <SidebarProvider>
//             <DashboardSidebar />
//             <SidebarInset>
//                 <DashboardHeader />
//                 <div className="flex-1 p-4 sm:p-6">
//                     {children}
//                 </div>
//             </SidebarInset>
//         </SidebarProvider >
//     );
// };

// export default DashboardLayout;




import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                {/* Dashboard Header */}
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-5 backdrop-blur">
                    <SidebarTrigger />

                    <Separator orientation="vertical" className="h-5" />

                    <div>
                        <h1 className="text-sm font-semibold">
                            FixMate Dashboard
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Manage your repair activities
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-muted/30 p-4 md:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

