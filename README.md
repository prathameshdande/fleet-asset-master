# Fleet Asset Master

A full-stack **Fleet Asset Master module** developed using the **MERN stack** as part of a technical assignment.

The module is designed to manage **Tyre assets** and provides CRUD operations, search, filtering, sorting, server-side pagination, form validation, and detailed asset views.

The frontend is built on the **provided Shadcn Admin template** and uses its existing UI components and design system.

---

## Project Overview

The Fleet Asset Master provides a centralized interface for managing tyre assets.

### Key Features

* Fleet Asset list view
* Add Asset
* Edit Asset
* View Asset details
* Delete / Deactivate Asset
* Search
* Filtering
* Sorting
* Server-side pagination
* Frontend validation
* Backend validation
* Unique Asset Code validation
* MongoDB persistence
* Responsive Shadcn UI

---

# Technology Stack

## Frontend

The frontend uses the provided **Shadcn Admin** template.

* React 19
* TypeScript
* Vite
* Shadcn UI
* Radix UI
* Tailwind CSS
* TanStack Router
* TanStack React Table
* React Hook Form
* Zod
* Axios
* Lucide React
* Zustand
* Sonner

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Package Manager

The provided frontend template uses:

```text
pnpm
```

---

# Fleet Asset Master

The module is implemented for the following asset type:

```text
Asset Type: Tyre
```

---

## Asset List

The list view displays the following fields:

| Field        | Description                        |
| ------------ | ---------------------------------- |
| Asset Code   | Unique asset identifier            |
| Asset Name   | Tyre name / size                   |
| Type         | Asset type                         |
| Brand        | Tyre manufacturer                  |
| Model        | Tyre model                         |
| Status       | Active / Inactive                  |
| Created Date | Asset creation date                |
| Action       | View / Edit / Delete or Deactivate |

### Sample Records

```text
TYR-001 | 295/80 R22.5 | Tyre | MRF    | Steel Muscle | Active | 24-Aug-2026
TYR-002 | 315/80 R22.5 | Tyre | Apollo | EnduRace     | Active | 24-Aug-2026
```

---

# Search

The Fleet Asset list supports searching by relevant asset information, including:

* Asset Code
* Asset Name
* Brand
* Model

Search is processed through the backend API.

The frontend sends the search term to the backend rather than loading the complete dataset into the browser.

---

# Filtering

The Fleet Asset list supports the following filters.

## Asset Type

```text
All
Tyre
```

## Status

```text
All
Active
Inactive
```

## Brand

```text
All
MRF
Apollo
CEAT
Bridgestone
Other
```

The filter interface provides:

```text
[ Clear ] [ Apply ]
```

---

# Sorting

The list supports sorting by:

## Asset Name

```text
A → Z
Z → A
```

## Created Date

```text
Newest
Oldest
```

## Asset Code

```text
A → Z
Z → A
```

Sorting is handled through the backend API.

---

# Pagination

The Fleet Asset list uses **server-side pagination**.

Example:

```http
GET /api/fleet-assets?page=1&limit=10
```

This approach avoids loading the complete asset dataset into the browser.

---

# Add / Edit Asset

The Fleet Asset form contains two sections.

## Basic Information

| Field       | Type            | Required |
| ----------- | --------------- | -------- |
| Asset Code  | Text            | Yes      |
| Asset Name  | Text            | Yes      |
| Asset Type  | Dropdown        | Yes      |
| Brand       | Dropdown / Text | Yes      |
| Model       | Text            | Yes      |
| Status      | Dropdown        | Yes      |
| Description | Textarea        | No       |

## Tyre Specifications

| Field        | Type            | Required |
| ------------ | --------------- | -------- |
| Tyre Size    | Dropdown / Text | Yes      |
| Construction | Dropdown        | Yes      |
| Pattern      | Text            | No       |
| Load Index   | Text            | No       |
| Speed Rating | Text            | No       |
| Ply Rating   | Text            | No       |
| Tube Type    | Dropdown        | Yes      |

---

# View Asset

The View Asset interface displays detailed information for the selected asset.

## Basic Information

```text
Asset Code
Asset Type
Brand
Model
Status
```

## Tyre Specifications

```text
Tyre Size
Construction
Pattern
Load Index
Speed Rating
Ply Rating
Tube Type
```

---

# Validation

Validation is implemented on both the frontend and backend.

## Required Fields

The following fields are required:

```text
Asset Code
Asset Name
Asset Type
Brand
Model
Tyre Size
Construction
Tube Type
```

## Unique Asset Code

The Asset Code must be unique.

For example:

```text
TYR-001
```

If another asset with the same Asset Code is submitted:

