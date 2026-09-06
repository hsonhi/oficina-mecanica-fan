# My Test App

## Tech Stack

### Backend

- **PHP 8.3** - Server-side application language.
- **Laravel 13** - Web application framework and core backend platform.
- **Laravel Fortify** - Authentication and user account features.
- **Laravel Inertia** - Server-side routing and page data integration for the React frontend.
- **Laravel Wayfinder** - Type-safe access to Laravel routes from the frontend.
- **Laravel Tinker** - Interactive command-line access to the application.

### Frontend

- **React 19** - Component-based user interface library.
- **TypeScript** - Static typing for frontend code.
- **Inertia.js React adapter** - Connects React pages to Laravel without a separate API layer.
- **Tailwind CSS 4** - Utility-first styling framework.
- **Radix UI** - Accessible, unstyled UI primitives.
- **Lucide React** - Icon library.
- **Sonner** - Toast notifications.

### Build and Development Tools

- **Vite 8** with **Vite Plus** - Frontend development server and production bundling.
- **Laravel Vite Plugin** - Integrates Vite with Laravel.
- **React Compiler** - React optimization support during the build.
- **Composer** - PHP dependency management.
- **pnpm/npm** - JavaScript dependency and script management.

### Testing and Code Quality

- **PHPUnit 12** - Backend and feature testing.
- **PHPStan with Larastan** - Static analysis for PHP and Laravel code.
- **Laravel Pint** - PHP code formatting.
- **Vite Plus checks** - Frontend linting and formatting.
- **TypeScript compiler** - Frontend type checking.

## Development Commands

```bash
# Install dependencies and build the application
composer run setup

# Start the development environment
composer run dev

# Run the full test and quality suite
composer run test

# Run frontend type checking
npm run types:check

# Build frontend assets for production
npm run build
```
