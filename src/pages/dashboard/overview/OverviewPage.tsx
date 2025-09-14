import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OverviewView } from "./OverviewView";

export default function OverviewPage() {
  const navigate = useNavigate();

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Users", value: "users" },
    { label: "Activity", value: "activity" },
    { label: "Analytics", value: "analytics" },
    { label: "Profile", value: "profile" },
    { label: "Help", value: "help" },
    { label: "Settings", value: "settings" },
  ];

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/${value}`);
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      tabs={tabs}
      onTabChange={handleTabChange}>
      <OverviewView />
    </DashboardLayout>
  );
}
