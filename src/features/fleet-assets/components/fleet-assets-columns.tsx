import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { statuses } from '../data/data'
import { type FleetAsset } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const fleetAssetsColumns: ColumnDef<FleetAsset>[] = [
  {
    accessorKey: 'assetCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Code' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('assetCode')}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'assetName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Name' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'assetType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue('status'))
      if (!status) return null
      return (
        <Badge variant={status.value === 'Active' ? 'default' : 'secondary'}>
          {status.label}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created Date' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('createdAt') as string | undefined
      return <span>{value ? format(new Date(value), 'dd-MMM-yyyy') : '-'}</span>
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
