import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Input } from "../../../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";
import {
  Users,
  FileText,
  Settings,
  Clock,
  RefreshCw,
  Eye,
  Search,
  Filter,
  Download,
  Activity,
  Shield,
  Database,
  Globe,
} from "lucide-react";

interface ActivityLog {
  id: number;
  type: "user" | "system" | "security" | "data" | "network" | "api";
  category: string;
  action: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  severity: "low" | "medium" | "high" | "critical";
  icon: typeof Users;
  user?: string;
  ip?: string;
  location?: string;
  resource?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

interface ActivityStats {
  total: number;
  success: number;
  warning: number;
  error: number;
  info: number;
  lastHour: number;
  userActions: number;
  systemEvents: number;
}

export function RecentActivityView() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>(
    []
  );
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [showRealtime, setShowRealtime] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");
  const [stats, setStats] = useState<ActivityStats>({
    total: 0,
    success: 0,
    warning: 0,
    error: 0,
    info: 0,
    lastHour: 0,
    userActions: 0,
    systemEvents: 0,
  });

  // Mock activity data
  const generateMockActivities = (): ActivityLog[] => [
    {
      id: 1,
      type: "user",
      category: "Authentication",
      action: "User Login",
      description: "John Doe logged into the system",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      status: "success",
      severity: "low",
      icon: Users,
      user: "John Doe",
      ip: "192.168.1.100",
      location: "New York, US",
      resource: "Dashboard",
      duration: 2340,
    },
    {
      id: 2,
      type: "system",
      category: "Maintenance",
      action: "Database Backup",
      description: "Automated database backup completed successfully",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "success",
      severity: "medium",
      icon: Database,
      duration: 45000,
    },
    {
      id: 3,
      type: "user",
      category: "Profile",
      action: "Profile Update",
      description: "Sarah Smith updated her profile information",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "info",
      severity: "low",
      icon: Users,
      user: "Sarah Smith",
      ip: "192.168.1.101",
      location: "London, UK",
      resource: "User Profile",
    },
    {
      id: 4,
      type: "security",
      category: "Authentication",
      action: "Failed Login Attempt",
      description: "Multiple failed login attempts detected",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: "warning",
      severity: "high",
      icon: Shield,
      ip: "203.0.113.42",
      location: "Unknown",
      metadata: { attempts: 5, blocked: true },
    },
    {
      id: 5,
      type: "data",
      category: "Content",
      action: "File Upload",
      description: "Mike Johnson uploaded a new document",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: "success",
      severity: "low",
      icon: FileText,
      user: "Mike Johnson",
      ip: "192.168.1.102",
      location: "Tokyo, JP",
      resource: "Documents",
      metadata: { fileSize: "2.4MB", fileType: "PDF" },
    },
    {
      id: 6,
      type: "system",
      category: "Configuration",
      action: "Configuration Change",
      description: "System settings were modified by administrator",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      status: "info",
      severity: "medium",
      icon: Settings,
      user: "Admin",
      resource: "System Settings",
    },
    {
      id: 7,
      type: "user",
      category: "Security",
      action: "Password Reset",
      description: "Emma Wilson requested a password reset",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "info",
      severity: "low",
      icon: Users,
      user: "Emma Wilson",
      location: "Berlin, DE",
      resource: "Account Settings",
    },
    {
      id: 8,
      type: "system",
      category: "Maintenance",
      action: "Maintenance Mode",
      description: "System entered maintenance mode for updates",
      timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      status: "warning",
      severity: "critical",
      icon: Settings,
      duration: 1800000,
    },
    {
      id: 9,
      type: "api",
      category: "Integration",
      action: "API Request",
      description: "External service made API call",
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      status: "success",
      severity: "low",
      icon: Globe,
      ip: "198.51.100.25",
      resource: "/api/v1/users",
      duration: 150,
      metadata: { method: "GET", status: 200 },
    },
    {
      id: 10,
      type: "network",
      category: "Infrastructure",
      action: "Network Connection",
      description: "New device connected to network",
      timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
      status: "info",
      severity: "low",
      icon: Activity,
      ip: "192.168.1.150",
      location: "Office Network",
      metadata: { device: "iPhone 14", mac: "00:11:22:33:44:55" },
    },
  ];

