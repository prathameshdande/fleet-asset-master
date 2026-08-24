import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { type FleetAsset } from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: FleetAsset | null
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className='flex items-center justify-between py-1.5 text-sm'>
      <span className='text-muted-foreground'>{label}</span>
      <span className='font-medium'>{value || '-'}</span>
    </div>
  )
}

export function FleetAssetViewDialog({ open, onOpenChange, currentRow }: Props) {
  if (!currentRow) return null
  const specs = currentRow.tyreSpecifications

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Fleet Asset</DialogTitle>
          <DialogDescription>
            {currentRow.assetCode} · {currentRow.assetName}
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h4 className='text-sm font-semibold'>Basic Information</h4>
            <Badge variant={currentRow.status === 'Active' ? 'default' : 'secondary'}>
              {currentRow.status}
            </Badge>
          </div>
          <Row label='Asset Code' value={currentRow.assetCode} />
          <Row label='Asset Type' value={currentRow.assetType} />
          <Row label='Brand' value={currentRow.brand} />
          <Row label='Model' value={currentRow.model} />
          {currentRow.description && (
            <Row label='Description' value={currentRow.description} />
          )}

          <Separator className='my-3' />

          <h4 className='mb-2 text-sm font-semibold'>Specifications</h4>
          <Row label='Tyre Size' value={specs.tyreSize} />
          <Row label='Construction' value={specs.construction} />
          <Row label='Pattern' value={specs.pattern} />
          <Row label='Load Index' value={specs.loadIndex} />
          <Row label='Speed Rating' value={specs.speedRating} />
          <Row label='Ply Rating' value={specs.plyRating} />
          <Row label='Tube Type' value={specs.tubeType} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
