# Avidev - Defense & Security Platform

A modern, full-featured web application built with React, TypeScript, and Firebase, designed to support Ukraine's defense initiatives through drone technology projects and career opportunities.

Avidev is a comprehensive platform that showcases defense technology projects, provides career opportunities, and enables community engagement. The application features a public-facing website with project showcases, career listings, and contact forms, plus a secure admin panel for content management.

# Key Highlights

- **Multi-language Support**: Full internationalization (English/Ukrainian)
- **Firebase Integration**: Real-time database, authentication, and hosting
- **Admin Panel**: Secure content management system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation
- **Well-Tested**: Comprehensive test coverage with Vitest

# Features

## Public Features

- **Home Page**: Hero section with statistics and featured projects
- **Projects**: Browse and view detailed information about defense technology projects
- **Career**: Job listings with application functionality
- **Contact**: Contact form for inquiries
- **Internationalization**: Switch between English and Ukrainian
- **Theme**: Dark mode design with green/orange accent colors
- **Responsive**: Optimized for all device sizes

## Admin Features

- **Secure Authentication**: Email/password and Google OAuth
- **Content Management**: Create, update, and delete projects and job listings
- **Protected Routes**: Role-based access control
- **Real-time Updates**: Firebase Firestore integration

# Tech Stack

## State Management & Data Fetching

