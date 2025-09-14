import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { GeneralSettingsView } from "./general/GeneralSettingsView";
import { ThemesView } from "./themes/ThemesView";
import { APISettingsView } from "./api/APISettingsView";
import { NotificationsView } from "./notifications/NotificationsView";
import { AccountSettingsView } from "./account/AccountSettingsView";
import { Settings, Key, Bell, User, Palette } from "lucide-react";

const settingsItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "themes", label: "Themes", icon: Palette },
  { id: "api", label: "API Keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "account", label: "Account", icon: User },
];

export default function SettingsPage() {
  const [activeItem, setActiveItem] = useState("general");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (settingsItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/settings" ||
      location.pathname === "/dashboard/settings/"
    ) {
      setActiveItem("general");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = settingsItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/settings/${item.id}`);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "general":
        return <GeneralSettingsView />;
      case "themes":
        return <ThemesView />;
      case "api":
        return <APISettingsView />;
      case "notifications":
        return <NotificationsView />;
      case "account":
        return <AccountSettingsView />;
      default:
        return <GeneralSettingsView />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Settings"
          items={settingsItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
