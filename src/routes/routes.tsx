import { lazy } from "react";

// Lazy load all pages to improve initial load time
export const Homepage = lazy(() => import("../pages/Homepage"));
export const Dashboard = lazy(() => import("../pages/Dashboard"));
export const SignIn = lazy(() => import("../pages/SignIn"));
export const SignUp = lazy(() => import("../pages/SignUp"));
export const NotFound = lazy(() => import("../pages/NotFound"));

// Dashboard Pages
export const OverviewPage = lazy(
  () => import("../pages/dashboard/overview/OverviewPage")
);
export const UsersPage = lazy(
  () => import("../pages/dashboard/users/UsersPage")
);
export const ActivityPage = lazy(
  () => import("../pages/dashboard/activity/ActivityPage")
);
export const AnalyticsPage = lazy(
  () => import("../pages/dashboard/analytics/AnalyticsPage")
);
export const SettingsPage = lazy(
  () => import("../pages/dashboard/settings/SettingsPage")
);
export const ProfilePage = lazy(
  () => import("../pages/dashboard/profile/ProfilePage")
);
export const HelpPage = lazy(() => import("../pages/dashboard/help/HelpPage"));

// Route configuration object
export const routes = {
  // Public routes
  home: "/",
  signin: "/signin",
  signup: "/signup",

  // Dashboard routes
  dashboard: {
    root: "/dashboard",
    overview: {
      root: "/dashboard/overview",
      dashboard: "/dashboard/overview/dashboard",
      metrics: "/dashboard/overview/metrics",
      realtime: "/dashboard/overview/realtime",
      system: "/dashboard/overview/system",
    },
    users: {
      root: "/dashboard/users",
      all: "/dashboard/users/all",
      manage: "/dashboard/users/manage",
      permissions: "/dashboard/users/permissions",
      invite: "/dashboard/users/invite",
    },
    activity: {
      root: "/dashboard/activity",
      recent: "/dashboard/activity/recent",
      filtered: "/dashboard/activity/filtered",
      alerts: "/dashboard/activity/alerts",
      reports: "/dashboard/activity/reports",
    },
    analytics: "/dashboard/analytics",
    settings: "/dashboard/settings",
    profile: "/dashboard/profile",
    help: "/dashboard/help",
  },

  // Catch-all route
  notFound: "*",
} as const;

// Type for route paths
export type RoutePath = (typeof routes)[keyof typeof routes] | string;
