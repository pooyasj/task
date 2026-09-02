"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import type { Device } from "../types/device";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
const columnHelper = createColumnHelper<DataTableFeatures, Device>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "number",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("ip", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IP Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const status = getValue();
      const statusStyles = {
        Online:
          "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
        Offline:
          "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        Warning:
          "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
      } as const;

      return <Badge className={statusStyles[status]}>{status}</Badge>;
    },
  }),
  columnHelper.accessor("lastPing", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LastPing
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
]);
