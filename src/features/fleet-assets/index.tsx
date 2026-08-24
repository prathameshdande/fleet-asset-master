import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { FleetAssetsDialogs } from './components/fleet-assets-dialogs'
import { FleetAssetsPrimaryButtons } from './components/fleet-assets-primary-buttons'
import { FleetAssetsProvider } from './components/fleet-assets-provider'
import { FleetAssetsTable } from './components/fleet-assets-table'

export function FleetAssets() {
  return (
    <FleetAssetsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Fleet Asset Master
            </h2>
            <p className='text-muted-foreground'>
              Manage your fleet's tyre assets — add, search, filter and track.
            </p>
          </div>
          <FleetAssetsPrimaryButtons />
        </div>
        <FleetAssetsTable />
      </Main>

      <FleetAssetsDialogs />
    </FleetAssetsProvider>
  )
}
