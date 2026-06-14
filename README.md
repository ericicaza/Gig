# Gig Starter MVP

Gig is a React Native / Expo starter app that connects musicians and venue owners.

This version is intentionally simple and uses local in-memory mock data. It is not production ready, but it is functional enough to test the core user experience.

## What works now

- Choose a user role: musician or venue owner
- View a role-specific dashboard
- View and edit a simple musician profile or venue profile
- Search venues as a musician
- Search musicians as a venue owner
- View profile/detail pages
- Create booking requests from musician to venue
- Accept or decline booking requests as a venue owner
- View booking request status on both sides
- Open simple conversations connected to bookings
- Send mock in-app messages

## What is intentionally not included yet

- Firebase Authentication
- Firestore persistence
- Firebase Storage for photos
- Push notifications
- Real maps / geolocation
- Payments
- Calendar integration
- Reviews
- Production security rules


## Recommended setup method

The safest setup is to create a fresh Expo project using Expo's current tooling, then copy this starter `App.js` into it. Expo's own docs recommend `npx create-expo-app@latest` for new projects.

```bash
npx create-expo-app@latest Gig
cd Gig
```

Then replace the generated `App.js` or `app/index.tsx` starter screen with the `App.js` from this package. If your generated project uses Expo Router and an `app/` folder, the quickest beginner-friendly path is to create an `App.js` file at the project root and simplify the router later, or paste the screen code into `app/index.tsx` after converting the import/export style.

## How to run this downloaded package directly

1. Install Node.js.
2. Install Expo tooling if needed:

```bash
npm install -g expo
```

3. From this folder, install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm start
```

5. Open it in Expo Go, iOS simulator, Android emulator, or web.

## Deploy web to GitHub Pages

This project is configured for the GitHub repository:

```text
https://github.com/ericicaza/gig
```

The public GitHub Pages URL is:

```text
https://ericicaza.github.io/gig/
```

The Expo web export uses the `/gig` base path in `app.json`, which is required for a GitHub Pages project site.

Before deploying, make sure dependencies are installed:

```bash
npm install
```

Then publish the web export to GitHub Pages:

```bash
npm run deploy
```

The `predeploy` script exports the web app to `dist/`, and the `deploy` script publishes `dist/` to the `gh-pages` branch with `.nojekyll` enabled.

## Recommended next steps

1. Move mock data into separate API functions.
2. Add Firebase Auth and store users in `users/{uid}`.
3. Move profiles to Firestore collections:
   - `musicianProfiles/{uid}`
   - `venueProfiles/{venueId}`
4. Move booking requests to `bookingRequests/{requestId}`.
5. Move conversations and messages to Firestore.
6. Add Firestore security rules.
7. Replace city text search with location-aware search.
