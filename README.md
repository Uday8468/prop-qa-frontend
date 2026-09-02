# PropPlus QA Shared Frontend

The supplied QA HTML is kept as the UI. Results and notes are stored in Postgres through the backend.

## Local
1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE` to the backend URL.
3. `npm install && npm run dev`

Everyone using the same URL shares the `default` board. Optional separate boards use `?board=team-a`.

## Vercel
Deploy this `frontend` folder as a Vercel project and set `VITE_API_BASE` to your backend Vercel URL.
