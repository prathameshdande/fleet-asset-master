import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { FleetAssets } from '@/features/fleet-assets'

const fleetAssetSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  search: z.string().optional().catch(''),
  status: z.array(z.string()).optional().catch([]),
  brand: z.array(z.string()).optional().catch([]),
})

export const Route = createFileRoute('/_authenticated/fleet-assets/')({
  validateSearch: fleetAssetSearchSchema,
  component: FleetAssets,
})
