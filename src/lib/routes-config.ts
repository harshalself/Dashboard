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
