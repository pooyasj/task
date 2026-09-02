import { Suspense } from "react";
import { AppSidebar } from "@/src/shared/components/app-sidebar";
import { SiteHeader } from "@/src/shared/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/shared/components/ui/sidebar";
import type { Device } from "@/src/features/devices/types/device";
import rawData from "@/src/features/devices/data/devices.json";
import { columns } from "@/src/features/devices/components/columns";
import { DataTable } from "@/src/features/devices/components/data-table";
export default function Page() {
  const data = rawData as Device[];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 pt-0!">
              <div className="px-4 lg:px-6">
                <div className="container mx-auto py-10">
                  <Suspense fallback={null}>
                    <DataTable columns={columns} data={data} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
