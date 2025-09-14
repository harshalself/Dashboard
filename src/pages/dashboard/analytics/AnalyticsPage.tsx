import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { AnalyticsOverviewView } from "./overview/AnalyticsOverviewView";
import { PerformanceView } from "./performance/PerformanceView";
import { AudienceInsightsView } from "./audience/AudienceInsightsView";
import { GoalsConversionsView } from "./goals/GoalsConversionsView";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

const analyticsItems = [
  { id: "overview", label: "Analytics Overview", icon: BarChart3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "audience", label: "Audience Insights", icon: Users },
  { id: "goals", label: "Goals & Conversions", icon: Target },
];

export default function AnalyticsPage() {
  const [activeItem, setActiveItem] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (analyticsItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/analytics" ||
      location.pathname === "/dashboard/analytics/"
    ) {
      setActiveItem("overview");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = analyticsItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/analytics/${item.id}`);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return <AnalyticsOverviewView />;
      case "performance":
        return <PerformanceView />;
      case "audience":
        return <AudienceInsightsView />;
      case "goals":
        return <GoalsConversionsView />;
      default:
        return <AnalyticsOverviewView />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Analytics"
          items={analyticsItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
