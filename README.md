# CV Builder — Frontend

Frontend for the CV Builder application. This project is a React single-page app (created with `react-scripts`) that allows users to create, preview, and export CVs using several templates.

**Repository:** `Neosoft_CV_Builder_Frontend`

## Overview

The frontend provides:
- A multi-step CV editor with sections for personal details, education, experience, projects, skills, and social links.
- Live preview of selected templates.
- Export to PDF functionality.
- Authentication UI (login / register / social auth) and integration with a backend API.

## Tech Stack

- React (`react`, `react-dom`)
- React Router (`react-router-dom`)
- State & forms: `react-hook-form`, `formik`, `yup`
- UI: `bootstrap`, `react-bootstrap`
- PDF & screenshot: `jspdf`, `html2canvas`, `@react-pdf/renderer`
- HTTP client: `axios`
- Auth helpers: `js-cookie`, `jwt-decode`

## Prerequisites

- Node.js (v16+ recommended)
- npm (bundled) or `yarn`

## Project Structure (important files)

- `public/` — static HTML, manifest and public assets
- `src/` — application source
  - `components/` — React components grouped by feature
  - `context/` — React Context providers (e.g., `AuthContext.jsx`)
  - `hooks/` — custom hooks (`useAuth.js`, `useForm.js`)
  - `services/` — API wrappers (`api.js`, `authService.js`, `cvService.js`)
  - `utils/` — helpers and constants
  - `index.js` — app entry

## Scripts

The project uses the scripts defined in `package.json`:

- **Start (development):** `npm start` — runs the app in development mode using `react-scripts start`.
- **Build (production):** `npm run build` — creates an optimized production build in the `build/` folder.
- **Test:** `npm test` — runs the test runner.
- **Eject:** `npm run eject` — ejects from `create-react-app` tooling (one-way).
- **Deploy (GitHub Pages):** `npm run predeploy` then `npm run deploy` — deploys `build/` to GitHub Pages (uses `gh-pages` dev dependency). The repo `homepage` is set to `https://Prafullahire.github.io/Neosoft_CV_Builder_Frontend`.

Use these commands:

```bash
# Install
npm install

# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages (if configured)
npm run deploy
```

## Environment / Configuration

This frontend is mostly static but may require a few environment variables for API endpoints or keys. Create a `.env` file in the project root as needed. Example:

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

Notes:
- Prefix variables with `REACT_APP_` to make them available in the React app.

## Connecting to Backend

- The frontend expects a REST API backend for authentication and CV storage. Update `src/services/api.js` to point to your backend base URL (or use `REACT_APP_API_URL`).
- Protected routes use JWT stored in cookies (`js-cookie`) and include the token in `Authorization` headers.

## PDF & Export

- The project includes client-side PDF export using `html2canvas` + `jspdf` and server-side PDF generation helpers (`@react-pdf/renderer`) may also be supported by the backend.

## Deploying

- For static hosting serve the `build/` folder (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.).
- When deploying to production, set `REACT_APP_API_URL` to your backend URL and configure CORS on the backend.

## Tests

- Add unit tests under `src/` using the existing testing libraries (`@testing-library/react`, `jest`).

## Contributing

- Fork, create a feature branch, add tests, and open a pull request.

## Troubleshooting

- If the dev server fails to start: ensure no other process is using port 3000 and that Node and npm are installed.
- If API requests fail: check `REACT_APP_API_URL` and CORS settings on the backend.

## License

Add your license information here (e.g., MIT).

---

If you want, I can:
- Generate a `README_frontend.md` instead of replacing this file.
- Add a `PUBLIC_URL` or `.env.example` file.
- Extract API endpoints automatically by scanning `src/services` and add a short API section.

Tell me which of these you'd like next.
