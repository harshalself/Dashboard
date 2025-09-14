import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OverviewView } from "./overview/OverviewView";
import { UsersView } from "./users/UsersView";
import { ActivityView } from "./activity/ActivityView";
import { AnalyticsView } from "./analytics/AnalyticsView";
import { SettingsView } from "./settings/SettingsView";
import ProfileView from "./profile/ProfileView";
import HelpView from "./help/HelpView";

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
      case "profile":
        return <ProfileView />;
      case "help":
        return <HelpView />;
      case "settings":
        return <SettingsView initialTab={settingsTab} />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      tabs={tabs}
      onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}
