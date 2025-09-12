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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  Users,
  FileText,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
} from "lucide-react";

const activityItems = [
  { id: "recent", label: "Recent Activity", icon: Clock },
  { id: "filtered", label: "Filter Logs", icon: Filter },
  { id: "alerts", label: "System Alerts", icon: AlertCircle },
  { id: "reports", label: "Activity Reports", icon: Download },
];

export function ActivityView() {
  const [activeItem, setActiveItem] = useState("recent");
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "user",
      action: "User Login",
      description: "John Doe logged into the system",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      status: "success",
      icon: Users,
    },
    {
      id: 2,
      type: "system",
      action: "System Update",
      description: "Database backup completed successfully",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      status: "success",
      icon: Settings,
    },
    {
      id: 3,
      type: "document",
      action: "File Upload",
      description: "Sarah Smith uploaded document.pdf",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "success",
      icon: FileText,
    },
    {
      id: 4,
      type: "error",
      action: "Login Failed",
      description: "Failed login attempt from unknown user",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      status: "error",
      icon: AlertCircle,
    },
    {
      id: 5,
      type: "user",
      action: "Profile Updated",
      description: "Mike Johnson updated his profile information",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      status: "success",
      icon: Users,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-success";
      case "error":
        return "text-destructive";
      case "warning":
        return "text-warning";
      default:
        return "text-info";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const activityStats = [
    {
      title: "Total Activities",
      value: "2,345",
      change: "+12%",
      icon: Activity,
    },
    {
      title: "User Actions",
      value: "1,234",
      change: "+8%",
      icon: Users,
    },
    {
      title: "System Events",
      value: "567",
      change: "+15%",
      icon: Settings,
    },
    {
      title: "Errors",
      value: "12",
      change: "-25%",
      icon: AlertCircle,
    },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case "recent":
        return (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
                <p className="text-muted-foreground">
                  Monitor all system activities and user actions.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Time Range:</span>
                {["24h", "7d", "30d"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range as "24h" | "7d" | "30d")}>
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {activityStats.map((stat) => {
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
                      <p className="text-xs text-muted-foreground">
                        <span
                          className={
                            stat.change.startsWith("+")
                              ? "text-success"
                              : "text-destructive"
                          }>
                          {stat.change}
                        </span>{" "}
                        from last period
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest activities and system events across your application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {activities.map((activity) => {
                      const Icon = activity.icon;
                      const StatusIcon = getStatusIcon(activity.status);

                      return (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-foreground">
                                {activity.action}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <StatusIcon
                                  className={`h-4 w-4 ${getStatusColor(
                                    activity.status
                                  )}`}
                                />
                                <Badge
                                  variant={
                                    activity.status === "success"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="text-xs">
                                  {activity.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatTimestamp(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <div className="flex items-center justify-center mt-4">
                  <Button variant="outline">Load More Activities</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "filtered":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Activity Filters
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Filter Options</CardTitle>
                <CardDescription>
                  Configure activity log filters and search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Activity Type</label>
                    <select className="w-full p-2 border rounded">
                      <option>All Types</option>
                      <option>User Actions</option>
                      <option>System Events</option>
                      <option>Content Changes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full p-2 border rounded">
                      <option>All Status</option>
                      <option>Success</option>
                      <option>Failed</option>
                      <option>Warning</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "alerts":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              System Alerts
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>
                  Current system alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium text-warning-foreground">
                        High CPU Usage
                      </p>
                      <p className="text-sm text-warning/80">
                        Server load above 85% for 10 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="font-medium text-success-foreground">
                        Backup Completed
                      </p>
                      <p className="text-sm text-success/80">
                        Daily backup finished successfully
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "reports":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Activity Reports
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>
                  Export activity logs and generate reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Last 7 Days
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Last 30 Days
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Summary Report
                </Button>
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
        title="Activity"
        items={activityItems}
        activeItem={activeItem}
        onItemChange={setActiveItem}
      />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
