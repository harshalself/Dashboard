import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GettingStartedView() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Getting Started
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Panel</CardTitle>
          <CardDescription>
            Your comprehensive dashboard for managing and monitoring your
            application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">🏠 Dashboard Overview</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get a quick overview of your system's performance and key
                metrics.
              </p>
              <Badge variant="secondary">Analytics</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">👥 User Management</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Manage users, roles, and permissions across your platform.
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
                <h4 className="font-medium">Configure your dashboard</h4>
                <p className="text-sm text-muted-foreground">
                  Customize themes, layouts, and notification preferences
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
                  Navigate through different sections and discover available
                  tools
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
