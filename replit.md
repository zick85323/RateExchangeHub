# Crypto Exchange Dashboard

## Overview

This is a full-stack web application built for managing cryptocurrency exchange operations. The application provides a dashboard for configuring exchange rates and managing trading offers across multiple platforms. It features a React frontend with TypeScript, an Express.js backend, and uses Drizzle ORM with PostgreSQL for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reload with tsx for TypeScript execution

### Database Schema
The application uses three main entities:
- **Users**: Basic user authentication and management
- **Rate Configurations**: Exchange rate settings with markup calculations
- **Offers**: Trading offers linked to rate configurations

## Key Components

### Rate Configuration System
- Supports multiple currency pairs and exchange sources
- Configurable markup (percentage or flat rate)
- Real-time rate calculations with external API integration
- Active/inactive status management

### Offer Management
- Multi-platform support (exchanges and P2P platforms)
- Payment method integration
- Buy/sell trade type configuration
- Cryptocurrency type selection

### UI Components
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables
- Comprehensive form components with validation
- Toast notifications for user feedback
- Modal dialogs and dropdown menus

## Data Flow

1. **Rate Configuration**: Users configure exchange rates with markup settings
2. **External Rate Fetching**: System fetches real-time rates from external sources
3. **Rate Calculation**: Applied markup calculations generate final trading rates
4. **Offer Creation**: Users create trading offers linked to rate configurations
5. **Dashboard Display**: Real-time status updates and configuration management

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Query)
- UI components (Radix UI, shadcn/ui)
- Styling (Tailwind CSS, class-variance-authority)
- Forms (React Hook Form, Zod validation)
- Icons (Lucide React)

### Backend Dependencies
- Express.js with middleware (cors, sessions)
- Database (Drizzle ORM, PostgreSQL drivers)
- Development tools (tsx, esbuild)
- Session storage (connect-pg-simple)

### Database
- PostgreSQL 16 (configured in Replit environment)
- Neon Database serverless driver for production
- Drizzle migrations for schema management

## Deployment Strategy

### Development Environment
- Replit-based development with hot reload
- Vite dev server for frontend
- tsx for backend TypeScript execution
- PostgreSQL database module in Replit

### Production Build
- Frontend: Vite build output to `dist/public`
- Backend: esbuild bundle to `dist/index.js`
- Single-node deployment with static file serving
- Environment variable configuration for database

### Build Commands
- `npm run dev`: Development mode with hot reload
- `npm run build`: Production build (frontend + backend)
- `npm run start`: Production server execution
- `npm run db:push`: Database schema deployment

## Changelog
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.