- **[Redux Toolkit 2.11](https://redux-toolkit.js.org/)** - State management
- **[TanStack Query 5.90](https://tanstack.com/query)** - Server state management
- **[React Router 7.13](https://reactrouter.com/)** - Client-side routing

## UI & Styling

- **[Material-UI 7.3](https://mui.com/)** - Component library
- **[Tailwind CSS 4.2](https://tailwindcss.com/)** - Utility-first CSS
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling

## Forms & Validation

- **[Formik 2.4](https://formik.org/)** - Form management
- **[Yup 1.7](https://github.com/jquense/yup)** - Schema validation

## Internationalization

- **[i18next 25.8](https://www.i18next.com/)** - Internationalization framework
- **[react-i18next 16.5](https://react.i18next.com/)** - React bindings for i18next

## Development Tools

- **[Vitest 4.1](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - React component testing
- **[ESLint 9.39](https://eslint.org/)** - Code linting
- **[Prettier 3.8](https://prettier.io/)** - Code formatting
- **[Husky 9.1](https://typicode.github.io/husky/)** - Git hooks

# Project Structure

The project follows **Feature-Sliced Design (FSD)** architecture for better scalability and maintainability:

```
src/
├── app/                    # Application initialization layer
│   ├── layouts/           # Layout components (Main, Admin)
│   ├── providers/         # Context providers (Auth, Theme, Store, Router)
│   ├── router/            # Route configuration
│   ├── store/             # Redux store setup
│   └── styles/            # Global styles and theme
│
├── pages/                 # Page components (route-level)
│   ├── main/             # Home page
│   ├── projects/         # Projects listing and details
│   ├── career/           # Career opportunities
│   ├── contact/          # Contact page
│   ├── admin/            # Admin dashboard
│   ├── admin-login/      # Admin authentication
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms of service
│
├── widgets/              # Complex UI blocks
│   ├── header/          # Navigation header
│   ├── footer/          # Footer with links
│   ├── hero/            # Hero section
│   ├── stats/           # Statistics display
│   └── project-card/    # Project preview cards
│
├── features/            # Business logic features
│   ├── auth/           # Authentication (login, Google OAuth, password reset)
│   ├── contact/        # Contact form logic
│   ├── locale/         # Language switching
│   ├── navigation/     # Navigation configuration
│   └── notification/   # Toast notifications
│
├── entities/           # Business entities
│   ├── auth/          # Auth service
│   ├── career/        # Career/job entities
│   └── project/       # Project entities
│
├── shared/            # Shared resources
│   ├── api/          # API clients and services
│   ├── ui/           # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── helpers/      # Utility functions
│   ├── constants/    # App constants
│   ├── i18n/         # Translation files
│   ├── lib/          # Third-party library wrappers
│   └── types/        # TypeScript type definitions
│
└── test/             # Test utilities and mocks
    ├── setup.ts      # Test environment setup
    ├── test-utils.tsx # Testing utilities
    ├── helpers/      # Test helpers
    └── mocks/        # Mock data and services
```

# Architecture Principles

- **Feature-Sliced Design**: Organized by features and layers
- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Rule**: Higher layers depend on lower layers, not vice versa
- **Path Aliases**: Using `@/` for clean imports

# Getting Started

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Firebase Account**: For backend services

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd avidev-test-firebase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Fill in your Firebase configuration (see [Configuration](#configuration) section)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

# Configuration

Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

# Available Scripts

## Development

- **`npm run dev`** - Start development server with hot reload
- **`npm run preview`** - Preview production build locally

## Building

- **`npm run build`** - Build for production (TypeScript compilation + Vite build)

## Testing

- **`npm run test-watch`** - Run tests in watch mode
- **`npm run test:run`** - Run tests once
- **`npm run test:coverage`** - Generate test coverage report

## Code Quality

- **`npm run lint`** - Lint and auto-fix code with ESLint
- **`npm run format`** - Format code with Prettier

## Git Hooks

- **`npm run pre-commit`** - Run linting and tests before commit
- **`npm run pre-push`** - Build project before push
- **`npm run prepare`** - Set up Husky git hooks

# Architecture

## State Management Strategy

1. **Redux Toolkit** - Global application state
   - Authentication state
   - Locale/language preferences
   - UI notifications

2. **TanStack Query** - Server state
   - Projects data
   - Career listings
   - Caching and synchronization

3. **Local State** - Component-specific state
   - Form inputs
   - UI toggles
   - Temporary data

## Routing Structure

```
/                          # Home page
/projects                  # Projects listing
/projects/:id              # Project details
/career                    # Career opportunities
/contact                   # Contact form
/privacy                   # Privacy policy
/terms                     # Terms of service
/admin/login              # Admin login
/admin                    # Admin dashboard (protected)
```

## Authentication Flow

1. User visits `/admin/login`
2. Authenticates via Email/Password or Google OAuth
3. Firebase returns user credentials
4. App checks for admin role
5. Redirects to `/admin` dashboard or shows error
6. Protected routes use `RequireAdminAuth` guard

## Data Flow

```
User Action → Component → Feature Hook → API Service → Firebase
                ↓                                          ↓
            Local State ← TanStack Query/Redux ← Response
```

# Testing

## Test Structure

- **Unit Tests**: Individual functions and components
- **Integration Tests**: Feature workflows
- **Component Tests**: React component behavior

## Running Tests

```bash
# Watch mode (recommended for development)
npm run test-watch

# Single run
npm run test:run

# With coverage report
npm run test:coverage
```

## Test Files Location

- Component tests: `*.test.tsx` next to component files
- Hook tests: `*.test.ts` next to hook files
- Utility tests: `*.test.ts` next to utility files

## Testing Utilities

Located in [`src/test/`](src/test/):
- [`setup.ts`](src/test/setup.ts:1) - Test environment configuration
- [`test-utils.tsx`](src/test/test-utils.tsx.tsx:1) - Custom render functions with providers
- [`mocks/`](src/test/mocks/) - Firebase and API mocks

# Code Quality

## ESLint Configuration

- React-specific rules
- TypeScript type checking
- React Hooks rules
- Auto-fix on save

## Prettier Configuration

- Consistent code formatting
- Integrated with ESLint
- Pre-commit formatting

## Git Hooks (Husky)

- **Pre-commit**: Runs linting and tests on staged files
- **Pre-push**: Ensures production build succeeds

# Deployment

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize hosting:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

# Design System

## Color Palette

```css
/* Backgrounds */
bg-zinc-950    /* Main background */
bg-zinc-900    /* Sections */
bg-zinc-800    /* Cards */

/* Text */
text-zinc-100  /* Primary text */
text-zinc-400  /* Secondary text */

/* Primary (Green) */
bg-green-800   /* Primary buttons */
bg-green-700   /* Hover state */
text-green-400 /* Accents */
border-green-700

/* Accent (Orange) */
accent-orange-500  /* Alerts / CTA */
```

## Typography

- **Font Family**: System fonts for optimal performance
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Regular weight, readable sizes

## Responsive Breakpoints

Tailwind CSS default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

# Contributing

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes following the code style
3. Write/update tests for your changes
4. Ensure all tests pass: `npm run test:run`
5. Ensure linting passes: `npm run lint`
6. Ensure formatting passes: `npm run format`
7. Commit with descriptive messages
8. Push and create a Pull Request

## Code Style Guidelines

- Use TypeScript for all new files
- Follow Feature-Sliced Design architecture
- Write tests for new features
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

## Commit Message Format

```
type(scope): description using 'git commit -m "description" -m "ticket number"'
```

Types: `feature`, `fix`, `docs`, `style`, `refactor`, `test`
