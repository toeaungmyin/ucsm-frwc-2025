import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
      <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-2">
                <SidebarTrigger />
                <div className="px-12 py-8">
                    {children}
                    <Toaster />
                </div>
            </main>
      </SidebarProvider>
  );
}