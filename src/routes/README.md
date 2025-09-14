# Routes Directory

This directory contains all routing-related configurations and utilities for the application.

## Structure

```
routes/
├── index.ts              # Main export file
├── routes.tsx            # Lazy-loaded page components
├── routeDefinitions.tsx  # Route configuration objects
└── utils.tsx            # Route utility functions
```

## Files

### `routes.tsx`

Contains all lazy-loaded page components. This centralizes all dynamic imports to improve initial bundle size and loading performance.

### `routeDefinitions.tsx`

Contains the actual route configuration objects that define:

- Public routes (homepage, signin, signup)
- Protected dashboard routes
- Error handling routes (404)

Routes are organized by logical groups and use the `createProtectedRoute` utility for consistent protection.

### `utils.tsx`

Utility functions for route management:

- `createProtectedRoute()`: Wraps components with authentication protection
- `flattenRoutes()`: Converts nested route objects to flat arrays
- Type definitions for better TypeScript support

### `index.ts`

Central export point for all route-related functionality.

## Usage

```tsx
import { routeDefinitions, routes } from "@/routes";

// Use routeDefinitions in App.tsx
<Routes>
  {routeDefinitions.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ))}
</Routes>;

// Use route paths
navigate(routes.dashboard.activity.reports);
```

## Benefits

1. **Separation of Concerns**: Routes are completely separated from the main App component
2. **Maintainability**: Easy to add, remove, or modify routes
3. **Type Safety**: Full TypeScript support with proper typing
4. **Performance**: Centralized lazy loading for optimal bundle splitting
5. **Organization**: Logical grouping of related routes
6. **Reusability**: Route utilities can be used across the application

## Adding New Routes

1. Add lazy import to `routes.tsx`
2. Add route definition to appropriate section in `routeDefinitions.tsx`
3. Update the `routes` object in `routes.tsx` if needed for navigation

## Route Groups

Routes are organized into logical groups:

- **Public Routes**: Homepage, authentication pages
- **Dashboard Routes**: All protected admin pages
- **Error Routes**: 404 and other error handling

Each group can have nested sub-groups for better organization.
