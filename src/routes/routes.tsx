import { lazy } from "react";

// Lazy load all pages to improve initial load time
export const Homepage = lazy(() => import("../pages/Homepage"));
export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
export const SignIn = lazy(() => import("../pages/auth/SignIn"));
export const SignUp = lazy(() => import("../pages/auth/SignUp"));
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
