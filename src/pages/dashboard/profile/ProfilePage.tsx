import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { ProfileOverviewView } from "./overview/ProfileOverviewView";
import { PersonalInfoView } from "./personal/PersonalInfoView";
import { SecurityView } from "./security/SecurityView";
import { User, Edit } from "lucide-react";

const profileItems = [
  { id: "overview", label: "Overview", icon: User },
  { id: "personal", label: "Personal Info", icon: Edit },
  { id: "security", label: "Security", icon: User },
];

export default function ProfilePage() {
  const [activeItem, setActiveItem] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (profileItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/profile" ||
      location.pathname === "/dashboard/profile/"
    ) {
      setActiveItem("overview");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = profileItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/profile/${item.id}`);
    }
  };

  const handleNavigateToPersonal = () => {
    setActiveItem("personal");
    navigate("/dashboard/profile/personal");
  };

  const handleNavigateToSecurity = () => {
    setActiveItem("security");
    navigate("/dashboard/profile/security");
  };

  const handleNavigateToOverview = () => {
    setActiveItem("overview");
    navigate("/dashboard/profile/overview");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return (
          <ProfileOverviewView
            onNavigateToPersonal={handleNavigateToPersonal}
            onNavigateToSecurity={handleNavigateToSecurity}
          />
        );
      case "personal":
        return (
          <PersonalInfoView onNavigateToOverview={handleNavigateToOverview} />
        );
      case "security":
        return <SecurityView />;
      default:
        return (
          <ProfileOverviewView
            onNavigateToPersonal={handleNavigateToPersonal}
            onNavigateToSecurity={handleNavigateToSecurity}
          />
        );
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Profile"
          items={profileItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
