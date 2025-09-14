import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReusableSidebar } from "../../../components/ui/reusable-sidebar";
import { AllUsersView } from "./all/AllUsersView";
import { ManageUsersView } from "./manage/ManageUsersView";
import PermissionsView from "./permissions/PermissionsView";
import InviteUsersView from "./invite/InviteUsersView";
import { Users, Settings, Shield, UserPlus } from "lucide-react";

const userItems = [
  { id: "all", label: "All Users", icon: Users },
  { id: "manage", label: "Manage Users", icon: Settings },
  { id: "permissions", label: "Permissions", icon: Shield },
  { id: "invite", label: "Invite Users", icon: UserPlus },
];

export function UsersView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the current section from URL path
  const getCurrentSection = useCallback(() => {
    const pathParts = location.pathname.split("/");
    const section = pathParts[pathParts.length - 1];
    return userItems.some((item) => item.id === section) ? section : "all";
  }, [location.pathname]);

  const [activeItem, setActiveItem] = useState(getCurrentSection());

  // Update active item when URL changes
  useEffect(() => {
    setActiveItem(getCurrentSection());
  }, [getCurrentSection]);

  // Handle navigation when sidebar item changes
  const handleItemChange = (itemId: string) => {
    setActiveItem(itemId);
    navigate(`/dashboard/users/${itemId}`);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "all":
        return <AllUsersView />;
      case "manage":
        return <ManageUsersView />;
      case "permissions":
        return <PermissionsView />;
      case "invite":
        return <InviteUsersView />;
      default:
        return <AllUsersView />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      <ReusableSidebar
        title="Users"
        items={userItems}
        activeItem={activeItem}
        onItemChange={handleItemChange}
      />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
