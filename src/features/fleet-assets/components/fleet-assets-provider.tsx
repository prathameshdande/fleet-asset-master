import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type FleetAsset } from '../data/schema'

type FleetAssetsDialogType = 'create' | 'update' | 'view' | 'delete'

type FleetAssetsContextType = {
  open: FleetAssetsDialogType | null
  setOpen: (str: FleetAssetsDialogType | null) => void
  currentRow: FleetAsset | null
  setCurrentRow: React.Dispatch<React.SetStateAction<FleetAsset | null>>
}

const FleetAssetsContext = React.createContext<FleetAssetsContextType | null>(
  null
)

export function FleetAssetsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<FleetAssetsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<FleetAsset | null>(null)

  return (
    <FleetAssetsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </FleetAssetsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFleetAssetsDialogs = () => {
  const ctx = React.useContext(FleetAssetsContext)
  if (!ctx) {
    throw new Error(
      'useFleetAssetsDialogs has to be used within <FleetAssetsProvider>'
    )
  }
  return ctx
}
