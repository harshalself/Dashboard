import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsView } from "./AnalyticsView";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");

  const tabs = [
    {
      label: "Overview",
      value: "overview",
      isActive: activeTab === "overview",
    },
    { label: "Users", value: "users", isActive: activeTab === "users" },
    {
      label: "Activity",
      value: "activity",
      isActive: activeTab === "activity",
    },
    {
      label: "Analytics",
      value: "analytics",
      isActive: activeTab === "analytics",
    },
    {
      label: "Profile",
      value: "profile",
      isActive: activeTab === "profile",
    },
    {
      label: "Help",
      value: "help",
      isActive: activeTab === "help",
    },
    {
      label: "Settings",
      value: "settings",
      isActive: activeTab === "settings",
    },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/${value}`);
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      tabs={tabs}
      onTabChange={handleTabChange}>
      <AnalyticsView />
    </DashboardLayout>
  );
}
