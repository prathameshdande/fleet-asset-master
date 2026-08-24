import mongoose from 'mongoose'

const { Schema } = mongoose

const tyreSpecificationsSchema = new Schema(
  {
    tyreSize: { type: String, required: true, trim: true },
    construction: {
      type: String,
      required: true,
      enum: ['Radial', 'Bias'],
    },
    pattern: { type: String, trim: true, default: '' },
    loadIndex: { type: String, trim: true, default: '' },
    speedRating: { type: String, trim: true, default: '' },
    plyRating: { type: String, trim: true, default: '' },
    tubeType: {
      type: String,
      required: true,
      enum: ['Tubeless', 'Tube Type'],
    },
  },
  { _id: false }
)

const fleetAssetSchema = new Schema(
  {
    assetCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    assetName: { type: String, required: true, trim: true },
    assetType: {
      type: String,
      required: true,
      enum: ['Tyre'],
      default: 'Tyre',
    },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    description: { type: String, trim: true, default: '' },
    tyreSpecifications: {
      type: tyreSpecificationsSchema,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
)

fleetAssetSchema.index({ assetName: 'text', brand: 'text', model: 'text' })

export default mongoose.model('FleetAsset', fleetAssetSchema)
