import { useState } from 'react'
import { ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { brands } from '../data/data'

type FleetAssetsFilterProps = {
  status: string
  brand: string
  onApply: (values: { status: string; brand: string }) => void
}

export function FleetAssetsFilter({
  status,
  brand,
  onApply,
}: FleetAssetsFilterProps) {
  const [open, setOpen] = useState(false)
  const [draftStatus, setDraftStatus] = useState(status)
  const [draftBrand, setDraftBrand] = useState(brand)

  const isFiltered = status !== 'All' || brand !== 'All'

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (v) {
          setDraftStatus(status)
          setDraftBrand(brand)
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <ListFilter className='me-1 size-4' />
          Filter
          {isFiltered && (
            <span className='ms-1 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground'>
              •
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='start'>
        <div className='space-y-4'>
          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Asset Type</p>
            <Select value='Tyre' disabled>
              <SelectTrigger className='h-8 w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Tyre'>Tyre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Status</p>
            <Select value={draftStatus} onValueChange={setDraftStatus}>
              <SelectTrigger className='h-8 w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='Active'>Active</SelectItem>
                <SelectItem value='Inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-1.5'>
            <p className='text-sm font-medium'>Brand</p>
            <Select value={draftBrand} onValueChange={setDraftBrand}>
              <SelectTrigger className='h-8 w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end gap-2 pt-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => {
                setDraftStatus('All')
                setDraftBrand('All')
                onApply({ status: 'All', brand: 'All' })
                setOpen(false)
              }}
            >
              Clear
            </Button>
            <Button
              size='sm'
              onClick={() => {
                onApply({ status: draftStatus, brand: draftBrand })
                setOpen(false)
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
