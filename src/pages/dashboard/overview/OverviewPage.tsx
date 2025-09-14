import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { DashboardView } from "./dashboard/DashboardView";
import { MetricsView } from "./metrics/MetricsView";
import { RealtimeView } from "./realtime/RealtimeView";
import { SystemStatusView } from "./system/SystemStatusView";
import { Home, BarChart3, Clock, Settings2 } from "lucide-react";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    id: "metrics",
    label: "Metrics",
    icon: BarChart3,
  },
  {
    id: "realtime",
    label: "Real-time",
    icon: Clock,
  },
  {
    id: "system",
    label: "System Status",
    icon: Settings2,
  },
];

export default function OverviewPage() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (sidebarItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/overview" ||
      location.pathname === "/dashboard/overview/"
    ) {
      setActiveItem("dashboard");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = sidebarItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/overview/${item.id}`);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardView />;
      case "metrics":
        return <MetricsView />;
      case "realtime":
        return <RealtimeView />;
      case "system":
        return <SystemStatusView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Overview"
          items={sidebarItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
