import { lazy, Suspense } from "react";

// Lazy load all view components
const OverviewView = lazy(() =>
  import("@/pages/dashboard/overview/OverviewView").then((module) => ({
    default: module.OverviewView,
  }))
);
const UsersView = lazy(() =>
  import("@/pages/dashboard/users/UsersView").then((module) => ({
    default: module.UsersView,
  }))
);
const ActivityView = lazy(() =>
  import("@/pages/dashboard/activity/ActivityView").then((module) => ({
    default: module.ActivityView,
  }))
);
const AnalyticsView = lazy(() =>
  import("@/pages/dashboard/analytics/AnalyticsView").then((module) => ({
    default: module.AnalyticsView,
  }))
);
const SettingsView = lazy(() =>
  import("@/pages/dashboard/settings/SettingsView").then((module) => ({
    default: module.SettingsView,
  }))
);
const ProfileView = lazy(() => import("@/pages/dashboard/profile/ProfileView"));
const HelpView = lazy(() => import("@/pages/dashboard/help/HelpView"));

interface DashboardRouterProps {
  activeTab: string;
}

export function DashboardRouter({ activeTab }: DashboardRouterProps) {
  // Helper function to wrap lazy components with Suspense
  const renderWithSuspense = (
    Component: React.ComponentType<Record<string, unknown>>,
    props?: Record<string, unknown>
  ) => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
      <Component {...props} />
    </Suspense>
  );

  // Map tab values to their corresponding components
  const tabComponents: Record<string, () => React.ReactElement> = {
    overview: () => renderWithSuspense(OverviewView),
    users: () => renderWithSuspense(UsersView),
    activity: () => renderWithSuspense(ActivityView),
    analytics: () => renderWithSuspense(AnalyticsView),
    profile: () => renderWithSuspense(ProfileView),
    help: () => renderWithSuspense(HelpView),
    settings: () => renderWithSuspense(SettingsView, { initialTab: "general" }),
  };

  // Render the component for the active tab, fallback to overview
  const renderComponent = tabComponents[activeTab];
  return renderComponent ? renderComponent() : tabComponents.overview();
}
