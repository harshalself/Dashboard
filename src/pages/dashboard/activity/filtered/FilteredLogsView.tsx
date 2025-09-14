import { useState, useEffect, useCallback, useMemo } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Users,
  FileText,
  Settings,
  AlertCircle,
  Shield,
  Database,
  Filter,
  Search,
  Download,
  X,
  Save,
  BarChart3,
  Clock,
  Globe,
  Activity,
  Trash2,
  Eye,
} from "lucide-react";

interface FilterCriteria {
  type: string;
  status: string;
  severity: string;
  dateRange: string;
  customDateStart?: Date;
  customDateEnd?: Date;
  searchTerm: string;
  user: string;
  ipAddress: string;
  resource: string;
  includeMetadata: boolean;
}

interface SavedFilter {
  id: string;
  name: string;
  description: string;
  criteria: FilterCriteria;
  createdAt: string;
}

interface ActivityLog {
  id: number;
  type: "user" | "system" | "security" | "data" | "api" | "network";
  category: string;
  action: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  severity: "low" | "medium" | "high" | "critical";
  user?: string;
  ip?: string;
  resource?: string;
  location?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

interface FilterStats {
  totalLogs: number;
  filteredLogs: number;
  successCount: number;
  warningCount: number;
  errorCount: number;
  infoCount: number;
  averageResponseTime?: number;
  topUsers: { user: string; count: number }[];
  topResources: { resource: string; count: number }[];
}

export function FilteredLogsView() {
  const [filters, setFilters] = useState<FilterCriteria>({
    type: "all",
    status: "all",
    severity: "all",
    dateRange: "7d",
    searchTerm: "",
    user: "",
    ipAddress: "",
    resource: "",
    includeMetadata: false,
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<FilterStats>({
    totalLogs: 0,
    filteredLogs: 0,
    successCount: 0,
    warningCount: 0,
    errorCount: 0,
    infoCount: 0,
    topUsers: [],
    topResources: [],
  });
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [saveFilterName, setSaveFilterName] = useState("");
  const [saveFilterDesc, setSaveFilterDesc] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Mock data for demonstration
  const allLogs: ActivityLog[] = useMemo(
    () => [
      {
        id: 1,
        type: "user",
        category: "Authentication",
        action: "User Login",
        description: "John Doe logged into the system",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "success",
        severity: "low",
        user: "John Doe",
        ip: "192.168.1.100",
        resource: "Dashboard",
        location: "New York, US",
        duration: 1250,
        metadata: { browser: "Chrome", os: "Windows" },
      },
      {
        id: 2,
        type: "system",
        category: "Maintenance",
        action: "Database Backup",
        description: "Automated backup completed successfully",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        status: "success",
        severity: "medium",
        resource: "PostgreSQL",
        duration: 45000,
        metadata: { size: "2.4GB", compression: "gzip" },
      },
      {
        id: 3,
        type: "security",
        category: "Authentication",
        action: "Failed Login Attempt",
        description: "Multiple failed login attempts detected from IP",
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        status: "warning",
        severity: "high",
        ip: "203.0.113.42",
        location: "Unknown",
        resource: "Login API",
        metadata: { attempts: 5, blocked: true },
      },
      {
        id: 4,
        type: "data",
        category: "Content",
        action: "File Upload",
        description: "Large file uploaded to server",
        timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        status: "success",
        severity: "low",
        user: "Sarah Smith",
        resource: "File Storage",
        location: "London, UK",
        duration: 8000,
        metadata: { fileSize: "15.2MB", fileType: "video/mp4" },
      },
      {
        id: 5,
        type: "system",
        category: "Service",
        action: "Service Error",
        description: "Email service temporarily unavailable",
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        status: "error",
        severity: "critical",
        resource: "Email Service",
        metadata: { errorCode: "SMTP_TIMEOUT", retries: 3 },
      },
      {
        id: 6,
        type: "user",
        category: "Profile",
        action: "Profile Update",
        description: "User updated their profile settings",
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        status: "info",
        severity: "low",
        user: "Mike Johnson",
        resource: "User Profile",
        location: "Tokyo, JP",
        metadata: { fields: ["email", "phone"], source: "web" },
      },
      {
        id: 7,
        type: "api",
        category: "Integration",
        action: "API Request",
        description: "External API call executed",
        timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        status: "success",
        severity: "low",
        ip: "198.51.100.25",
        resource: "/api/v1/users",
        duration: 230,
        metadata: { method: "GET", statusCode: 200, responseSize: "1.2KB" },
      },
      {
        id: 8,
        type: "network",
        category: "Infrastructure",
        action: "Network Event",
        description: "High network traffic detected",
        timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
        status: "warning",
        severity: "medium",
        resource: "Load Balancer",
        metadata: { throughput: "850Mbps", threshold: "800Mbps" },
      },
      {
        id: 9,
        type: "security",
        category: "Access Control",
        action: "Permission Denied",
        description: "User attempted to access restricted resource",
        timestamp: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
        status: "warning",
        severity: "medium",
        user: "Jane Wilson",
        ip: "10.0.0.50",
        resource: "/admin/settings",
        location: "Berlin, DE",
        metadata: { requiredRole: "admin", userRole: "editor" },
      },
      {
        id: 10,
        type: "data",
        category: "Backup",
        action: "Data Export",
        description: "User exported data for compliance audit",
        timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
        status: "info",
        severity: "low",
        user: "Admin User",
        resource: "Export Service",
        duration: 15000,
        metadata: { exportType: "CSV", recordCount: 1250 },
      },
    ],
    []
  );

  const applyFilters = useCallback(() => {
    let filtered = [...allLogs];
    const active: string[] = [];

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((log) => log.type === filters.type);
      active.push(`Type: ${filters.type}`);
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((log) => log.status === filters.status);
      active.push(`Status: ${filters.status}`);
    }

    // Filter by severity
    if (filters.severity !== "all") {
      filtered = filtered.filter((log) => log.severity === filters.severity);
      active.push(`Severity: ${filters.severity}`);
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          log.description
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          log.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
      active.push(`Search: "${filters.searchTerm}"`);
    }

    // Filter by user
    if (filters.user) {
      filtered = filtered.filter((log) =>
        log.user?.toLowerCase().includes(filters.user.toLowerCase())
      );
      active.push(`User: ${filters.user}`);
    }

    // Filter by IP address
    if (filters.ipAddress) {
      filtered = filtered.filter((log) => log.ip?.includes(filters.ipAddress));
      active.push(`IP: ${filters.ipAddress}`);
    }

    // Filter by resource
    if (filters.resource) {
      filtered = filtered.filter((log) =>
        log.resource?.toLowerCase().includes(filters.resource.toLowerCase())
      );
      active.push(`Resource: ${filters.resource}`);
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const now = new Date();
      const cutoff = new Date();

      switch (filters.dateRange) {
        case "1h":
          cutoff.setHours(now.getHours() - 1);
          break;
        case "24h":
          cutoff.setDate(now.getDate() - 1);
          break;
        case "7d":
          cutoff.setDate(now.getDate() - 7);
          break;
        case "30d":
          cutoff.setDate(now.getDate() - 30);
          break;
      }

      filtered = filtered.filter((log) => new Date(log.timestamp) >= cutoff);
      if (filters.dateRange !== "all") {
        active.push(`Last ${filters.dateRange}`);
      }
    }

    // Calculate stats
    const newStats: FilterStats = {
      totalLogs: allLogs.length,
      filteredLogs: filtered.length,
      successCount: filtered.filter((log) => log.status === "success").length,
      warningCount: filtered.filter((log) => log.status === "warning").length,
      errorCount: filtered.filter((log) => log.status === "error").length,
      infoCount: filtered.filter((log) => log.status === "info").length,
      averageResponseTime:
        filtered.reduce((acc, log) => acc + (log.duration || 0), 0) /
        filtered.length,
      topUsers: getTopUsers(filtered),
      topResources: getTopResources(filtered),
    };

    setFilteredLogs(filtered);
    setActiveFilters(active);
    setStats(newStats);
  }, [allLogs, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const getTopUsers = (logs: ActivityLog[]) => {
    const userCounts: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.user) {
        userCounts[log.user] = (userCounts[log.user] || 0) + 1;
      }
    });
    return Object.entries(userCounts)
      .map(([user, count]) => ({ user, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getTopResources = (logs: ActivityLog[]) => {
    const resourceCounts: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.resource) {
        resourceCounts[log.resource] = (resourceCounts[log.resource] || 0) + 1;
      }
    });
    return Object.entries(resourceCounts)
      .map(([resource, count]) => ({ resource, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const clearFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      severity: "all",
      dateRange: "7d",
      searchTerm: "",
      user: "",
      ipAddress: "",
      resource: "",
      includeMetadata: false,
    });
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith("Type:")) {
      setFilters({ ...filters, type: "all" });
    } else if (filterToRemove.startsWith("Status:")) {
      setFilters({ ...filters, status: "all" });
    } else if (filterToRemove.startsWith("Severity:")) {
      setFilters({ ...filters, severity: "all" });
    } else if (filterToRemove.startsWith("Search:")) {
      setFilters({ ...filters, searchTerm: "" });
    } else if (filterToRemove.startsWith("User:")) {
      setFilters({ ...filters, user: "" });
    } else if (filterToRemove.startsWith("IP:")) {
      setFilters({ ...filters, ipAddress: "" });
    } else if (filterToRemove.startsWith("Resource:")) {
      setFilters({ ...filters, resource: "" });
    } else if (filterToRemove.startsWith("Last")) {
      setFilters({ ...filters, dateRange: "all" });
    }
  };

  const saveFilter = () => {
    if (!saveFilterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: saveFilterName,
      description: saveFilterDesc,
      criteria: { ...filters },
      createdAt: new Date().toISOString(),
    };

    setSavedFilters([...savedFilters, newFilter]);
    setSaveFilterName("");
    setSaveFilterDesc("");
    setShowSaveDialog(false);
  };

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.criteria);
  };

