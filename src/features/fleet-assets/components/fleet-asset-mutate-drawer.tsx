import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type DefaultValues, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCreateFleetAsset, useUpdateFleetAsset } from '../api'
import { assetTypes, brands, constructions, tubeTypes } from '../data/data'
import {
  fleetAssetFormSchema,
  type FleetAsset,
  type FleetAssetFormValues,
  type FleetAssetPayload,
} from '../data/schema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: FleetAsset | null
}

const emptyValues: DefaultValues<FleetAssetFormValues> = {
  assetCode: '',
  assetName: '',
  assetType: 'Tyre',
  brand: '',
  model: '',
  status: 'Active',
  description: '',
  tyreSize: '',
  construction: undefined,
  pattern: '',
  loadIndex: '',
  speedRating: '',
  plyRating: '',
  tubeType: undefined,
}

function toFormValues(
  row?: FleetAsset | null
): DefaultValues<FleetAssetFormValues> {
  if (!row) return emptyValues
  return {
    assetCode: row.assetCode,
    assetName: row.assetName,
    assetType: row.assetType,
    brand: row.brand,
    model: row.model,
    status: row.status,
    description: row.description ?? '',
    tyreSize: row.tyreSpecifications.tyreSize,
    construction: row.tyreSpecifications.construction,
    pattern: row.tyreSpecifications.pattern ?? '',
    loadIndex: row.tyreSpecifications.loadIndex ?? '',
    speedRating: row.tyreSpecifications.speedRating ?? '',
    plyRating: row.tyreSpecifications.plyRating ?? '',
    tubeType: row.tyreSpecifications.tubeType,
  }
}

export function FleetAssetMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const createMutation = useCreateFleetAsset()
  const updateMutation = useUpdateFleetAsset()
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const form = useForm<FleetAssetFormValues>({
    resolver: zodResolver(fleetAssetFormSchema),
    defaultValues: toFormValues(currentRow),
  })

  useEffect(() => {
    form.reset(toFormValues(currentRow))
  }, [currentRow, form])

  const onSubmit = (values: FleetAssetFormValues) => {
    const payload: FleetAssetPayload = {
      assetCode: values.assetCode,
      assetName: values.assetName,
      assetType: values.assetType,
      brand: values.brand,
      model: values.model,
      status: values.status,
      description: values.description,
      tyreSpecifications: {
        tyreSize: values.tyreSize,
        construction: values.construction,
        pattern: values.pattern,
        loadIndex: values.loadIndex,
        speedRating: values.speedRating,
        plyRating: values.plyRating,
        tubeType: values.tubeType,
      },
    }

    if (isUpdate && currentRow?._id) {
      updateMutation.mutate(
        { id: currentRow._id, payload },
        { onSuccess: () => onOpenChange(false) }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset(emptyValues)
        },
      })
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) form.reset(emptyValues)
      }}
    >
      <SheetContent className='flex w-full flex-col sm:max-w-lg'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? 'Edit' : 'Add'} Fleet Asset</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the tyre asset details below.'
              : 'Fill in the details to add a new tyre asset.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='fleet-asset-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 overflow-y-auto px-4'
          >
            <Tabs defaultValue='basic' className='w-full'>
              <TabsList className='w-full'>
                <TabsTrigger value='basic'>Basic Information</TabsTrigger>
                <TabsTrigger value='specs'>Tyre Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value='basic' className='space-y-4 pt-4'>
                <FormField
                  control={form.control}
                  name='assetCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='TYR-001' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='assetName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='295/80 R22.5' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='assetType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select asset type'
                        items={assetTypes}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select brand'
                        items={brands}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='model'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Steel Muscle' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select status'
                        items={[
                          { label: 'Active', value: 'Active' },
                          { label: 'Inactive', value: 'Inactive' },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder='Optional notes' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='specs' className='space-y-4 pt-4'>
                <FormField
                  control={form.control}
                  name='tyreSize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tyre Size</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='295/80 R22.5' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='construction'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Construction</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select construction'
                        items={constructions}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='pattern'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pattern</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Steel Muscle' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='loadIndex'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Load Index</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='152' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='speedRating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speed Rating</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='M' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='plyRating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ply Rating</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='18 PR' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tubeType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tube Type</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select tube type'
                        items={tubeTypes}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='fleet-asset-form' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
