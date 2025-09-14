import { RouteObject } from "react-router-dom";
import { createProtectedRoute } from "./utils";
import {
  Homepage,
  SignIn,
  SignUp,
  NotFound,
  OverviewPage,
  UsersPage,
  ActivityPage,
  AnalyticsPage,
  SettingsPage,
  ProfilePage,
  HelpPage,
} from "./routes";

// Public routes
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

// Dashboard routes (all protected)
const dashboardRoutes: RouteObject[] = [
  // Main dashboard redirect
  {
    path: "/dashboard",
    element: createProtectedRoute(<OverviewPage />),
  },

  // Overview section
  {
    path: "/dashboard/overview",
    element: createProtectedRoute(<OverviewPage />),
  },
  {
    path: "/dashboard/overview/dashboard",
    element: createProtectedRoute(<OverviewPage />),
  },
  {
    path: "/dashboard/overview/metrics",
    element: createProtectedRoute(<OverviewPage />),
  },
  {
    path: "/dashboard/overview/realtime",
    element: createProtectedRoute(<OverviewPage />),
  },
  {
    path: "/dashboard/overview/system",
    element: createProtectedRoute(<OverviewPage />),
  },

  // Users section
  {
    path: "/dashboard/users",
    element: createProtectedRoute(<UsersPage />),
  },
  {
    path: "/dashboard/users/all",
    element: createProtectedRoute(<UsersPage />),
  },
  {
    path: "/dashboard/users/manage",
    element: createProtectedRoute(<UsersPage />),
  },
  {
    path: "/dashboard/users/permissions",
    element: createProtectedRoute(<UsersPage />),
  },
  {
    path: "/dashboard/users/invite",
    element: createProtectedRoute(<UsersPage />),
  },

  // Activity section
  {
    path: "/dashboard/activity",
    element: createProtectedRoute(<ActivityPage />),
  },
  {
    path: "/dashboard/activity/recent",
    element: createProtectedRoute(<ActivityPage />),
  },
  {
    path: "/dashboard/activity/filtered",
    element: createProtectedRoute(<ActivityPage />),
  },
  {
    path: "/dashboard/activity/alerts",
    element: createProtectedRoute(<ActivityPage />),
  },
  {
    path: "/dashboard/activity/reports",
    element: createProtectedRoute(<ActivityPage />),
  },

  // Other sections
  {
    path: "/dashboard/analytics",
    element: createProtectedRoute(<AnalyticsPage />),
  },
  {
    path: "/dashboard/settings",
    element: createProtectedRoute(<SettingsPage />),
  },
  {
    path: "/dashboard/profile",
    element: createProtectedRoute(<ProfilePage />),
  },
  {
    path: "/dashboard/help",
    element: createProtectedRoute(<HelpPage />),
  },
];

// Error handling routes
const errorRoutes: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />,
  },
];

// Combine all routes in correct order (public first, then protected, then catch-all)
export const routeDefinitions: RouteObject[] = [
  ...publicRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
];
