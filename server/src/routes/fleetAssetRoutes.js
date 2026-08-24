import { Router } from 'express'
import {
  listFleetAssets,
  getFleetAsset,
  createFleetAsset,
  updateFleetAsset,
  deleteFleetAsset,
} from '../controllers/fleetAssetController.js'

const router = Router()

router.get('/', listFleetAssets)
router.post('/', createFleetAsset)
router.get('/:id', getFleetAsset)
router.put('/:id', updateFleetAsset)
router.delete('/:id', deleteFleetAsset)

export default router
