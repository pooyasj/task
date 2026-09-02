"use client";

import * as React from "react";
import { Suspense } from "react";
import { AppSidebar } from "@/src/shared/components/app-sidebar";
import { SiteHeader } from "@/src/shared/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/shared/components/ui/sidebar";
import type { Device } from "@/src/features/dashboard/types/device";
import { columns } from "@/src/features/dashboard/components/columns";
import { DataTable } from "@/src/features/dashboard/components/data-table";
import { DevicesTableSkeleton } from "@/src/features/dashboard/components/DevicesTableSkeleton";
import { useDevices } from "@/src/features/dashboard/hooks/use-devices";
export default function Page() {
  const { data: fetchedDevices = [], isLoading, isError } = useDevices();
  const [addedDevices, setAddedDevices] = React.useState<Device[]>([]);
  const [deletedDeviceIds, setDeletedDeviceIds] = React.useState<string[]>([]);
  const data = [
    ...addedDevices,
    ...fetchedDevices.filter((device) => !deletedDeviceIds.includes(device.id)),
  ];

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
                  <Suspense fallback={<DevicesTableSkeleton />}>
                    {isLoading ? (
                      <DevicesTableSkeleton />
                    ) : isError ? (
                      <div className="rounded-md border p-8 text-center text-destructive">
                        Unable to load devices. Please try again.
                      </div>
                    ) : (
                      <DataTable
                        columns={columns}
                        data={data}
                        onAddDevice={(device) =>
                          setAddedDevices((current) => [device, ...current])
                        }
                        onDeleteDevice={(id) =>
                          setDeletedDeviceIds((current) =>
                            current.includes(id) ? current : [...current, id],
                          )
                        }
                      />
                    )}
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
