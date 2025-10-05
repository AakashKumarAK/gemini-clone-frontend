# Gemini Frontend Clone

Live: (https://gemini-clone-frontend-one.vercel.app/)

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
gemini-clone/                 # Project root
│
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx            # Global layout (header, dark toggle, Toaster)
│   ├── page.tsx              # Redirect to /auth or /dashboard
│   │
│   ├── auth/
│   │   └── page.tsx          # OTP Login page
│   │
│   ├── dashboard/
│   │   └── page.tsx          # Chatroom Dashboard
│   │
│   └── chat/
│       └── [id]/
│           └── page.tsx      # Individual Chatroom page
│
├── components/               # Reusable UI components
│   ├── ChatroomList.tsx      # Renders list of chatrooms
│   ├── ChatWindow.tsx        # Main chat window
│   ├── CountrySelect.tsx     # Country code dropdown
│   ├── DarkToggle.tsx        # Dark mode toggle
│   ├── DeleteChatRoom.tsx    # Delete confirmation dialog
│   ├── LogoutButton.tsx      # Logout button
│   ├── MessageInput.tsx      # Input bar with text + image upload
│   ├── MessageItem.tsx       # Single message bubble
│   ├── MessageList.tsx       # Scrollable list of messages
│   ├── NewChatRoomDialog.tsx # Modal to create a new chatroom
│   ├── OTPForm.tsx           # OTP login form
│   ├── ProtectedRoute.tsx    # Guards private routes
│   ├── SearchBar.tsx         # Debounced search bar
│   └── SkeletonMessage.tsx   # Skeleton loader for chat messages
│
├── hooks/                    # Custom React hooks
│   ├── useDebounce.ts        # Debounce hook for search inputs
│   └── useLocalStorage.ts    # LocalStorage persistence hook
│
├── lib/                      # State, validation, helpers
│   ├── dummy-data.ts         # Optional dummy chat data
│   ├── types.ts              # TypeScript interfaces (Message, Chatroom, etc.)
│   ├── utils.ts              # Utility helpers (timestamps, formatters)
│   ├── validators.ts         # Zod schemas for form validation
│   └── zustandStore.ts       # Zustand store for auth + chat
│
├── public/                   # Static assets
│   └── favicon.ico
│
├── styles/                   
│   └── globals.css           # TailwindCSS + global styles
│
├── .env.local                # Environment variables (Supabase keys, etc.)
├── .gitignore                # Ignore node_modules, .env.local, etc.
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies + scripts
├── postcss.config.js         # PostCSS config for Tailwind
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation

 


## Implementation notes
- Throttling: lastResponseRef enforces min interval between Gemini replies.
- Pagination: client slices arrays (20/page) and reverse infinite scroll increments `page`.
- OTP: simulated using `setTimeout` and a generated 6-digit code (displayed as toast for convenience).
- Persistence: Zustand + `persist` middleware uses localStorage.

## Deployment
- Deploy on Vercel (recommended): connect repository, select `npm run build` and `next start`, environment variables none needed.


