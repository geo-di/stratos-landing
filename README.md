# Stratos Market Lesvos

## Project info

A Vite + React + TypeScript site for Stratos Market in Lesvos, Greece, styled with shadcn-ui and Tailwind CSS.

## Getting started

Requires Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment variables

The gallery and reviews sections call two Vercel serverless functions in `/api`, which need these environment variables (never exposed to the browser):

- `GOOGLE_DRIVE_API_KEY` - used by `api/fetch-drive-images.ts` to list images from a public Google Drive folder.
- `GOOGLE_PLACES_API_KEY` - used by `api/google-reviews.ts` to fetch Google reviews and opening hours.

Copy `.env.example` to `.env` and fill in the values for local development.

**Important:** `npm run dev` (plain Vite) does not execute anything under `/api` — the gallery and reviews calls will fail on `localhost` with that command, since Vite only serves the frontend. To test the `/api` routes locally, use the Vercel CLI instead:

```sh
npm i -g vercel      # one-time install
vercel login         # one-time auth (opens a browser)
vercel link          # one-time: link this folder to the Vercel project
npm run dev:vercel   # runs `vercel dev`, serving both the frontend and /api routes
```

`vercel dev` reads `GOOGLE_DRIVE_API_KEY` / `GOOGLE_PLACES_API_KEY` from your local `.env` automatically. Once linked, plain `npm run dev` still works for UI-only changes, but switch to `npm run dev:vercel` whenever you need real Drive images or reviews data locally.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Vercel Serverless Functions

## Deployment

This project is deployed on [Vercel](https://vercel.com), building from the `main` branch. Set `GOOGLE_DRIVE_API_KEY` and `GOOGLE_PLACES_API_KEY` in the Vercel project's Environment Variables settings.
