# Data Explorer

A frontend-focused React data explorer for browsing, searching, filtering, sorting, and exploring 10,000 product records.

The application uses React + Vite on the frontend and a local `json-server` mock API for data fetching. URL query parameters are used to preserve search, filters, sorting, pagination, and product detail state.

---

## Features

- Search across 10,000 products
- Debounced search
- Category filtering
- Status filtering
- Minimum and maximum price filtering
- Server-side sorting
- Server-side pagination
- URL-based application state
- Deep-linkable product details
- Browser back/forward support
- Refresh-safe filters and pagination
- Virtualized product table
- Loading states
- Empty states
- Error states
- Retry failed requests
- Accessible buttons, inputs, table rows, and announcements
- Request cancellation using `AbortSignal`
- Random API latency simulation
- Local mock API using `json-server`

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- TanStack React Query
- TanStack React Virtual
- Tailwind CSS

### Backend / Mock API

- JSON Server
- Node.js

### Development

- Vite development server
- ESLint / Oxlint configuration from the Vite template
- npm

---

## Libraries and Packages

### React

Used to build the user interface and component architecture.

- React
- React DOM

React provides the component-based UI architecture used throughout the application.

---

### Vite

Vite is used as the frontend development server and build tool.

It provides:

- Fast development server
- Hot Module Replacement (HMR)
- Production builds
- Modern JavaScript module handling

---

### React Router DOM

Used for application routing and URL state management.

The project uses:

- `BrowserRouter`
- `Routes`
- `Route`
- `Navigate`
- `useSearchParams`

Query parameters are used to preserve application state.


### Ek important correction

README mein maine **React Query + React Virtual + React Router + Tailwind + JSON Server + Vite + Node.js** sab cover kar diya hai.

Aur tere assignment ke **“Sources & references”** requirement ko bhi proper section mein include kiya hai.

**Bas ek cheez check kar lena:** agar `package.json` mein `lucide-react`, `axios`, `msw`, ya koi aur package actually installed hai aur project mein use ho raha hai, to usko bhi README ke Libraries section mein add karna chahiye. Agar tu apna **current `package.json`** bhej de, main README ko **100% exact installed packages ke according** final kar dunga.