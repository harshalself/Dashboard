import { useState } from "react";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import {
  HelpCircle,
  Book,
  MessageCircle,
  FileText,
  ExternalLink,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const helpItems = [
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "documentation", label: "Documentation", icon: FileText },
  { id: "support", label: "Support", icon: MessageCircle },
];

export function HelpView() {
  const [activeItem, setActiveItem] = useState("getting-started");

  const renderContent = () => {
    switch (activeItem) {
      case "getting-started":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Getting Started
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to Admin Panel</CardTitle>
                  <CardDescription>
                    Your comprehensive dashboard for managing and monitoring
                    your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">
                        🏠 Dashboard Overview
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get a quick overview of your system's performance and
                        key metrics.
                      </p>
                      <Badge variant="secondary">Analytics</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">👥 User Management</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Manage users, roles, and permissions across your
                        platform.
                      </p>
                      <Badge variant="secondary">Users</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">⚙️ Settings</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Customize your dashboard appearance and preferences.
                      </p>
                      <Badge variant="secondary">Configuration</Badge>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">📊 Reports</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate and view detailed reports and analytics.
                      </p>
                      <Badge variant="secondary">Reports</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <CardDescription>
                    Follow these steps to get up and running quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Set up your profile</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete your profile information and preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Configure your dashboard
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Customize themes, layouts, and notification
                          preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Explore features</h4>
                        <p className="text-sm text-muted-foreground">
                          Navigate through different sections and discover
                          available tools
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I change my password?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Go to your Profile → Security tab and click "Change
                    Password". You'll need to enter your current password and
                    choose a new one.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I customize the dashboard theme?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Click on the floating theme button (palette icon) in the
                    bottom-right corner, or go to Settings → Themes to choose
                    from predefined color schemes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I manage user permissions?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Navigate to the Users section from the sidebar. You can
                    assign roles and permissions to different users based on
                    their access level.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I export data?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most data tables have an export button. You can export data
                    in CSV or Excel format. Check the individual sections for
                    specific export options.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do I get notifications?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notifications appear in the bell icon in the header. You can
                    customize notification preferences in Settings →
                    Notifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "documentation":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Documentation
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Complete API reference and integration guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View API Reference
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Integration Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Book className="mr-2 h-4 w-4" />
                      Webhook Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Guides</CardTitle>
                  <CardDescription>
                    Step-by-step guides for common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Dashboard Setup Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      User Management Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Reporting Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Support & Contact
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <MessageCircle className="h-6 w-6 mb-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Mail className="h-6 w-6 mb-2" />
                      Email Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community & Resources</CardTitle>
                  <CardDescription>
                    Connect with other users and find additional resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Community Forum
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Knowledge Base
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Video Tutorials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <ReusableSidebar
        items={helpItems}
        activeItem={activeItem}
        onItemChange={setActiveItem}
        title="Help"
      />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}

export default HelpView;