```text
TYR-001
```

the backend rejects the request and returns an appropriate validation error.

---

# MongoDB Schema

The Fleet Asset document follows this structure:

```text
FleetAsset
│
├── assetCode
├── assetName
├── assetType
├── brand
├── model
├── status
├── description
│
└── tyreSpecifications
    ├── tyreSize
    ├── construction
    ├── pattern
    ├── loadIndex
    ├── speedRating
    ├── plyRating
    └── tubeType
```

The document also maintains:

```text
createdAt
updatedAt
```

using Mongoose timestamps.

---

# REST API

Base endpoint:

```text
/api/fleet-assets
```

## Create Asset

```http
POST /api/fleet-assets
```

Creates a new Fleet Asset.

---

## Get Assets

```http
GET /api/fleet-assets
```

Supports:

* Search
* Filtering
* Sorting
* Pagination

### Example

```http
GET /api/fleet-assets?page=1&limit=10&search=MRF&status=Active&brand=MRF&sort=createdAt&order=desc
```

### Query Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| `page`    | Page number                |
| `limit`   | Number of records per page |
| `search`  | Search keyword             |
| `status`  | Active / Inactive          |
| `brand`   | Brand filter               |
| `sort`    | Sorting field              |
| `order`   | `asc` or `desc`            |

---

## Get Single Asset

```http
GET /api/fleet-assets/:id
```

Returns a single Fleet Asset with its complete details.

---

## Update Asset

```http
PUT /api/fleet-assets/:id
```

Updates an existing Fleet Asset.

---

## Delete / Deactivate Asset

```http
DELETE /api/fleet-assets/:id
```

Deletes or deactivates the selected Fleet Asset according to the implemented application behavior.

---

# Project Structure

The frontend follows the architecture of the provided Shadcn Admin template.

```text
fleet-asset-master/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── fleet-assets/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── users/
│   │
│   ├── routes/
│   │   ├── fleet-assets/
│   │   ├── apps/
│   │   ├── chats/
│   │   ├── errors/
│   │   ├── help-center/
│   │   ├── settings/
│   │   ├── tasks/
│   │   └── users/
│   │
│   ├── stores/
│   ├── styles/
│   ├── hooks/
│   ├── lib/
│   └── main.tsx
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── public/
│
├── components.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

> The Fleet Asset functionality is added to the existing Shadcn Admin architecture. The exact internal files may vary depending on the final implementation.

---

# Shadcn UI

The provided **Shadcn Admin template** is used as the frontend foundation.

The implementation reuses the existing design system and components rather than introducing another UI framework.

Components used for the Fleet Asset module include:

* Table
* Button
* Input
* Select
* Dialog
* Sheet
* Dropdown Menu
* Badge
* Form
* Toast
* Pagination
* Tabs

---

# Environment Variables

## Frontend

The provided template contains an `.env.example` with the following environment variable:

```env
VITE_CLERK_PUBLISHABLE_KEY=
```

For the Fleet Asset API, add the backend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Therefore, the local frontend `.env` can contain:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

If Clerk is not used by the Fleet Asset module, only configure the variables required by the final application.

---

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never commit the actual `.env` file or credentials to GitHub.

Commit only:

```text
.env.example
```

---

# Prerequisites

Install the following before running the project:

* Node.js
* pnpm
* MongoDB or MongoDB Atlas
* Git

---

# Installation

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd fleet-asset-master
```

---

## 2. Install Frontend Dependencies

The provided Shadcn Admin template uses pnpm.

```bash
pnpm install
```

---

## 3. Configure Frontend Environment

Create a `.env` file in the project root.

Example:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Install Backend Dependencies

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

or, if the backend is configured to use pnpm:

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
```

---

## 5. Configure MongoDB

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 6. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

---

## 7. Start the Frontend

Open a new terminal and return to the project root:

```bash
cd ..
```

Start the Vite development server:

```bash
pnpm run dev
```

The terminal will display the local frontend URL.

Typically:

```text
http://localhost:5173
```

---

# Production Build

The provided frontend template uses the following build command:

```bash
pnpm run build
```

The build process runs TypeScript compilation followed by the Vite production build.

To preview the production build:

```bash
pnpm run preview
```

---

# Application Flow

```text
Fleet Asset Master
        │
        ▼
     List View
        │
        ├── Search
        ├── Filter
        ├── Sort
        └── Pagination
        │
        ▼
   + Add Asset
        │
        ▼
 Fleet Asset Form
        │
        ▼
Frontend Validation
        │
        ▼
    REST API
        │
        ▼
     MongoDB
        │
        ▼
    List Updated
