import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import FleetAsset from '../models/FleetAsset.js'

const sampleAssets = [
  {
    assetCode: 'TYR-001',
    assetName: '295/80 R22.5',
    assetType: 'Tyre',
    brand: 'MRF',
    model: 'Steel Muscle',
    status: 'Active',
    description: '',
    tyreSpecifications: {
      tyreSize: '295/80 R22.5',
      construction: 'Radial',
      pattern: 'Steel Muscle',
      loadIndex: '152',
      speedRating: 'M',
      plyRating: '18 PR',
      tubeType: 'Tubeless',
    },
  },
  {
    assetCode: 'TYR-002',
    assetName: '315/80 R22.5',
    assetType: 'Tyre',
    brand: 'Apollo',
    model: 'EnduRace',
    status: 'Active',
    description: '',
    tyreSpecifications: {
      tyreSize: '315/80 R22.5',
      construction: 'Radial',
      pattern: 'EnduRace',
      loadIndex: '154',
      speedRating: 'L',
      plyRating: '20 PR',
      tubeType: 'Tubeless',
    },
  },
]

async function seed() {
  await connectDB()
  await FleetAsset.deleteMany({})
  await FleetAsset.insertMany(sampleAssets)
  console.log(`Seeded ${sampleAssets.length} fleet assets.`)
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
