# CabNet Frontend (Next.js)

A modern ride-hailing frontend for riders and drivers with live tracking, booking, and payments.

## Live Demo
- Deployed site: `https://cabnet.vercel.app`

## Key Features

- User experience
  - Book a ride: choose pickup/drop using address or map
  - Live tracking: follow driver location and route preview
  - Ride history: list + detail view with embedded map
  - Payments: Stripe Checkout flow from the app
  - Profile: basic account panel with preferences

- Driver experience
  - Dashboard with requests/current ride/earnings/history
  - Nearby requests feed (wired to backend endpoint)
  - Status/location updates (API-ready endpoints on backend)
  - Mini live map and ride tools

- Maps and location
  - React Leaflet + OpenStreetMap tiles
  - Map picker for selecting coordinates
  - Preview and live-tracking maps with markers and routes

- Auth (demo flow)
  - Email-based login/signup
  - Forgot password UI and flow
  - JWT attached to all API calls (Authorization header)

- API integration
  - Unified API client with automatic JWT header and 401 handling
  - Booking: POST ride request to backend
  - Driver: fetch nearby drivers
  - Payments: Stripe Checkout session creation and redirect
  - Toasts and UI states for success/error

## Tech Stack

- Framework: Next.js (App Router)
- Language: React (client components), modern JavaScript
- Styling: Tailwind CSS
- Maps: react-leaflet + leaflet + OSM tiles
- Payments: Stripe Checkout (redirect)
- Utilities: fetch wrapper with unified error handling

## Project Structure

```
frontend/
  src/
    app/
      login/               // Login page
      signup/              // Signup page
      user/                // User dashboard route
      driver/              // Driver dashboard route
      layout.js            // Root layout
      globals.css          // Global styles
    components/
      auth/                // Login/Signup/ForgotPassword forms
      user/                // User UI (booking, maps, history, payments, profile)
        booking/           // BookingForm, MapPicker, RideSummary, AssignedView
        tracking/          // LiveMap, LiveTracking, LiveStatusBanner
        history/           // History list/detail
        payments/          // Payments panel
        layout/            // Header/Sidebar
      driver/              // Driver UI (requests, ride, earnings, ratings)
      landing-page/        // Marketing landing sections
    lib/
      api.js               // API client (adds Authorization, handles 401)
  public/                  // Static assets
  next.config.mjs
  eslint.config.mjs
  postcss.config.mjs
  package.json
  README.md
```

## Primary Routes

- `/` marketing landing page
- `/login` login flow
- `/signup` signup flow
- `/login/forgot-password` password reset UI
- `/user/dashboard` user home with booking, live tracking, history, payments, profile
- `/driver/dashboard` driver home with requests, current ride, earnings, history, ratings, profile

## Notable Components

- Booking and Maps
  - `BookingForm.jsx`: booking flow; posts to rides API; triggers payment
  - `MapPicker.jsx`: click-to-select coordinates
  - `LiveMap.jsx`: react-leaflet display for markers and polyline
  - `LiveTracking.jsx`: wrapper simulating driver movement for previews

- Payments
  - Stripe Checkout session created via API call; redirects to Stripe and back
  - Return URL lands at `/user/dashboard?payment=success|cancel` and shows a toast

- Auth
  - `LoginForm.jsx`, `SignupForm.jsx`, `ForgotPasswordForm.jsx`
  - Client session token persisted and sent as `Authorization: Bearer <token>`

## Scripts

```bash
# install
npm install

# dev server
npm run dev

# production build
npm run build

# start production server
npm start

# lint
npm run lint
```

## Conventions and Architecture

- API client
  - `src/lib/api.js` centralizes base URL, headers, JSON parsing, and 401 handling
  - All feature components import and use `apiRequest(path, options)`

- UI/State
  - Favor simple local component state and props drilling
  - Derived UI data via `useMemo` where helpful
  - Minimal external state libraries

- Code style
  - Clear naming, early returns, and lightweight components
  - Match project formatting; avoid unrelated reformatting

## Testing the Main Flows

- User booking
  - Open `/user/dashboard` → Book a ride → Confirm → Pay Now → Stripe → return to dashboard
- Driver feed
  - Open `/driver/dashboard` → Live Requests panel shows nearby drivers data

## Roadmap

- Real-time sockets for ride status and driver locations
- Full geocoding/autocomplete for addresses
- Robust password hashing and reset tokens in backend
- In-app wallet and saved payment methods
- Advanced driver-rider dispatch logic

## License

- MIT (or align with your repo’s chosen license)

## Screenshots

Landing and core flows

![Landing](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Cabnet%20Landing%20page.png?raw=true)
![Features](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Cabnet%20features.png?raw=true)
![Create account](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Create%20account.png?raw=true)
![Login](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Login%20Page.png?raw=true)
![User Dashboard](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/User%20Dashboard.png?raw=true)
![Booking ride](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Booking%20ride.png?raw=true)
![Map Integration](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Map%20Integration.png?raw=true)
![Live Tracking](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Live%20Tracking.png?raw=true)
![Stripe Payment](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Stripe%20Payment.png?raw=true)
![User Ride history](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/User%20Ride%20history.png?raw=true)
![Payment history](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Payment%20history.png?raw=true)
![User Profile](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/User%20Profile.png?raw=true)

Driver dashboard

![Driver Dashboard](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Driver%20Dashboard.png?raw=true)
![Current Ride](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Current%20Ride.png?raw=true)
![Driver Earnings](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Driver%20Earnings.png?raw=true)
![Driver Ride History](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Driver%20Ride%20History.png?raw=true)
![Rating and reviews](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Rating%20and%20reviews.png?raw=true)
![Driver Profile](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Driver%20Profile.png?raw=true)
![Support](https://github.com/Mrunalgaikwad002/Cabnet/blob/main/Support.png?raw=true)

