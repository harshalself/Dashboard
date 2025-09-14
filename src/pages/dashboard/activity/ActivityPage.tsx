import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { RecentActivityView } from "./recent/RecentActivityView";
import { FilteredLogsView } from "./filtered/FilteredLogsView";
import { SystemAlertsView } from "./alerts/SystemAlertsView";
import { ActivityReportsView } from "./reports/ActivityReportsView";
import { Clock, Filter, AlertCircle, Download } from "lucide-react";

const sidebarItems = [
  {
    id: "recent",
    label: "Recent Activity",
    icon: Clock,
  },
  {
    id: "filtered",
    label: "Filter Logs",
    icon: Filter,
  },
  {
    id: "alerts",
    label: "System Alerts",
    icon: AlertCircle,
  },
  {
    id: "reports",
    label: "Activity Reports",
    icon: Download,
  },
];

export default function ActivityPage() {
  const [activeItem, setActiveItem] = useState("recent");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (sidebarItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/activity" ||
      location.pathname === "/dashboard/activity/"
    ) {
      setActiveItem("recent");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = sidebarItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/activity/${item.id}`);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "recent":
        return <RecentActivityView />;
      case "filtered":
        return <FilteredLogsView />;
      case "alerts":
        return <SystemAlertsView />;
      case "reports":
        return <ActivityReportsView />;
      default:
        return <RecentActivityView />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Activity"
          items={sidebarItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
