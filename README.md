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

Copy `.env.example` to `.env` and fill in the values for local development. When developing locally, run `vercel dev` (via the Vercel CLI) instead of `vite dev` if you need the `/api` routes to work, since plain `vite dev` does not execute serverless functions.

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
