import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteFleetAsset } from '../api'
import { type FleetAsset } from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: FleetAsset | null
}

export function FleetAssetsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const deleteMutation = useDeleteFleetAsset()
  if (!currentRow) return null

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      destructive
      title={`Delete this asset: ${currentRow.assetCode} ?`}
      desc={
        <>
          You are about to delete the fleet asset{' '}
          <strong>{currentRow.assetCode}</strong> ({currentRow.assetName}).
          <br />
          This action cannot be undone.
        </>
      }
      confirmText='Delete'
      isLoading={deleteMutation.isPending}
      handleConfirm={() => {
        if (!currentRow._id) return
        deleteMutation.mutate(currentRow._id, {
          onSuccess: () => onOpenChange(false),
        })
      }}
    />
  )
}
