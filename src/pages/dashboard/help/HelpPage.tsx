import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { GettingStartedView } from "./getting-started/GettingStartedView";
import { FAQView } from "./faq/FAQView";
import { DocumentationView } from "./documentation/DocumentationView";
import { SupportView } from "./support/SupportView";
import { HelpCircle, Book, MessageCircle, FileText } from "lucide-react";

const helpItems = [
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "documentation", label: "Documentation", icon: FileText },
  { id: "support", label: "Support", icon: MessageCircle },
];

export default function HelpPage() {
  const [activeItem, setActiveItem] = useState("getting-started");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active item based on URL
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentSection = pathSegments[pathSegments.length - 1];

    if (helpItems.some((item) => item.id === currentSection)) {
      setActiveItem(currentSection);
    } else if (
      location.pathname === "/dashboard/help" ||
      location.pathname === "/dashboard/help/"
    ) {
      setActiveItem("getting-started");
    }
  }, [location.pathname]);

  const handleItemChange = (itemId: string) => {
    const item = helpItems.find((item) => item.id === itemId);
    if (item) {
      setActiveItem(item.id);
      navigate(`/dashboard/help/${item.id}`);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "getting-started":
        return <GettingStartedView />;
      case "faq":
        return <FAQView />;
      case "documentation":
        return <DocumentationView />;
      case "support":
        return <SupportView />;
      default:
        return <GettingStartedView />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Help"
          items={helpItems}
          activeItem={activeItem}
          onItemChange={handleItemChange}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
