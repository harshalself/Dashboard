import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Zap,
} from "lucide-react";

export function SystemStatusView() {
  const systemServices = [
    {
      name: "Web Server",
      status: "online",
      uptime: "99.9%",
      lastCheck: "2 minutes ago",
      icon: Server,
    },
    {
      name: "Database",
      status: "online",
      uptime: "99.8%",
      lastCheck: "1 minute ago",
      icon: Database,
    },
    {
      name: "API Gateway",
      status: "warning",
      uptime: "97.2%",
      lastCheck: "30 seconds ago",
      icon: Wifi,
    },
    {
      name: "File Storage",
      status: "online",
      uptime: "99.9%",
      lastCheck: "3 minutes ago",
      icon: HardDrive,
    },
    {
      name: "Background Jobs",
      status: "error",
      uptime: "85.1%",
      lastCheck: "5 minutes ago",
      icon: Zap,
    },
    {
      name: "Monitoring",
      status: "online",
      uptime: "99.7%",
      lastCheck: "1 minute ago",
      icon: Activity,
    },
  ];

  const systemMetrics = [
    {
      name: "CPU Usage",
      value: 67,
      unit: "%",
      status: "warning",
      icon: Cpu,
    },
    {
      name: "Memory Usage",
      value: 43,
      unit: "%",
      status: "normal",
      icon: MemoryStick,
    },
    {
      name: "Disk Usage",
      value: 28,
      unit: "%",
      status: "normal",
      icon: HardDrive,
    },
    {
      name: "Network I/O",
      value: 89,
      unit: "Mbps",
      status: "high",
      icon: Wifi,
    },
  ];

  const recentIncidents = [
    {
      id: 1,
      title: "Database Connection Pool Exhausted",
      severity: "high",
      status: "resolved",
      time: "2 hours ago",
      duration: "15 minutes",
    },
    {
      id: 2,
      title: "API Rate Limit Exceeded",
      severity: "medium",
      status: "investigating",
      time: "4 hours ago",
      duration: "ongoing",
    },
    {
      id: 3,
      title: "Scheduled Maintenance",
      severity: "low",
      status: "completed",
      time: "1 day ago",
      duration: "30 minutes",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "normal":
      case "resolved":
      case "completed":
        return "text-green-500";
      case "warning":
      case "medium":
      case "investigating":
        return "text-yellow-500";
      case "error":
      case "high":
        return "text-red-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "resolved":
      case "completed":
        return CheckCircle;
      case "warning":
      case "investigating":
        return AlertTriangle;
      case "error":
        return XCircle;
      default:
        return Clock;
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "online":
      case "resolved":
      case "completed":
        return "default";
      case "warning":
      case "investigating":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Status</h2>
          <p className="text-muted-foreground">
            Monitor your infrastructure health and performance
          </p>
        </div>
        <Badge variant="default">
          <CheckCircle className="mr-1 h-3 w-3" />
          All Systems Operational
        </Badge>
      </div>

      {/* System Services */}
      <Card>
        <CardHeader>
          <CardTitle>System Services</CardTitle>
          <CardDescription>
            Current status of all critical system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemServices.map((service, index) => {
              const Icon = service.icon;
              const StatusIcon = getStatusIcon(service.status);

              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <StatusIcon
                      className={`h-4 w-4 ${getStatusColor(service.status)}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime</span>
                      <span>{service.uptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Check</span>
                      <span>{service.lastCheck}</span>
                    </div>
                    <Badge
                      variant={getBadgeVariant(service.status)}
                      className="w-full justify-center">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>System Metrics</CardTitle>
          <CardDescription>
            Real-time system resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <span
                      className={`text-sm ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">
                        {metric.value}
                        {metric.unit}
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>
            Latest system incidents and maintenance activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => {
              const StatusIcon = getStatusIcon(incident.status);

              return (
                <div
                  key={incident.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg">
                  <StatusIcon
                    className={`h-5 w-5 mt-0.5 ${getStatusColor(
                      incident.status
                    )}`}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{incident.title}</h4>
                      <Badge variant={getBadgeVariant(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Status: {incident.status}</span>
                      <span>•</span>
                      <span>{incident.time}</span>
                      <span>•</span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
