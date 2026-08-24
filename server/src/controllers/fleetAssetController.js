import mongoose from 'mongoose'
import FleetAsset from '../models/FleetAsset.js'
import { validateFleetAsset } from '../utils/validateFleetAsset.js'

const ALLOWED_SORT_FIELDS = ['assetCode', 'assetName', 'createdAt', 'updatedAt']

// GET /api/fleet-assets
export async function listFleetAssets(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100)
    const { search, status, brand, assetType } = req.query

    let sortField = req.query.sort || 'createdAt'
    if (!ALLOWED_SORT_FIELDS.includes(sortField)) sortField = 'createdAt'
    const sortOrder = req.query.order === 'asc' ? 1 : -1

    const query = {}
    if (status) query.status = status
    if (brand) query.brand = brand
    if (assetType) query.assetType = assetType
    if (search) {
      const regex = new RegExp(search, 'i')
      query.$or = [
        { assetCode: regex },
        { assetName: regex },
        { brand: regex },
        { model: regex },
        { 'tyreSpecifications.tyreSize': regex },
      ]
    }

    const [data, total] = await Promise.all([
      FleetAsset.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit),
      FleetAsset.countDocuments(query),
    ])

    res.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/fleet-assets/:id
export async function getFleetAsset(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid asset id.' })
    }
    const asset = await FleetAsset.findById(req.params.id)
    if (!asset) return res.status(404).json({ message: 'Fleet asset not found.' })
    res.json({ data: asset })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/fleet-assets
export async function createFleetAsset(req, res) {
  try {
    const { valid, errors } = validateFleetAsset(req.body)
    if (!valid) {
      return res.status(422).json({ message: 'Validation failed.', errors })
    }

    const existing = await FleetAsset.findOne({
      assetCode: req.body.assetCode.trim().toUpperCase(),
    })
    if (existing) {
      return res.status(409).json({
        message: 'Asset Code already exists.',
        errors: { assetCode: `Asset Code "${req.body.assetCode}" is already in use.` },
      })
    }

    const asset = await FleetAsset.create(req.body)
    res.status(201).json({ data: asset })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Asset Code already exists.',
        errors: { assetCode: 'Asset Code must be unique.' },
      })
    }
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/fleet-assets/:id
export async function updateFleetAsset(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid asset id.' })
    }

    const { valid, errors } = validateFleetAsset(req.body)
    if (!valid) {
      return res.status(422).json({ message: 'Validation failed.', errors })
    }

    const duplicate = await FleetAsset.findOne({
      assetCode: req.body.assetCode.trim().toUpperCase(),
      _id: { $ne: req.params.id },
    })
    if (duplicate) {
      return res.status(409).json({
        message: 'Asset Code already exists.',
        errors: { assetCode: `Asset Code "${req.body.assetCode}" is already in use.` },
      })
    }

    const asset = await FleetAsset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!asset) return res.status(404).json({ message: 'Fleet asset not found.' })
    res.json({ data: asset })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Asset Code already exists.',
        errors: { assetCode: 'Asset Code must be unique.' },
      })
    }
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/fleet-assets/:id
export async function deleteFleetAsset(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid asset id.' })
    }
    const asset = await FleetAsset.findByIdAndDelete(req.params.id)
    if (!asset) return res.status(404).json({ message: 'Fleet asset not found.' })
    res.json({ message: 'Fleet asset deleted successfully.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
