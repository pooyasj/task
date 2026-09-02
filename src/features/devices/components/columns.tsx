"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import type { Device } from "../types/device";

const columnHelper = createColumnHelper<DataTableFeatures, Device>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Device Name",
  }),
  columnHelper.accessor("ip", {
    header: "IP Address",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("lastPing", {
    header: "LastPing",
  }),
]);
