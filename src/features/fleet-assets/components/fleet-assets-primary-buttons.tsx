import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFleetAssetsDialogs } from './fleet-assets-provider'

export function FleetAssetsPrimaryButtons() {
  const { setOpen } = useFleetAssetsDialogs()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Add Asset</span> <Plus size={18} />
      </Button>
    </div>
  )
}
