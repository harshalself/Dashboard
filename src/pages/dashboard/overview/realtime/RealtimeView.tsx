import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
} from "lucide-react";

export function RealtimeView() {
  const [isConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const liveStats = [
    {
      label: "Active Users",
      value: "1,247",
      icon: Users,
      status: "online",
    },
    {
      label: "Live Sessions",
      value: "834",
      icon: Activity,
      status: "online",
    },
    {
      label: "Messages/min",
      value: "127",
      icon: MessageSquare,
      status: "online",
    },
    {
      label: "Server Load",
      value: "67%",
      icon: Zap,
      status: "warning",
    },
  ];

  const recentEvents = [
    {
      id: 1,
      type: "user_login",
      message: "John Doe logged in",
      timestamp: "2 seconds ago",
      status: "success",
    },
    {
      id: 2,
      type: "error",
      message: "Database connection timeout",
      timestamp: "15 seconds ago",
      status: "error",
    },
    {
      id: 3,
      type: "user_action",
      message: "Jane Smith updated profile",
      timestamp: "32 seconds ago",
      status: "info",
    },
    {
      id: 4,
      type: "system",
      message: "Backup completed successfully",
      timestamp: "1 minute ago",
      status: "success",
    },
    {
      id: 5,
      type: "user_logout",
      message: "Mike Johnson logged out",
      timestamp: "2 minutes ago",
      status: "info",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
      case "warning":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Real-time Monitoring
          </h2>
          <p className="text-muted-foreground">
            Live system status and user activity
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isConnected ? "default" : "destructive"}>
            <div
              className={`h-2 w-2 rounded-full mr-2 ${
                isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            />
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                    <div
                      className={`h-2 w-2 rounded-full ${
                        stat.status === "online"
                          ? "bg-green-500 animate-pulse"
                          : stat.status === "warning"
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Live Activity Feed
          </CardTitle>
          <CardDescription>
            Real-time events and system activities
            <span className="ml-2 text-xs">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {recentEvents.map((event) => {
              const StatusIcon = getStatusIcon(event.status);
              return (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border">
                  <StatusIcon
                    className={`h-4 w-4 mt-0.5 ${getStatusColor(event.status)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type.replace("_", " ")}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
          <CardDescription>
            Real-time connection and data streaming status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium">WebSocket</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium">API Gateway</p>
                <p className="text-xs text-muted-foreground">Slow response</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