```

---

# Edit Flow

```text
List
  │
  ▼
Edit Asset
  │
  ▼
Edit Form
  │
  ▼
Validation
  │
  ▼
PUT /api/fleet-assets/:id
  │
  ▼
MongoDB
  │
  ▼
Updated Asset
```

---

# View Flow

```text
Fleet Asset List
       │
       ▼
Select Asset
       │
       ▼
View Asset
       │
       ▼
Basic Information
       │
       ▼
Tyre Specifications
```

---

# Delete / Deactivate Flow

```text
Fleet Asset List
       │
       ▼
Action Menu
       │
       ▼
Delete / Deactivate
       │
       ▼
DELETE /api/fleet-assets/:id
       │
       ▼
MongoDB
       │
       ▼
Updated List
```

---

# Sample Asset

```json
{
  "assetCode": "TYR-001",
  "assetName": "295/80 R22.5",
  "assetType": "Tyre",
  "brand": "MRF",
  "model": "Steel Muscle",
  "status": "Active",
  "description": "Heavy-duty truck tyre",
  "tyreSpecifications": {
    "tyreSize": "295/80 R22.5",
    "construction": "Radial",
    "pattern": "Steel Muscle",
    "loadIndex": "152",
    "speedRating": "M",
    "plyRating": "18 PR",
    "tubeType": "Tubeless"
  }
}
```

---

# Testing Checklist

Before submitting the assignment, verify:

* [ ] Fleet Asset list loads correctly
* [ ] Add Asset works
* [ ] Required field validation works
* [ ] Duplicate Asset Code validation works
* [ ] Edit Asset works
* [ ] View Asset works
* [ ] Delete / Deactivate works
* [ ] Search works
* [ ] Asset Type filter works
* [ ] Status filter works
* [ ] Brand filter works
* [ ] Asset Name sorting works
* [ ] Created Date sorting works
* [ ] Asset Code sorting works
* [ ] Pagination works
* [ ] Frontend validation works
* [ ] Backend validation works
* [ ] MongoDB persistence works
* [ ] Data remains after page refresh
* [ ] API error handling works
* [ ] Responsive UI works

---

# Development Approach

The implementation follows these principles:

* Use the provided Shadcn Admin template
* Reuse existing Shadcn UI components
* Maintain the existing project architecture
* Build reusable Fleet Asset components
* Separate API communication from UI components
* Use RESTful APIs
* Handle pagination on the backend
* Handle search on the backend
* Handle filtering on the backend
* Handle sorting on the backend
* Validate data on both frontend and backend
* Enforce unique Asset Codes
* Persist data in MongoDB
* Avoid hardcoded asset data
* Use meaningful variable and function names
* Keep the implementation focused on the assignment requirements

---

# Assignment Requirements Covered

| Requirement         | Status      |
| ------------------- | ----------- |
| Fleet Asset List    | Implemented |
| Add Asset           | Implemented |
| Edit Asset          | Implemented |
| View Asset          | Implemented |
| Delete / Deactivate | Implemented |
| Search              | Implemented |
| Filter              | Implemented |
| Sort                | Implemented |
| Pagination          | Implemented |
| Frontend Validation | Implemented |
| Backend Validation  | Implemented |
| Unique Asset Code   | Implemented |
| MongoDB Integration | Implemented |
| REST APIs           | Implemented |
| Shadcn UI           | Implemented |
| `.env.example`      | Included    |
| README              | Included    |

---

# Assignment Scope

This project implements the requested **Fleet Asset Master for Tyre assets**.

The implementation focuses on the requirements provided in the assignment and does not introduce unrelated Fleet Management modules.

The provided Shadcn Admin template is used as the frontend foundation, with the Fleet Asset functionality integrated into its existing architecture.

---

# Submission

The repository contains:

### Frontend

* Fleet Asset Master list
* Add Asset form
* Edit Asset form
* View Asset details
* Search
* Filter
* Sort
* Pagination
* Form validation
* Shadcn UI implementation

### Backend

* Node.js + Express REST API
* MongoDB / Mongoose model
* CRUD APIs
* Search
* Filtering
* Sorting
* Pagination
* Backend validation
* Unique Asset Code validation

### Documentation

* README
* `.env.example`
* Setup instructions
* API documentation
* Testing checklist

---

# Author

**Prathamesh Kailas Dande**

MCA Graduate | Full Stack Developer

GitHub: https://github.com/prathameshdande

Portfolio: https://winfirst-portfolio.vercel.app/

---

# License

This project was developed as part of a technical assignment using the provided Shadcn Admin template.

The Fleet Asset Master functionality was implemented specifically for the assignment requirements.
