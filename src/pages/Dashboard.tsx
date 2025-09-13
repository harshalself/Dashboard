import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { OverviewView } from "./dashboard/overview/OverviewView";
import { UsersView } from "./dashboard/users/UsersView";
import { ActivityView } from "./dashboard/activity/ActivityView";
import { AnalyticsView } from "./dashboard/analytics/AnalyticsView";
import { SettingsView } from "./dashboard/settings/SettingsView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [settingsTab, setSettingsTab] = useState("general");

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
      label: "Settings",
      value: "settings",
      isActive: activeTab === "settings",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView />;
      case "users":
        return <UsersView />;
      case "activity":
        return <ActivityView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView initialTab={settingsTab} />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Dashboard" />
      <Navigation tabs={tabs} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
