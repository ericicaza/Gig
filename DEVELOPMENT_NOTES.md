# Development Notes for Gig Starter MVP

## High-level changes made

Because no existing local project files were available, this starter version was built as a self-contained Expo React Native app.

The app uses simple in-memory state in `App.js`. That means all created bookings, edits, and messages reset when the app reloads.

## Core design decisions

### 1. Manual screen navigation

The app does not use React Navigation yet. It uses a simple `screen` state variable and a small `navigate()` helper. This keeps the prototype easy to understand.

Later, replace this with React Navigation once the screen structure is stable.

### 2. Mock authentication

The app has two demo users:

- Demo musician: `m1`
- Demo venue owner: `o1`

Choosing a role signs in as that demo user. Later, this should be replaced with Firebase Auth.

### 3. Local mock data

Mock data includes musicians, venues, booking requests, conversations, and messages. Later, these should move to Firestore.

### 4. Booking requests before free-form messaging

Messaging is connected to booking requests. This is a good MVP choice because it reduces spam and gives every conversation context.

## Files

- `App.js`: all current screens, state, mock data, and app logic
- `README.md`: setup and feature list
- `DEVELOPMENT_NOTES.md`: implementation notes and next steps
- `package.json`: Expo dependencies and scripts

## Next technical changes needed

### Firebase Auth

Add real signup/login. User documents should look like:

```js
users/{uid} = {
  displayName,
  email,
  role: "musician" | "venueOwner",
  createdAt
}
```

### Firestore collections

Suggested first collections:

```text
users
musicianProfiles
venueProfiles
bookingRequests
conversations
messages
```

### Security rules

Rules should enforce:

- Users can only edit their own user document.
- Musicians can only edit their own musician profile.
- Venue owners can only edit venues they own.
- Musicians can only create booking requests as themselves.
- Venue owners can only accept/decline requests for venues they own.
- Messages can only be read/written by participants in the conversation.

### Better navigation

Install React Navigation later:

```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### Better data layer

Before adding Firebase, create functions like:

```js
createBookingRequest(input)
updateBookingStatus(requestId, status)
sendMessage(conversationId, message)
updateMusicianProfile(userId, updates)
updateVenueProfile(venueId, updates)
```

Then replacing mock state with Firestore will be easier.

## Next session notes 6/13/26

Completed:
- Moved mock data into src/data/mockData.js
- Moved helper actions into src/utils/appActions.js
- Confirmed app still runs in browser and Expo Go

Next:
- Split App.js into screens/components
- Do not add Firebase until app structure is cleaner

Issues:
- None currently

## Current session 6/13/26

Completed:
- Confirmed the Gig app runs after Expo SDK update.
- Used Codex to move mock data out of App.js into src/data/mockData.js.
- Used Codex to move helper functions into src/utils/appActions.js.
- App.js still controls state and screens.
- Fixed text encoding artifacts for bullets and arrows.

Tested:
- Role selection
- Venue search
- Musician search
- Booking requests
- Inbox/messages
- Venue owner accept/decline flow

Next:
- Split App.js into separate screen/component files.
- Do not add Firebase until the file structure is cleaner.

## Current session - screen/component refactor closeout

Changed:
- Split screen rendering out of `App.js` into files under `src/screens`.
- Split reusable UI pieces into `src/components`, including buttons, cards, profile summaries, headers, sections, form inputs, tags, status pills, and empty states.
- Moved the shared React Native stylesheet into `src/styles/styles.js`.
- Kept `App.js` responsible for mock/in-memory state, action handlers, selected IDs, and manual `screen`-based navigation.
- Preserved the existing booking request screen even though it was not listed in the suggested structure, because it is required for the current musician-to-venue booking flow.

Checks run:
- `npx.cmd expo export --platform web --output-dir "$env:TEMP\gig-export-check"` passed.
- `npm.cmd ls --depth=0` passed and showed the existing Expo/React dependencies only.
- `git diff --check` reported only line-ending warnings for changed text files; no code whitespace errors were reported.

Feature structure preserved:
- Role selection
- Musician dashboard
- Venue owner dashboard
- Venue search
- Musician search
- Venue detail page
- Musician detail page
- Booking request flow
- Booking request accept/decline flow
- Inbox/messages
- Musician and venue profile editing

Still needs manual testing:
- Full musician flow from role selection to venue search, venue detail, booking request creation, booking list, inbox, and message sending.
- Full venue owner flow from role selection to musician search, musician detail, direct messaging, booking request review, accept, and decline.
- Profile edit/save flows for both musician and venue owner demo users.
- Browser and Expo Go behavior after reload, especially confirming mock data resets as expected.

Current limitations:
- The app still uses mock/in-memory data.
- There is no Firebase Auth, Firestore persistence, Firebase Storage, or backend security model yet.
- Manual `screen` state navigation is still in place; React Navigation has not been added.
- Created bookings, profile edits, direct conversations, and messages reset when the app reloads.

Recommended next task:
- Manually smoke test the preserved flows in web and/or Expo Go, then commit this screen/component refactor checkpoint after approval. After that checkpoint, the safest next code task is to add a small manual test checklist or lightweight screen constants before introducing Firebase.

## Current session - GitHub Pages web deployment setup

Changed:
- Configured Expo web export for the GitHub Pages project path `/gig` in `app.json`.
- Added `predeploy` and `deploy` scripts to `package.json`.
- Added `gh-pages` as a dev dependency so `npm run deploy` can publish the `dist/` export to the `gh-pages` branch.
- Added `dist/` to `.gitignore` because it is generated output.
- Documented the GitHub Pages deploy flow in `README.md`.

Checks run:
- `npx.cmd expo export --platform web --output-dir "$env:TEMP\gig-export-check"` passed and Expo reported `Using (experimental) base path: /gig`.
- The generated `index.html` references `/gig/_expo/...` for the bundled web assets.
- `git diff --check` reported only line-ending warnings for changed text files; no code whitespace errors were reported.

Deployment still needs:
- After commit approval, run `npm install` if `gh-pages` is not present locally, then run `npm run deploy` to publish.

Still needs to be done:
- Confirm the GitHub remote points to `https://github.com/ericicaza/gig`.
- Commit the deployment setup after review approval.
- Run the first `npm run deploy`.
- In GitHub repository settings, confirm Pages is serving from the `gh-pages` branch if it is not enabled automatically.
- Visit `https://ericicaza.github.io/gig/` and smoke test the role selection, searches, booking flow, inbox, messaging, and profile edits.

Current limitations:
- The deployed web app still uses mock/in-memory data.
- Created bookings, messages, profile edits, and conversations reset on page reload.
- No Firebase, React Navigation, authentication, or real backend persistence has been added.
