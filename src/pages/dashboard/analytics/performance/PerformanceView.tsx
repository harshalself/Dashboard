import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Zap,
  Server,
  Gauge,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Monitor,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Download,
  Upload,
  Activity,
} from "lucide-react";

export function PerformanceView() {
  const performanceMetrics = [
    {
      title: "Page Load Time",
      value: "1.4s",
      target: "< 2.0s",
      status: "good",
      change: "-0.2s",
      trend: "up",
      icon: Clock,
    },
    {
      title: "First Contentful Paint",
      value: "0.8s",
      target: "< 1.0s",
      status: "excellent",
      change: "-0.1s",
      trend: "up",
      icon: Zap,
    },
    {
      title: "Time to Interactive",
      value: "2.1s",
      target: "< 3.0s",
      status: "good",
      change: "+0.3s",
      trend: "down",
      icon: Monitor,
    },
    {
      title: "Cumulative Layout Shift",
      value: "0.08",
      target: "< 0.1",
      status: "good",
      change: "+0.02",
      trend: "down",
      icon: Activity,
    },
  ];

  const serverMetrics = [
    {
      name: "CPU Usage",
      value: 67,
      status: "warning",
      icon: Cpu,
      unit: "%",
      threshold: 80,
    },
    {
      name: "Memory Usage",
      value: 45,
      status: "good",
      icon: MemoryStick,
      unit: "%",
      threshold: 85,
    },
    {
      name: "Disk Usage",
      value: 32,
      status: "good",
      icon: HardDrive,
      unit: "%",
      threshold: 90,
    },
    {
      name: "Network I/O",
      value: 78,
      status: "warning",
      icon: Wifi,
      unit: "Mbps",
      threshold: 100,
    },
  ];

  const endpointPerformance = [
    {
      endpoint: "/api/users",
      avgResponse: "245ms",
      p95: "580ms",
      requests: 12543,
      errors: 23,
      status: "good",
    },
    {
      endpoint: "/api/dashboard",
      avgResponse: "156ms",
      p95: "320ms",
      requests: 8921,
      errors: 5,
      status: "excellent",
    },
    {
      endpoint: "/api/analytics",
      avgResponse: "1.2s",
      p95: "2.8s",
      requests: 4532,
      errors: 134,
      status: "warning",
    },
    {
      endpoint: "/api/reports",
      avgResponse: "3.4s",
      p95: "7.2s",
      requests: 1876,
      errors: 87,
      status: "critical",
    },
    {
      endpoint: "/api/settings",
      avgResponse: "89ms",
      p95: "200ms",
      requests: 2341,
      errors: 2,
      status: "excellent",
    },
  ];

  const databasePerformance = [
    {
      query: "User Authentication",
      avgTime: "12ms",
      executions: 15234,
      slowQueries: 45,
      status: "good",
    },
    {
      query: "Dashboard Data",
      avgTime: "34ms",
      executions: 8932,
      slowQueries: 12,
      status: "good",
    },
    {
      query: "Analytics Aggregation",
      avgTime: "456ms",
      executions: 2341,
      slowQueries: 234,
      status: "warning",
    },
    {
      query: "Report Generation",
      avgTime: "1.2s",
      executions: 876,
      slowQueries: 167,
      status: "critical",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      case "critical":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Performance Metrics
          </h2>
          <p className="text-muted-foreground">
            Monitor application performance, server health, and optimization
            opportunities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="1h">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    {metric.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }>
                      {metric.change}
                    </span>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Target: {metric.target}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="server" className="space-y-4">
        <TabsList>
          <TabsTrigger value="server">Server Health</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="database">Database Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serverMetrics.map((metric) => {
              const Icon = metric.icon;
              const status =
                metric.value > metric.threshold
                  ? "critical"
                  : metric.value > metric.threshold * 0.8
                  ? "warning"
                  : "good";

              return (
                <Card key={metric.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {metric.unit}
                      </span>
                    </div>
                    <Progress
                      value={
                        metric.name === "Network I/O"
                          ? (metric.value / metric.threshold) * 100
                          : metric.value
                      }
                      className="mt-2 h-2"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Threshold: {metric.threshold}
                        {metric.unit}
                      </span>
                      <Badge className={getStatusColor(status)}>
                        {getStatusIcon(status)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Server Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-semibold text-green-600">99.97%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-semibold">156ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-semibold text-yellow-600">0.03%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Throughput</span>
                    <span className="font-semibold">2.4k req/min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Load Average</span>
                    <span className="font-semibold">2.34</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                Response times and error rates for API endpoints
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpointPerformance.map((endpoint) => (
                  <div
                    key={endpoint.endpoint}
                    className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {getStatusIcon(endpoint.status)}
                          {endpoint.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {endpoint.requests.toLocaleString()} requests,{" "}
                        {endpoint.errors} errors
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Avg Response</p>
                        <p className="font-semibold">{endpoint.avgResponse}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">95th Percentile</p>
                        <p className="font-semibold">{endpoint.p95}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Database Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="font-semibold">47/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Query Cache Hit Rate</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Query Time</span>
                    <span className="font-semibold">89ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slow Queries</span>
                    <span className="font-semibold text-yellow-600">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage & Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Size</span>
                    <span className="font-semibold">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Index Efficiency</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Table Scans</span>
                    <span className="font-semibold">156/hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lock Waits</span>
                    <span className="font-semibold text-red-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Query Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {databasePerformance.map((query) => (
                  <div
                    key={query.query}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{query.query}</span>
                        <Badge className={getStatusColor(query.status)}>
                          {query.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {query.executions.toLocaleString()} executions,{" "}
                        {query.slowQueries} slow queries
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{query.avgTime}</p>
                      <p className="text-sm text-muted-foreground">avg time</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Optimize Database Queries
                      </p>
                      <p className="text-sm text-yellow-700">
                        Report generation queries are taking too long. Consider
                        adding indexes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">
                        Enable Browser Caching
                      </p>
                      <p className="text-sm text-blue-700">
                        Static assets can be cached longer to improve load
                        times.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">High CPU Usage</p>
                      <p className="text-sm text-red-700">
                        Server CPU usage is consistently above 65%. Consider
                        scaling up.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Bandwidth Usage</span>
                      <span className="text-sm font-semibold">
                        78% of limit
                      </span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-semibold">
                        45% of limit
                      </span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">API Rate Limit</span>
                      <span className="text-sm font-semibold">
                        23% of limit
                      </span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Database Connections</span>
                      <span className="text-sm font-semibold">
                        47% of limit
                      </span>
                    </div>
                    <Progress value={47} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
