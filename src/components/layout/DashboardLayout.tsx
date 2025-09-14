import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { DashboardRouter } from "./DashboardRouter";

interface DashboardLayoutProps {
  title?: string;
  tabs?: Array<{ label: string; value: string }>;
}

// Default tabs configuration
const DEFAULT_TABS = [
  { label: "Overview", value: "overview" },
  { label: "Users", value: "users" },
  { label: "Activity", value: "activity" },
  { label: "Analytics", value: "analytics" },
  { label: "Profile", value: "profile" },
  { label: "Help", value: "help" },
  { label: "Settings", value: "settings" },
];

export function DashboardLayout({
  title = "Admin Dashboard",
  tabs = DEFAULT_TABS,
}: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Use provided tabs or defaults
  const dashboardTabs = tabs;

  // Determine active tab from current URL
  const getActiveTabFromUrl = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/overview")
      return "overview";
    if (path.startsWith("/dashboard/users")) return "users";
    if (path.startsWith("/dashboard/activity")) return "activity";
    if (path.startsWith("/dashboard/analytics")) return "analytics";
    if (path.startsWith("/dashboard/profile")) return "profile";
    if (path.startsWith("/dashboard/help")) return "help";
    if (path.startsWith("/dashboard/settings")) return "settings";
    return "overview";
  };

  // Update tabs with correct active state based on URL
  const tabsWithActiveState = dashboardTabs.map((tab) => ({
    ...tab,
    isActive: tab.value === getActiveTabFromUrl(),
  }));

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/${value}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <Navigation tabs={tabsWithActiveState} onTabChange={handleTabChange} />
      <DashboardRouter activeTab={getActiveTabFromUrl()} />
    </div>
  );
}
