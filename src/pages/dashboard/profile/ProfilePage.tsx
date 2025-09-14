import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import ProfileView from "./ProfileView";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

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
    // Navigate to the corresponding route
    navigate(`/dashboard/${value}`);
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      tabs={tabs}
      onTabChange={handleTabChange}>
      <ProfileView />
    </DashboardLayout>
  );
}
