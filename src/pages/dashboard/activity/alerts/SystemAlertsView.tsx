import { useState } from "react";
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
  AlertTriangle,
  AlertCircle,
  Shield,
  Server,
  Database,
  Wifi,
  HardDrive,
  Activity,
  Bell,
  BellOff,
  CheckCircle,
  X,
  Clock,
} from "lucide-react";

interface SystemAlert {
  id: number;
  type: "critical" | "warning" | "info";
  category: "security" | "performance" | "system" | "network" | "storage";
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  source: string;
  affectedServices?: string[];
  recommendedActions?: string[];
}

export function SystemAlertsView() {
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: 1,
      type: "critical",
      category: "security",
      title: "Multiple Failed Login Attempts Detected",
      description: "Unusual login activity detected from multiple IP addresses",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      resolved: false,
      source: "Authentication System",
      affectedServices: ["User Authentication", "Admin Panel"],
      recommendedActions: [
        "Review login logs",
        "Consider IP blocking",
        "Enable two-factor authentication",
      ],
    },
    {
      id: 2,
      type: "warning",
      category: "performance",
      title: "High CPU Usage Detected",
      description: "CPU usage has exceeded 85% for more than 15 minutes",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      resolved: false,
      source: "Performance Monitor",
      affectedServices: ["Web Application", "Background Jobs"],
      recommendedActions: [
        "Check running processes",
        "Scale resources if needed",
        "Optimize high-usage applications",
      ],
    },
    {
      id: 3,
      type: "critical",
      category: "storage",
      title: "Low Disk Space Warning",
      description: "Available disk space is below 10% on primary drive",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      resolved: false,
      source: "Storage Monitor",
      affectedServices: ["Database", "File Storage", "Backups"],
      recommendedActions: [
        "Clean up temporary files",
        "Archive old logs",
        "Consider storage expansion",
      ],
    },
    {
      id: 4,
      type: "warning",
      category: "network",
      title: "API Response Time Increased",
      description: "Average API response time has increased by 40%",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      resolved: false,
      source: "API Gateway",
      affectedServices: ["REST API", "GraphQL API"],
      recommendedActions: [
        "Check database performance",
        "Review API endpoints",
        "Monitor network latency",
      ],
    },
    {
      id: 5,
      type: "info",
      category: "system",
      title: "Scheduled Maintenance Completed",
      description: "Database optimization and backup completed successfully",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      resolved: true,
      source: "Maintenance System",
      affectedServices: ["Database", "Backup Service"],
    },
    {
      id: 6,
      type: "warning",
      category: "security",
      title: "SSL Certificate Expiring Soon",
      description: "SSL certificate will expire in 7 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      resolved: false,
      source: "Certificate Monitor",
      affectedServices: ["Web Application", "API Gateway"],
      recommendedActions: [
        "Renew SSL certificate",
        "Update certificate in load balancer",
        "Test HTTPS endpoints",
      ],
    },
  ]);

  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">(
    "all"
  );
  const [showResolved, setShowResolved] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType = filter === "all" || alert.type === filter;
    const matchesResolved = showResolved || !alert.resolved;
    return matchesType && matchesResolved;
  });

  const resolveAlert = (alertId: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  const getAlertIcon = (type: string, category: string) => {
    if (type === "critical") return AlertTriangle;
    if (type === "warning") return AlertCircle;

    switch (category) {
      case "security":
        return Shield;
      case "performance":
        return Activity;
      case "system":
        return Server;
      case "network":
        return Wifi;
      case "storage":
        return HardDrive;
      default:
        return AlertCircle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const criticalCount = alerts.filter(
    (a) => a.type === "critical" && !a.resolved
  ).length;
  const warningCount = alerts.filter(
    (a) => a.type === "warning" && !a.resolved
  ).length;
  const unresolvedCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Alerts</h1>
          <p className="text-muted-foreground">
            Monitor system alerts, warnings, and critical notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
            {notificationsEnabled ? (
              <Bell className="h-4 w-4 mr-2" />
            ) : (
              <BellOff className="h-4 w-4 mr-2" />
            )}
            {notificationsEnabled ? "Notifications On" : "Notifications Off"}
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Alerts
                </p>
                <p className="text-2xl font-bold">{filteredAlerts.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Critical
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {criticalCount}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Warnings
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {warningCount}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Unresolved
                </p>
                <p className="text-2xl font-bold">{unresolvedCount}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Filter by type:</span>
              {["all", "critical", "warning", "info"].map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type as typeof filter)}
                  className="capitalize">
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showResolved"
                checked={showResolved}
                onChange={(e) => setShowResolved(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showResolved" className="text-sm">
                Show resolved alerts
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>
            {filteredAlerts.length} alert
            {filteredAlerts.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type, alert.category);
                return (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${
                      alert.resolved ? "opacity-60" : ""
                    }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${getAlertColor(
                            alert.type
                          )}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {alert.title}
                            </h3>
                            <Badge className={getBadgeColor(alert.type)}>
                              {alert.type}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {alert.category}
                            </Badge>
                            {alert.resolved && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground space-x-4 mb-3">
                            <span>Source: {alert.source}</span>
                            <span>{formatTime(alert.timestamp)}</span>
                          </div>

                          {alert.affectedServices && (
                            <div className="mb-3">
                              <p className="text-xs font-medium mb-1">
                                Affected Services:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {alert.affectedServices.map(
                                  (service, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs">
                                      {service}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {alert.recommendedActions && !alert.resolved && (
                            <div>
                              <p className="text-xs font-medium mb-1">
                                Recommended Actions:
                              </p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {alert.recommendedActions.map(
                                  (action, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center">
                                      <span className="w-1 h-1 rounded-full bg-muted-foreground mr-2" />
                                      {action}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!alert.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveAlert(alert.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissAlert(alert.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                  <p>No alerts match your current filters</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
