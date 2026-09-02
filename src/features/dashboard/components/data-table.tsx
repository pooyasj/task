"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/src/features/dashboard/hooks/use-debounce";
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";

import { features } from "./data-table-features";
import { Input } from "@/src/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import type { Device, DeviceStatus } from "../types/device";
import { AddDeviceModal } from "./AddDeviceModal";
import { DeleteDeviceDialog } from "./DeleteDeviceDialog";

type StatusFilter =
  | "all"
  | Extract<DeviceStatus, "Online" | "Offline" | "Warning">;

const getStatusFilter = (value: string | null): StatusFilter => {
  return value === "Online" || value === "Offline" || value === "Warning"
    ? value
    : "all";
};

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof features, TData>[];
  data: TData[];
  onAddDevice: (device: Device) => void;
  onDeleteDevice: (id: string) => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  onAddDevice,
  onDeleteDevice,
}: DataTableProps<TData>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = React.useState(
    () => searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>(() =>
    getStatusFilter(searchParams.get("status")),
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedSearch = debouncedSearch;

    if (normalizedSearch) {
      params.set("search", normalizedSearch);
    } else {
      params.delete("search");
    }

    if (statusFilter === "all") {
      params.delete("status");
    } else {
      params.set("status", statusFilter);
    }

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (currentUrl !== nextUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams, statusFilter]);

  const filteredData = data.filter((row) => {
    const device = row as TData & Pick<Device, "name" | "ip" | "status">;
    const normalizedSearch = debouncedSearch.toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      device.name.toLowerCase().includes(normalizedSearch) ||
      device.ip.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "all" || device.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const table = useTable({
    features,
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search by name or IP..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(getStatusFilter(value as string | null))
            }
          >
            <SelectTrigger aria-label="Filter by status" className="sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
              <SelectItem value="Warning">Warning</SelectItem>
            </SelectContent>
          </Select>
          <AddDeviceModal onAdd={onAddDevice} />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DeleteDeviceDialog
                      device={row.original as TData & Device}
                      onDelete={onDeleteDevice}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-medium">No devices found</p>
                    <p className="text-muted-foreground text-sm">
                      Try changing your search or status filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