  useEffect(() => {
    const mockActivities = generateMockActivities();
    setActivities(mockActivities);

    // Calculate stats
    const newStats: ActivityStats = {
      total: mockActivities.length,
      success: mockActivities.filter((a) => a.status === "success").length,
      warning: mockActivities.filter((a) => a.status === "warning").length,
      error: mockActivities.filter((a) => a.status === "error").length,
      info: mockActivities.filter((a) => a.status === "info").length,
      lastHour: mockActivities.filter((a) => {
        const activityTime = new Date(a.timestamp);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return activityTime > oneHourAgo;
      }).length,
      userActions: mockActivities.filter((a) => a.type === "user").length,
      systemEvents: mockActivities.filter((a) =>
        ["system", "security", "network"].includes(a.type)
      ).length,
    };
    setStats(newStats);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const mockActivities = generateMockActivities();
      setActivities(mockActivities);
      setLastUpdate(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter activities based on search and filters
  useEffect(() => {
    let filtered = activities;

    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((activity) => activity.type === selectedType);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (activity) => activity.status === selectedStatus
      );
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter(
        (activity) => activity.severity === selectedSeverity
      );
    }

    setFilteredActivities(filtered);
  }, [activities, searchTerm, selectedType, selectedStatus, selectedSeverity]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "info":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-purple-100 text-purple-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "data":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const refreshActivities = () => {
    const mockActivities = generateMockActivities();
    setActivities(mockActivities);
    setLastUpdate(new Date());
  };

  const exportActivities = () => {
    const dataStr = JSON.stringify(filteredActivities, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `activity-logs-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return null;
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-muted-foreground">
            Real-time system activities and user actions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <Button variant="outline" size="sm" onClick={exportActivities}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshActivities}
            disabled={autoRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All activity logs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lastHour}</div>
            <p className="text-xs text-muted-foreground">Recent activity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Actions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userActions}</div>
            <p className="text-xs text-muted-foreground">User initiated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Events</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemEvents}</div>
            <p className="text-xs text-muted-foreground">Automated events</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="feed">Activity Feed</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Label htmlFor="realtime" className="text-sm">
              Real-time
            </Label>
            <Switch
              id="realtime"
              checked={showRealtime}
              onCheckedChange={setShowRealtime}
            />
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}>
              {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
            </Button>
          </div>
        </div>

        <TabsContent value="feed" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Search and filter activity logs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search activities, users, or actions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedSeverity}
                  onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Activity Feed</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {filteredActivities.length} entries
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Latest system events and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div
                          className={`p-2 rounded-full ${getStatusColor(
                            activity.status
                          )}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium text-foreground">
                                {activity.action}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {activity.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={getSeverityColor(activity.severity)}>
                                {activity.severity}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getTypeColor(activity.type)}>
                                {activity.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(activity.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              {activity.user && (
                                <span>User: {activity.user}</span>
                              )}
                              {activity.ip && <span>IP: {activity.ip}</span>}
                              {activity.location && (
                                <span>Location: {activity.location}</span>
                              )}
                              {activity.resource && (
                                <span>Resource: {activity.resource}</span>
                              )}
                              {activity.duration && (
                                <span>
                                  Duration: {formatDuration(activity.duration)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>
                Chronological view of system activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
                <div className="space-y-6">
                  {filteredActivities.slice(0, 10).map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="relative flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-background ${getStatusColor(
                            activity.status
                          )} flex items-center justify-center`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium">
                              {activity.action}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                activity.timestamp
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                getSeverityColor(activity.severity) + " text-xs"
                              }>
                              {activity.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Success</span>
                    </div>
                    <span className="text-sm font-medium">{stats.success}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Warning</span>
                    </div>
                    <span className="text-sm font-medium">{stats.warning}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Error</span>
                    </div>
                    <span className="text-sm font-medium">{stats.error}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Info</span>
                    </div>
                    <span className="text-sm font-medium">{stats.info}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["user", "system", "security", "data", "api", "network"].map(
                    (type) => {
                      const count = activities.filter(
                        (a) => a.type === type
                      ).length;
                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between">
                          <span className="text-sm capitalize">{type}</span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
