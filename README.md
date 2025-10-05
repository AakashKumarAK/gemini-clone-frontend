# Gemini Frontend Clone

Live: <your deployed URL>

## Overview
A Gemini-style chat frontend built with Next.js 15, Tailwind CSS, Zustand for state management. OTP login simulation, chatroom management, simulated AI responses, image upload (base64), reverse infinite scroll, pagination, dark mode, and toast notifications.

## Features
- OTP-based login (simulated)
- Fetch country codes from restcountries.com
- Chatroom create/delete, search & debounce
- Chat UI with user and Gemini messages, timestamps, typing indicator
- Throttled AI responses using setTimeout
- Reverse infinite scroll and client pagination (20 messages/page)
- Image uploads (base64 preview)
- Copy-to-clipboard on message hover
- Dark mode & responsive layout
- LocalStorage persistence
- Toast notifications via react-hot-toast
- Form validation via React Hook Form + Zod

## Tech Stack
- Next.js 15 (App Router)
- React 18
- Tailwind CSS
- Zustand (state)
- React Hook Form + Zod (validation)
- react-hot-toast
- Axios

## How to run locally
1. `git clone <repo>`
2. `cd gemini-frontend`
3. `npm install`
4. `npm run dev`
5. Open http://localhost:3000

## Folder structure
[...explain top-level folders and key files...]

## Implementation notes
- Throttling: lastResponseRef enforces min interval between Gemini replies.
- Pagination: client slices arrays (20/page) and reverse infinite scroll increments `page`.
- OTP: simulated using `setTimeout` and a generated 6-digit code (displayed as toast for convenience).
- Persistence: Zustand + `persist` middleware uses localStorage.

## Deployment
- Deploy on Vercel (recommended): connect repository, select `npm run build` and `next start`, environment variables none needed.

## Screenshots
(Include screenshots of Login, Dashboard, Chat UI)
