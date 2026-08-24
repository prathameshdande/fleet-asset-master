# Fleet Asset Master — Backend (Node.js + Express + MongoDB)

REST API powering the Fleet Asset Master (Tyre) module.

## Setup

```bash
cd server
cp .env.example .env   # then edit MONGODB_URI if needed
npm install
npm run seed            # optional: inserts TYR-001 and TYR-002 sample records
npm run dev              # starts on http://localhost:5000 (nodemon)
# or
npm start
```

## Environment variables (`.env`)

| Variable       | Description                              | Default                                        |
| -------------- | ----------------------------------------- | ----------------------------------------------- |
| `PORT`         | Port the API listens on                   | `5000`                                          |
| `MONGODB_URI`  | MongoDB connection string                 | `mongodb://127.0.0.1:27017/fleet_asset_master` |
| `CLIENT_ORIGIN`| Allowed CORS origin (the frontend URL)    | `http://localhost:5173`                        |

## API

Base path: `/api/fleet-assets`

| Method | Path                  | Description                                             |
| ------ | --------------------- | --------------------------------------------------------- |
| GET    | `/api/fleet-assets`   | List assets. Query: `page`, `limit`, `search`, `status`, `brand`, `assetType`, `sort` (`assetCode`\|`assetName`\|`createdAt`\|`updatedAt`), `order` (`asc`\|`desc`) |
| GET    | `/api/fleet-assets/:id` | Get one asset                                            |
| POST   | `/api/fleet-assets`   | Create asset (validated, `assetCode` must be unique)      |
| PUT    | `/api/fleet-assets/:id` | Update asset (validated, `assetCode` uniqueness re-checked) |
| DELETE | `/api/fleet-assets/:id` | Delete asset                                             |

Search/filter/sort/pagination are all applied on the backend via MongoDB queries — the full dataset is never loaded into the browser.

### Sample request

```bash
curl -X POST http://localhost:5000/api/fleet-assets \
  -H "Content-Type: application/json" \
  -d '{
    "assetCode": "TYR-003",
    "assetName": "265/70 R19.5",
    "assetType": "Tyre",
    "brand": "CEAT",
    "model": "MileXMile",
    "status": "Active",
    "tyreSpecifications": {
      "tyreSize": "265/70 R19.5",
      "construction": "Radial",
      "tubeType": "Tubeless"
    }
  }'
```

### Validation

- Required: `assetCode`, `assetName`, `assetType`, `brand`, `model`, `tyreSpecifications.tyreSize`, `tyreSpecifications.construction`, `tyreSpecifications.tubeType`
- `assetCode` is unique (both at the Mongo schema level via a unique index, and re-checked explicitly to return a friendly `409` with a field-level error)
- Failed validation returns `422` with `{ message, errors: { field: message } }`
- Duplicate `assetCode` returns `409` with `{ message, errors: { assetCode } }`

## Folder structure

```
server/
├── src/
│   ├── config/db.js                  # MongoDB connection
│   ├── models/FleetAsset.js          # Mongoose schema (with tyreSpecifications subdocument)
│   ├── controllers/fleetAssetController.js
│   ├── routes/fleetAssetRoutes.js
│   ├── utils/validateFleetAsset.js   # request validation
│   ├── utils/seed.js                 # sample data seeder
│   └── index.js                      # app entrypoint
├── .env.example
└── package.json
```
