import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { useTableUrlState } from '@/hooks/use-table-url-state'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table'
import { type FleetAssetListParams, useFleetAssets } from '../api'
import { sortOptions } from '../data/data'
import { type FleetAsset } from '../data/schema'
import { fleetAssetsColumns as columns } from './fleet-assets-columns'
import { FleetAssetsFilter } from './fleet-assets-filter'

const route = getRouteApi('/_authenticated/fleet-assets/')

export function FleetAssetsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [sortValue, setSortValue] = useState('createdAt:desc')

  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: true, key: 'search' },
    columnFilters: [
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'brand', searchKey: 'brand', type: 'array' },
    ],
  })

  const statusFilter = columnFilters.find((f) => f.id === 'status')
    ?.value as string[] | undefined
  const brandFilter = columnFilters.find((f) => f.id === 'brand')
    ?.value as string[] | undefined

  const [sortField, sortOrder] = sortValue.split(':') as [
    string,
    'asc' | 'desc',
  ]

  const queryParams: FleetAssetListParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: globalFilter || undefined,
    status: statusFilter?.[0],
    brand: brandFilter?.[0],
    sort: sortField,
    order: sortOrder,
  }

  const { data, isLoading, isError, error } = useFleetAssets(queryParams)
  const assets: FleetAsset[] = data?.data ?? []
  const pageCount = data?.totalPages ?? 0

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: assets,
    columns,
    state: { sorting, columnFilters, globalFilter, pagination },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    pageCount,
    onSortingChange: setSorting,
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    ensurePageInRange(pageCount)
  }, [pageCount, ensurePageInRange])

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-1 items-center gap-2'>
          <Input
            placeholder='Search by asset code, name, brand...'
            value={globalFilter ?? ''}
            onChange={(e) => onGlobalFilterChange?.(e.target.value)}
            className='h-8 w-56 lg:w-72'
          />
          <FleetAssetsFilter
            status={statusFilter?.[0] ?? 'All'}
            brand={brandFilter?.[0] ?? 'All'}
            onApply={(next) => {
              onColumnFiltersChange([
                { id: 'status', value: next.status === 'All' ? [] : [next.status] },
                { id: 'brand', value: next.brand === 'All' ? [] : [next.brand] },
              ])
            }}
          />
        </div>
        <select
          className='h-8 rounded-md border bg-background px-2 text-sm'
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className='overflow-hidden rounded-md border'>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Loading assets...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-destructive'
                >
                  {error?.message ?? 'Failed to load fleet assets.'}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original._id ?? row.id}
                  className={cn('cursor-default')}
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
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
    </div>
  )
}
