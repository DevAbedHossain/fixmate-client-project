
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex-1 p-4 sm:p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider >
    );
};

export default DashboardLayout;
