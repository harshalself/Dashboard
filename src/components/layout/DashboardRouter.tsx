import { lazy, Suspense } from "react";

// Lazy load all page components
const OverviewPage = lazy(
  () => import("@/pages/dashboard/overview/OverviewPage")
);
const UsersPage = lazy(() => import("@/pages/dashboard/users/UsersPage"));
const ActivityPage = lazy(
  () => import("@/pages/dashboard/activity/ActivityPage")
);
const AnalyticsPage = lazy(
  () => import("@/pages/dashboard/analytics/AnalyticsPage")
);
const SettingsPage = lazy(
  () => import("@/pages/dashboard/settings/SettingsPage")
);
const ProfilePage = lazy(() => import("@/pages/dashboard/profile/ProfilePage"));
const HelpPage = lazy(() => import("@/pages/dashboard/help/HelpPage"));

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
    overview: () => renderWithSuspense(OverviewPage),
    users: () => renderWithSuspense(UsersPage),
    activity: () => renderWithSuspense(ActivityPage),
    analytics: () => renderWithSuspense(AnalyticsPage),
    profile: () => renderWithSuspense(ProfilePage),
    help: () => renderWithSuspense(HelpPage),
    settings: () => renderWithSuspense(SettingsPage, { initialTab: "general" }),
  };

  // Render the component for the active tab, fallback to overview
  const renderComponent = tabComponents[activeTab];
  return renderComponent ? renderComponent() : tabComponents.overview();
}
