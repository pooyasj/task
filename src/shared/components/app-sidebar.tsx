"use client";
import * as React from "react";
import { NavMain } from "@/src/shared/components/nav-main";
import { Sidebar, SidebarContent } from "@/src/shared/components/ui/sidebar";
import { LayoutDashboardIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
