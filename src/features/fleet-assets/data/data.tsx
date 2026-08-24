import { CheckCircle2, CircleOff } from 'lucide-react'

export const assetTypes = [{ label: 'Tyre', value: 'Tyre' }]

export const statuses = [
  { label: 'Active', value: 'Active', icon: CheckCircle2 },
  { label: 'Inactive', value: 'Inactive', icon: CircleOff },
]

export const brands = [
  { label: 'MRF', value: 'MRF' },
  { label: 'Apollo', value: 'Apollo' },
  { label: 'CEAT', value: 'CEAT' },
  { label: 'Bridgestone', value: 'Bridgestone' },
  { label: 'Other', value: 'Other' },
]

export const constructions = [
  { label: 'Radial', value: 'Radial' },
  { label: 'Bias', value: 'Bias' },
]

export const tubeTypes = [
  { label: 'Tubeless', value: 'Tubeless' },
  { label: 'Tube Type', value: 'Tube Type' },
]

export const sortOptions = [
  { label: 'Asset Name (A → Z)', value: 'assetName:asc' },
  { label: 'Asset Name (Z → A)', value: 'assetName:desc' },
  { label: 'Created Date (Newest)', value: 'createdAt:desc' },
  { label: 'Created Date (Oldest)', value: 'createdAt:asc' },
  { label: 'Asset Code (A → Z)', value: 'assetCode:asc' },
  { label: 'Asset Code (Z → A)', value: 'assetCode:desc' },
]
