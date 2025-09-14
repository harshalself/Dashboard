import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UsersView } from "./UsersView";

export default function UsersPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect /dashboard/users to /dashboard/users/all by default
  useEffect(() => {
    if (location.pathname === "/dashboard/users") {
      navigate("/dashboard/users/all", { replace: true });
    }
  }, [location.pathname, navigate]);

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
      <UsersView />
    </DashboardLayout>
  );
}
