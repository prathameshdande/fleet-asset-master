# Deploying Fleet Asset Master (Vercel + Render)

This project is a monorepo:
- Frontend (Vite + React + TanStack Router) lives at the repo root of this folder.
- Backend (Express + Mongoose API) lives in `server/`.

Deploy the frontend on **Vercel** and the backend on **Render**.

## 1. Backend on Render

1. Push this project to GitHub.
2. In Render, click **New > Web Service** and connect the repo.
3. Set:
   - **Root Directory**: `server` (if this folder is your repo root) — otherwise the full path to it, e.g. `fleet-asset-master-mern/shadcn-admin-main/server`.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
4. Add environment variables:
   - `MONGODB_URI` — your MongoDB Atlas connection string.
   - `CLIENT_ORIGIN` — your Vercel frontend URL(s), comma-separated if more than one (e.g. `https://your-app.vercel.app`). Add this after step 2 below once you know the Vercel URL, then redeploy.
5. Deploy. Confirm `https://<your-render-service>.onrender.com/api/health` returns `{"status":"ok"}`.

A `render.yaml` blueprint is included; you can also use **New > Blueprint** and point it at this repo instead of the manual steps above (adjust `rootDir` in `render.yaml` if your repo root differs).

## 2. Frontend on Vercel

1. In Vercel, click **New Project** and import the same repo.
2. Set **Root Directory** to this folder (`shadcn-admin-main`, or the full path if nested).
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` — already set in `vercel.json`.
4. Add environment variables (Project Settings > Environment Variables):
   - `VITE_API_URL` — `https://<your-render-service>.onrender.com/api`
   - `VITE_CLERK_PUBLISHABLE_KEY` — only if you use the Clerk-based routes.
5. Deploy. `vercel.json` includes a SPA rewrite so client-side routes (TanStack Router) don't 404 on refresh.

## 3. Wire them together

Once you have both URLs:
- Set `CLIENT_ORIGIN` on Render to your Vercel URL and redeploy the backend.
- Set `VITE_API_URL` on Vercel to your Render URL + `/api` and redeploy the frontend.

## Notes / fixes applied for deployment

- Removed a stray literal folder in `server/src` left over from an unexpanded `mkdir -p src/{a,b,c}` command.
- `server/src/index.js` CORS now accepts a comma-separated `CLIENT_ORIGIN` list instead of a single hardcoded origin, so local dev + production can both work.
- Added `engines` to both `package.json` files (frontend needs Node 20.19+/22.12+ for Vite 8; backend Node 18.18+) so Render/Vercel provision a compatible Node version.
- Added `vercel.json` (build/output config + SPA rewrite) and `render.yaml` (backend blueprint).
- Added `server/.gitignore` so `node_modules`/`.env` aren't committed.

## Local verification

I don't have outbound network access in this sandbox, so I couldn't run `npm install` / `npm run build` here to prove a green build end-to-end. Before deploying, run locally:

```bash
# frontend
npm install
npm run build

# backend
cd server
npm install
npm start
```

If `npm run build` throws TypeScript errors (the frontend build runs `tsc -b` with strict mode), share the exact error output and I'll fix it directly.
