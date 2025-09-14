import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  tabs?: Array<{ label: string; value: string; isActive?: boolean }>;
  onTabChange?: (value: string) => void;
}

export function DashboardLayout({
  children,
  title = "Admin Dashboard",
  tabs,
  onTabChange,
}: DashboardLayoutProps) {
  const location = useLocation();

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
  const tabsWithActiveState = tabs?.map((tab) => ({
    ...tab,
    isActive: tab.value === getActiveTabFromUrl(),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      {tabsWithActiveState && (
        <Navigation tabs={tabsWithActiveState} onTabChange={onTabChange} />
      )}
      {children}
    </div>
  );
}
