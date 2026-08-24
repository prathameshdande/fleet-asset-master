import { z } from 'zod'

export const assetTypeEnum = z.enum(['Tyre'])
export const assetStatusEnum = z.enum(['Active', 'Inactive'])
export const constructionEnum = z.enum(['Radial', 'Bias'])
export const tubeTypeEnum = z.enum(['Tubeless', 'Tube Type'])

export const tyreSpecificationsSchema = z.object({
  tyreSize: z.string().min(1, 'Tyre size is required.'),
  construction: constructionEnum,
  pattern: z.string().optional().default(''),
  loadIndex: z.string().optional().default(''),
  speedRating: z.string().optional().default(''),
  plyRating: z.string().optional().default(''),
  tubeType: tubeTypeEnum,
})

export const fleetAssetSchema = z.object({
  _id: z.string().optional(),
  assetCode: z.string().min(1, 'Asset code is required.'),
  assetName: z.string().min(1, 'Asset name is required.'),
  assetType: assetTypeEnum,
  brand: z.string().min(1, 'Brand is required.'),
  model: z.string().min(1, 'Model is required.'),
  status: assetStatusEnum,
  description: z.string().optional().default(''),
  tyreSpecifications: tyreSpecificationsSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type FleetAsset = z.infer<typeof fleetAssetSchema>
export type TyreSpecifications = z.infer<typeof tyreSpecificationsSchema>

// Create and update endpoints require the complete asset payload, while the
// response additionally contains MongoDB and timestamp metadata.
export const fleetAssetPayloadSchema = fleetAssetSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
})

export type FleetAssetPayload = z.infer<typeof fleetAssetPayloadSchema>

// The drawer presents tyre specifications as flat fields. Reuse the domain
// enums here so form submission cannot widen backend-constrained values to
// generic strings.
export const fleetAssetFormSchema = z.object({
  assetCode: z.string().min(1, 'Asset code is required.'),
  assetName: z.string().min(1, 'Asset name is required.'),
  assetType: assetTypeEnum,
  brand: z.string().min(1, 'Brand is required.'),
  model: z.string().min(1, 'Model is required.'),
  status: assetStatusEnum,
  description: z.string(),
  tyreSize: z.string().min(1, 'Tyre size is required.'),
  construction: constructionEnum,
  pattern: z.string(),
  loadIndex: z.string(),
  speedRating: z.string(),
  plyRating: z.string(),
  tubeType: tubeTypeEnum,
})

export type FleetAssetFormValues = z.infer<typeof fleetAssetFormSchema>

export const fleetAssetListResponseSchema = z.object({
  data: z.array(fleetAssetSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export type FleetAssetListResponse = z.infer<typeof fleetAssetListResponseSchema>
