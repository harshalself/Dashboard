import { useState } from "react";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  DollarSign,
  Activity,
  Home,
  BarChart3,
  Clock,
  Settings2,
  TrendingUp,
  Plus,
} from "lucide-react";

const overviewItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "realtime", label: "Real-time", icon: Clock },
  { id: "system", label: "System Status", icon: Settings2 },
];

export function OverviewView() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const stats = [
    {
      title: "Total Users",
      value: "2,350",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "1,234",
      change: "-3%",
      trend: "down",
      icon: Activity,
    },
    {
      title: "Growth",
      value: "23.1%",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const recentActivities = [
    { user: "John Doe", action: "Created new project", time: "2 minutes ago" },
    {
      user: "Sarah Smith",
      action: "Updated user profile",
      time: "5 minutes ago",
    },
    {
      user: "Mike Johnson",
      action: "Uploaded new document",
      time: "10 minutes ago",
    },
    { user: "Emma Wilson", action: "Completed task", time: "15 minutes ago" },
    { user: "David Brown", action: "Joined the team", time: "30 minutes ago" },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your application.
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                        )}
                        <span
                          className={
                            stat.trend === "up"
                              ? "text-success"
                              : "text-destructive"
                          }>
                          {stat.change}
                        </span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Commonly used administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="ghost">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Settings2 className="mr-2 h-4 w-4" />
                    System Settings
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.action} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "metrics":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Detailed Metrics
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>
                    Monthly user registration trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">+24.5%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Compared to previous month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                  <CardDescription>
                    Financial performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-info">$45,231</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total monthly revenue
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "realtime":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Real-time Monitoring
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Live Activity Feed</CardTitle>
                <CardDescription>
                  Real-time user activities and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.slice(0, 3).map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 bg-muted/50 rounded">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "system":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              System Status
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Current system performance and health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <div>
                      <p className="text-sm font-medium">API Status</p>
                      <p className="text-xs text-muted-foreground">
                        Operational
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <div>
                      <p className="text-sm font-medium">Database</p>
                      <p className="text-xs text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded">
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <div>
                      <p className="text-sm font-medium">Cache</p>
                      <p className="text-xs text-muted-foreground">
                        89% Efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      <ReusableSidebar
        title="Overview"
        items={overviewItems}
        activeItem={activeItem}
        onItemChange={setActiveItem}
      />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
