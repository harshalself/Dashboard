import { ReactNode } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";

// Route configuration types
export interface AppRoute {
  path: string;
  element: ReactNode;
  protected?: boolean;
  title?: string;
  description?: string;
}

export interface RouteGroup {
  [key: string]: AppRoute | RouteGroup;
}

// Utility function to create protected routes
export const createProtectedRoute = (element: ReactNode): ReactNode => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

// Utility function to flatten route groups into array of routes
export const flattenRoutes = (routes: RouteGroup, prefix = ""): AppRoute[] => {
  const flattened: AppRoute[] = [];

  for (const [key, value] of Object.entries(routes)) {
    if (isRouteGroup(value)) {
      // It's a nested group
      flattened.push(...flattenRoutes(value, `${prefix}/${key}`));
    } else {
      // It's a route
      const route: AppRoute = {
        ...value,
        path: value.path.startsWith("/")
          ? value.path
          : `${prefix}/${value.path}`,
      };
      flattened.push(route);
    }
  }

  return flattened;
};

// Type guard to check if object is a RouteGroup
const isRouteGroup = (obj: AppRoute | RouteGroup): obj is RouteGroup => {
  return !obj.hasOwnProperty("element");
};
