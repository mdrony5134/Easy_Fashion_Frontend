# Easy Fashion Frontend

I have build frontend for the Easy Fashion e-commerce platform. Built with Next.js, React, Tailwind CSS, and Redux Toolkit.

## Website Link: https://easy-fashion-frontend.vercel.app

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS, shadcn/ui components
- **State Management:** Redux Toolkit (RTK Query)
- **Icons:** Lucide React, React Icons
- **Authentication:** Custom JWT-based auth via cookies

## Features

- **Modern E-Commerce UI:** Premium look with beautiful carousels and smooth micro-interactions.
- **Product Listing & Filtering:** High-performance shop pages.
- **Cart Management:** Redux-powered responsive cart state.
- **User Profiles:** Integrated auth with user profiles, order tracking, and history.
- **Fully Responsive:** Beautifully designed across desktop, tablet, and mobile displays.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Ensure you have your `.env` configured properly (e.g., pointing to your backend API URL). Example:

```env
NEXT_PUBLIC_API_URL=https://easy-fashion-backend.vercel.app/api
```

## Directory Structure

- `src/app/`: Next.js App Router pages (Home, Shop, Profile, etc.)
- `src/components/`: Reusable UI components organized by feature (home, shop, profile, ui).
- `src/redux/`: Global state management slices and RTK Query API endpoints.
- `src/shared/`: Global components like Header and Footer.
- `src/types/`: Shared TypeScript type definitions.
