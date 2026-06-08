import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryHandle } from "@/hooks/use-query-handle";
import { DEFAULT_PAGE_SIZE, PAGINATION_QUERY_KEY } from "@/lib/constants";
import { fillArrayWithNumber } from "@/lib/helpers/object";
import { cn } from "@/lib/utils";

type AppTable1Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalCount?: number;
  isLoading?: boolean;
  noUrlPagination?: boolean;
  className?: string;
  filterComponent?: React.ReactNode;
  toolbarActions?: React.ReactNode;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export function AppTable1<TData>({
  columns,
  data,
  totalCount,
  isLoading,
  noUrlPagination,
  className,
  filterComponent,
  toolbarActions,
}: AppTable1Props<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const urlPagination = useQueryHandle();

  const pageIndex = noUrlPagination
    ? 0
    : (urlPagination.pagination[PAGINATION_QUERY_KEY.PAGE_INDEX] ?? 1) - 1;

  const pageSize = noUrlPagination
    ? DEFAULT_PAGE_SIZE
    : urlPagination.pagination[PAGINATION_QUERY_KEY.PAGE_SIZE] ?? DEFAULT_PAGE_SIZE;

  const table = useReactTable({
    data,
    columns,
    pageCount: totalCount ? Math.ceil(totalCount / pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(totalCount
      ? { manualPagination: true }
      : { getPaginationRowModel: getPaginationRowModel() }),
  });

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    if (!noUrlPagination) {
      urlPagination.handleChangePageSize(size);
    } else {
      table.setPageSize(size);
    }
  };

  if (isLoading) {
    const skeletonCols = columns.map((col) => ({
      ...col,
      header: () => (
        <Skeleton className="h-4 w-full" />
      ),
      cell: () => <Skeleton className="h-4 w-full" />,
    }));

    return (
      <div className={cn("space-y-4", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      skeletonCols.find((c) => c.id === header.id)?.header ?? header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {fillArrayWithNumber(5).map((rowIdx) => (
              <TableRow key={rowIdx}>
                {table.getAllColumns().map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {(filterComponent || toolbarActions) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">{filterComponent}</div>
          <div className="flex items-center gap-2">{toolbarActions}</div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <span>
              {table.getFilteredSelectedRowModel().rows.length} /{" "}
              {table.getFilteredRowModel().rows.length} đã chọn
            </span>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Số dòng/trang
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Trang {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                if (totalCount && !noUrlPagination) {
                  urlPagination.handleChangePageIndex(1);
                } else {
                  table.setPageIndex(0);
                }
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                if (totalCount && !noUrlPagination) {
                  const prev = urlPagination.pagination[PAGINATION_QUERY_KEY.PAGE_INDEX] - 1;
                  urlPagination.handleChangePageIndex(prev);
                } else {
                  table.previousPage();
                }
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                if (totalCount && !noUrlPagination) {
                  const next = urlPagination.pagination[PAGINATION_QUERY_KEY.PAGE_INDEX] + 1;
                  urlPagination.handleChangePageIndex(next);
                } else {
                  table.nextPage();
                }
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                if (totalCount && !noUrlPagination) {
                  const last = Math.ceil(totalCount / pageSize);
                  urlPagination.handleChangePageIndex(last);
                } else {
                  table.setPageIndex(table.getPageCount() - 1);
                }
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
