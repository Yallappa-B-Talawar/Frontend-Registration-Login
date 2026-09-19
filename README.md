# RegLogFrontApp — Full-Stack Authentication Frontend

A modern, responsive Single Page Application (SPA) built using **React.js**, **React Router DOM**, **Tailwind CSS** (Next.js / Vercel minimalist design aesthetic), and **Fetch API** with credentials.

---

## Features
- **Next.js / Vercel Minimalist UI**: Clean monochrome layout (`#fafafa` radial grid canvas, crisp white cards, high-contrast black buttons, focus rings, and micro-interactions).
- **Registration (`Signup.jsx`)**: Username, Email, Phone, Password, Confirm Password, with real-time inline regex validation and error states.
- **Login (`Login.jsx`)**: Username, Password, password visibility toggle, error alert banner, loading spinner, and automatic HttpOnly cookie session reception.
- **Protected Dashboard (`Home.jsx`)**: Renders `Welcome, <username>!`, session badge, session info, and Logout CTA.
- **Route Guard (`ProtectedRoute.jsx`)**: Queries `GET /api/user/me` with `credentials: 'include'`; redirects to `/login` if session is missing or expired.
- **HttpOnly Cookie Storage**: No tokens are stored in `localStorage` or `sessionStorage` to shield against XSS attacks.

---

## Project Structure
```text
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Cookie session route guard
│   ├── pages/
│   │   ├── Signup.jsx            # User registration form
│   │   ├── Login.jsx             # User login form
│   │   └── Home.jsx              # Protected dashboard
│   ├── services/
│   │   └── api.js                # Centralized Fetch client with credentials
│   ├── App.jsx                   # Route configuration
│   ├── main.jsx                  # React root mount
│   └── index.css                 # Next.js design tokens & styling
├── public/
├── index.html
├── package.json
├── vite.config.js                # Proxy configuration for backend /api
└── tailwind.config.js
```

---

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs on: `http://localhost:5173/`

### Production Build
```bash
npm run build
```
Outputs optimized production assets to `dist/`.
