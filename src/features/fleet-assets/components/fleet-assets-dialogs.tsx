import { FleetAssetMutateDrawer } from './fleet-asset-mutate-drawer'
import { FleetAssetViewDialog } from './fleet-asset-view-dialog'
import { FleetAssetsDeleteDialog } from './fleet-assets-delete-dialog'
import { useFleetAssetsDialogs } from './fleet-assets-provider'

export function FleetAssetsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFleetAssetsDialogs()

  const closeAndClear = () => {
    setOpen(null)
    setTimeout(() => setCurrentRow(null), 500)
  }

  return (
    <>
      <FleetAssetMutateDrawer
        key='fleet-asset-create'
        open={open === 'create'}
        onOpenChange={(v) => (v ? setOpen('create') : setOpen(null))}
      />

      {currentRow && (
        <>
          <FleetAssetMutateDrawer
            key={`fleet-asset-update-${currentRow._id}`}
            open={open === 'update'}
            onOpenChange={(v) => (v ? setOpen('update') : closeAndClear())}
            currentRow={currentRow}
          />

          <FleetAssetViewDialog
            key={`fleet-asset-view-${currentRow._id}`}
            open={open === 'view'}
            onOpenChange={(v) => (v ? setOpen('view') : closeAndClear())}
            currentRow={currentRow}
          />

          <FleetAssetsDeleteDialog
            key={`fleet-asset-delete-${currentRow._id}`}
            open={open === 'delete'}
            onOpenChange={(v) => (v ? setOpen('delete') : closeAndClear())}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
