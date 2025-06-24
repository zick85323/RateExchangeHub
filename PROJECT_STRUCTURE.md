# Complete Project Structure - Crypto Exchange Dashboard

## Project Overview
This is a full-stack TypeScript application for managing cryptocurrency exchange rates and trading offers. Built with React + Vite frontend, Express.js backend, and PostgreSQL database.

## Directory Structure

```
crypto-exchange-dashboard/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   └── ... (other UI components)
│   │   │   ├── RateSetupControls.tsx    # Rate configuration component
│   │   │   └── MyOffersSetup.tsx        # Offers management component
│   │   ├── pages/                   # Page components
│   │   │   ├── rate-settings.tsx    # Main dashboard page
│   │   │   └── not-found.tsx        # 404 page
│   │   ├── examples/                # Sample data
│   │   │   └── dummyData.ts         # Mock currencies, platforms, etc.
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── use-toast.ts         # Toast notification hook
│   │   │   └── use-mobile.tsx       # Mobile detection hook
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── utils.ts             # General utilities
│   │   │   ├── types.ts             # TypeScript type definitions
│   │   │   └── queryClient.ts       # React Query configuration
│   │   ├── App.tsx                  # Main app component with routing
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles and Tailwind
│   └── index.html                   # HTML template
├── server/                          # Backend Express application
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API route definitions
│   ├── storage.ts                   # In-memory storage implementation
│   └── vite.ts                      # Vite development server setup
├── shared/                          # Shared code between client/server
│   └── schema.ts                    # Database schema and types
├── attached_assets/                 # Project assets
│   └── image_1750767338629.png      # Design mockup
├── components.json                  # shadcn/ui configuration
├── drizzle.config.ts               # Database migration config
├── package.json                     # Dependencies and scripts
├── package-lock.json               # Dependency lock file
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── replit.md                       # Project documentation
├── .gitignore                      # Git ignore rules
├── .replit                         # Replit configuration
└── README.md                       # Project documentation
```

## Key Files and Their Purpose

### Frontend (client/)

**Main Application Files:**
- `client/src/App.tsx` - Main React component with routing setup
- `client/src/main.tsx` - React DOM render entry point
- `client/src/index.css` - Global CSS with Tailwind utilities

**Pages:**
- `client/src/pages/rate-settings.tsx` - Main dashboard displaying rate controls and offers
- `client/src/pages/not-found.tsx` - 404 error page

**Core Components:**
- `client/src/components/RateSetupControls.tsx` - Rate configuration form with dropdowns
- `client/src/components/MyOffersSetup.tsx` - Trading offer creation panel

**UI Components (shadcn/ui):**
- `client/src/components/ui/` - Pre-built UI components (buttons, cards, forms, etc.)

**Data and Types:**
- `client/src/examples/dummyData.ts` - Mock data for currencies, platforms, payment methods
- `client/src/lib/types.ts` - Frontend-specific TypeScript interfaces
- `client/src/lib/queryClient.ts` - React Query setup for API calls

### Backend (server/)

**API Layer:**
- `server/index.ts` - Express server setup with middleware
- `server/routes.ts` - REST API endpoints for rates and offers
- `server/storage.ts` - In-memory data storage with interface

**Development:**
- `server/vite.ts` - Development server integration

### Shared Code (shared/)

**Database Schema:**
- `shared/schema.ts` - Drizzle ORM schema definitions and Zod validation

### Configuration Files

**Build Tools:**
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript compiler settings
- `tailwind.config.ts` - Tailwind CSS customization

**Package Management:**
- `package.json` - Project dependencies and npm scripts
- `package-lock.json` - Exact dependency versions

**Styling:**
- `postcss.config.js` - PostCSS plugins for CSS processing
- `components.json` - shadcn/ui component library config

## Dependencies

### Frontend Dependencies
```json
{
  "@radix-ui/react-*": "UI component primitives",
  "@tanstack/react-query": "Server state management",
  "react": "UI library",
  "react-dom": "React DOM renderer",
  "react-hook-form": "Form management",
  "wouter": "Lightweight routing",
  "tailwindcss": "CSS framework",
  "lucide-react": "Icon library",
  "zod": "Schema validation"
}
```

### Backend Dependencies
```json
{
  "express": "Web framework",
  "drizzle-orm": "Database ORM",
  "tsx": "TypeScript execution",
  "zod": "Schema validation"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "Vite React plugin",
  "typescript": "TypeScript compiler",
  "tailwindcss": "CSS framework",
  "@types/*": "TypeScript definitions"
}
```

## npm Scripts

```json
{
  "dev": "Start development server",
  "build": "Build production bundle",
  "start": "Run production server",
  "db:push": "Deploy database schema"
}
```

## API Endpoints

```
GET    /api/rate-configurations     # List all rate configs
POST   /api/rate-configurations     # Create new rate config
GET    /api/rate-configurations/:id # Get specific rate config
PUT    /api/rate-configurations/:id # Update rate config

GET    /api/offers                  # List all offers
POST   /api/offers                  # Create new offer

GET    /api/external-rates/:source  # Get mock exchange rates
```

## Features Implemented

### Rate Management
- Currency selection (NGN, USD, EUR, GBP)
- Exchange platform selection (Binance, Coinbase, Kraken, etc.)
- Markup configuration (percentage or flat rate)
- Real-time rate calculations
- Auto-save functionality

### Offer Management
- Payment method selection (Bank Transfer, Cards, PayPal, etc.)
- Platform targeting
- Trade type selection (Buy/Sell)
- Cryptocurrency selection (BTC, ETH, USDT, etc.)
- Configuration persistence

### UI/UX Features
- Responsive design (mobile-first)
- Orange accent theme
- Toast notifications
- Loading states
- Form validation
- Real-time updates

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Server runs on http://localhost:5000

### Production Build
```bash
npm run build
npm start
```

This structure provides a complete, production-ready cryptocurrency exchange rate management system with modern web development practices.