import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import {
  type FleetAsset,
  type FleetAssetListResponse,
  type FleetAssetPayload,
} from './data/schema'

export type FleetAssetListParams = {
  page: number
  limit: number
  search?: string
  status?: string
  brand?: string
  assetType?: string
  sort?: string
  order?: 'asc' | 'desc'
}

const FLEET_ASSETS_KEY = 'fleet-assets'

export function useFleetAssets(params: FleetAssetListParams) {
  return useQuery({
    queryKey: [FLEET_ASSETS_KEY, params],
    queryFn: async () => {
      const { data } = await apiClient.get<FleetAssetListResponse>(
        '/fleet-assets',
        { params }
      )
      return data
    },
    placeholderData: keepPreviousData,
  })
}

export function useFleetAsset(id?: string) {
  return useQuery({
    queryKey: [FLEET_ASSETS_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: FleetAsset }>(
        `/fleet-assets/${id}`
      )
      return data.data
    },
    enabled: !!id,
  })
}

export function useCreateFleetAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: FleetAssetPayload) => {
      const { data } = await apiClient.post<{ data: FleetAsset }>(
        '/fleet-assets',
        payload
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FLEET_ASSETS_KEY] })
      toast.success('Fleet asset created successfully.')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateFleetAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string
      payload: FleetAssetPayload
    }) => {
      const { data } = await apiClient.put<{ data: FleetAsset }>(
        `/fleet-assets/${id}`,
        payload
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FLEET_ASSETS_KEY] })
      toast.success('Fleet asset updated successfully.')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteFleetAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/fleet-assets/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FLEET_ASSETS_KEY] })
      toast.success('Fleet asset deleted successfully.')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
