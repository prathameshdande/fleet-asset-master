const ASSET_TYPES = ['Tyre']
const STATUSES = ['Active', 'Inactive']
const CONSTRUCTIONS = ['Radial', 'Bias']
const TUBE_TYPES = ['Tubeless', 'Tube Type']

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates the incoming payload for creating/updating a Fleet Asset.
 * Returns an object: { valid: boolean, errors: { field: message } }
 */
export function validateFleetAsset(body = {}) {
  const errors = {}
  const specs = body.tyreSpecifications || {}

  if (!isNonEmptyString(body.assetCode)) {
    errors.assetCode = 'Asset Code is required.'
  }
  if (!isNonEmptyString(body.assetName)) {
    errors.assetName = 'Asset Name is required.'
  }
  if (!isNonEmptyString(body.assetType) || !ASSET_TYPES.includes(body.assetType)) {
    errors.assetType = 'Asset Type is required and must be a valid type.'
  }
  if (!isNonEmptyString(body.brand)) {
    errors.brand = 'Brand is required.'
  }
  if (!isNonEmptyString(body.model)) {
    errors.model = 'Model is required.'
  }
  if (body.status && !STATUSES.includes(body.status)) {
    errors.status = 'Status must be Active or Inactive.'
  }

  if (!isNonEmptyString(specs.tyreSize)) {
    errors['tyreSpecifications.tyreSize'] = 'Tyre Size is required.'
  }
  if (!isNonEmptyString(specs.construction) || !CONSTRUCTIONS.includes(specs.construction)) {
    errors['tyreSpecifications.construction'] =
      'Construction is required and must be Radial or Bias.'
  }
  if (!isNonEmptyString(specs.tubeType) || !TUBE_TYPES.includes(specs.tubeType)) {
    errors['tyreSpecifications.tubeType'] =
      'Tube Type is required and must be Tubeless or Tube Type.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