  const deleteSavedFilter = (filterId: string) => {
    setSavedFilters(savedFilters.filter((f) => f.id !== filterId));
  };

  const exportLogs = (format: "csv" | "json") => {
    if (format === "csv") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Timestamp,Type,Category,Action,Description,Status,Severity,User,IP,Resource,Location,Duration\n" +
        filteredLogs
          .map(
            (log) =>
              `${log.timestamp},${log.type},${log.category},${log.action},"${
                log.description
              }",${log.status},${log.severity},${log.user || ""},${
                log.ip || ""
              },${log.resource || ""},${log.location || ""},${
                log.duration || ""
              }`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `filtered_activity_logs_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "json") {
      const dataStr = JSON.stringify(filteredLogs, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = `filtered_activity_logs_${
        new Date().toISOString().split("T")[0]
      }.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return Users;
      case "system":
        return Settings;
      case "security":
        return Shield;
      case "data":
        return Database;
      case "api":
        return Globe;
      case "network":
        return Activity;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "info":
      default:
        return "bg-blue-100 text-blue-800";
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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return "N/A";
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Advanced Log Filtering
          </h2>
          <p className="text-muted-foreground">
            Search and filter activity logs with comprehensive criteria and
            analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => exportLogs("csv")}
            disabled={filteredLogs.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => exportLogs("json")}
            disabled={filteredLogs.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Filtered Results
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.filteredLogs}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalLogs} total logs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.filteredLogs > 0
                ? Math.round((stats.successCount / stats.filteredLogs) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.successCount} successful events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.warningCount}
            </div>
            <p className="text-xs text-muted-foreground">Warning events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.errorCount}
            </div>
            <p className="text-xs text-muted-foreground">Error events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.averageResponseTime
                ? formatDuration(stats.averageResponseTime)
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Average duration</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Filters</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
          <TabsTrigger value="saved">Saved Filters</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          {/* Basic Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Basic Filter Controls
              </CardTitle>
              <CardDescription>
                Use basic controls to filter activity logs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Activity Type</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      setFilters({ ...filters, type: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
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
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters({ ...filters, status: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={filters.severity}
                    onValueChange={(value) =>
                      setFilters({ ...filters, severity: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
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

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) =>
                      setFilters({ ...filters, dateRange: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs by action, description, or category..."
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters({ ...filters, searchTerm: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Button onClick={() => setShowSaveDialog(true)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Filters</CardTitle>
              <CardDescription>
                Use advanced criteria for precise log filtering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>User</Label>
                  <Input
                    placeholder="Filter by username..."
                    value={filters.user}
                    onChange={(e) =>
                      setFilters({ ...filters, user: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>IP Address</Label>
                  <Input
                    placeholder="Filter by IP address..."
                    value={filters.ipAddress}
                    onChange={(e) =>
                      setFilters({ ...filters, ipAddress: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Resource</Label>
                  <Input
                    placeholder="Filter by resource..."
                    value={filters.resource}
                    onChange={(e) =>
                      setFilters({ ...filters, resource: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMetadata"
                  checked={filters.includeMetadata}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, includeMetadata: !!checked })
                  }
                />
                <Label htmlFor="includeMetadata">
                  Include metadata in search
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Filters</CardTitle>
              <CardDescription>
                Manage your saved filter configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedFilters.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No saved filters yet. Create and save filter configurations
                  for quick access.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedFilters.map((savedFilter) => (
                    <div
                      key={savedFilter.id}
                      className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{savedFilter.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {savedFilter.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created:{" "}
                          {new Date(savedFilter.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadSavedFilter(savedFilter)}>
                          <Filter className="h-4 w-4 mr-1" />
                          Load
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSavedFilter(savedFilter.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <CardDescription>
                  Most active users in filtered results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.topUsers.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No user data available
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.topUsers.map((userStat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between">
                        <span className="text-sm">{userStat.user}</span>
                        <Badge variant="secondary">{userStat.count}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Resources</CardTitle>
                <CardDescription>
                  Most accessed resources in filtered results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.topResources.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No resource data available
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.topResources.map((resourceStat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between">
                        <span className="text-sm truncate">
                          {resourceStat.resource}
                        </span>
                        <Badge variant="secondary">{resourceStat.count}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-medium">Active Filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeFilter(filter)}>
                  {filter}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Filtered Results</span>
            <Badge variant="secondary">
              {filteredLogs.length} of {allLogs.length} logs
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {filteredLogs.map((log) => {
                const Icon = getIcon(log.type);
                return (
                  <div
                    key={log.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 p-2 rounded-full bg-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium">{log.action}</h4>
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`${getSeverityColor(
                              log.severity
                            )} text-xs`}>
                            {log.severity}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="capitalize text-xs">
                            {log.type}
                          </Badge>
                          <Badge
                            className={`${getStatusColor(log.status)} text-xs`}>
                            {log.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {log.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          {log.user && <span>User: {log.user}</span>}
                          {log.ip && <span>IP: {log.ip}</span>}
                          {log.resource && (
                            <span>Resource: {log.resource}</span>
                          )}
                          {log.location && (
                            <span>Location: {log.location}</span>
                          )}
                          {log.duration && (
                            <span>
                              Duration: {formatDuration(log.duration)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      {filters.includeMetadata && log.metadata && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <details className="cursor-pointer">
                            <summary>Metadata</summary>
                            <pre className="mt-1 p-2 bg-muted rounded text-xs">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              {filteredLogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No logs match your current filters
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Save Filter Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Filter Configuration</DialogTitle>
            <DialogDescription>
              Save your current filter settings for quick access later
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filterName">Filter Name</Label>
              <Input
                id="filterName"
                placeholder="Enter filter name..."
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterDescription">Description (optional)</Label>
              <Textarea
                id="filterDescription"
                placeholder="Describe what this filter is used for..."
                value={saveFilterDesc}
                onChange={(e) => setSaveFilterDesc(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveFilter} disabled={!saveFilterName.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Filter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
