import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Target,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Activity,
  ShoppingCart,
  MousePointer,
  Clock,
} from "lucide-react";

export function AnalyticsOverviewView() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+8%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Page Views",
      value: "12,234",
      change: "-3%",
      trend: "down",
      icon: Eye,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Bounce Rate",
      value: "42.1%",
      change: "-2.3%",
      trend: "up",
      icon: MousePointer,
      description: "vs last month",
    },
    {
      title: "Avg Session",
      value: "3m 24s",
      change: "+15s",
      trend: "up",
      icon: Clock,
      description: "vs last month",
    },
    {
      title: "Total Orders",
      value: "1,429",
      change: "+23%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "Goal Completions",
      value: "89",
      change: "+12%",
      trend: "up",
      icon: Target,
      description: "vs last month",
    },
  ];

  const topPages = [
    { page: "/dashboard", views: 4521, bounce: "35%", time: "4m 12s" },
    { page: "/analytics", views: 3892, bounce: "42%", time: "3m 45s" },
    { page: "/users", views: 2641, bounce: "28%", time: "5m 23s" },
    { page: "/settings", views: 1854, bounce: "51%", time: "2m 18s" },
    { page: "/reports", views: 1432, bounce: "39%", time: "3m 56s" },
  ];

  const trafficSources = [
    { source: "Direct", visitors: 12450, percentage: 35, color: "bg-blue-500" },
    {
      source: "Organic Search",
      visitors: 9832,
      percentage: 28,
      color: "bg-green-500",
    },
    {
      source: "Social Media",
      visitors: 6721,
      percentage: 19,
      color: "bg-purple-500",
    },
    {
      source: "Paid Ads",
      visitors: 4235,
      percentage: 12,
      color: "bg-orange-500",
    },
    { source: "Email", visitors: 2156, percentage: 6, color: "bg-pink-500" },
  ];

  const recentGoals = [
    {
      name: "Newsletter Signups",
      current: 425,
      target: 500,
      percentage: 85,
      status: "On Track",
      color: "text-green-600",
    },
    {
      name: "Product Demo Requests",
      current: 89,
      target: 100,
      percentage: 89,
      status: "At Risk",
      color: "text-yellow-600",
    },
    {
      name: "Premium Upgrades",
      current: 34,
      target: 50,
      percentage: 68,
      status: "Behind",
      color: "text-red-600",
    },
    {
      name: "Support Tickets Resolved",
      current: 167,
      target: 150,
      percentage: 111,
      status: "Exceeded",
      color: "text-green-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-muted-foreground">
            Comprehensive view of your business metrics and performance
            indicators
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }>
                    {kpi.change}
                  </span>
                  <span className="ml-1">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="goals">Goals Progress</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Users</span>
                    <span className="text-2xl font-bold text-green-600">
                      127
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Sessions</span>
                    <span className="text-lg font-semibold">98</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pages/Session</span>
                    <span className="text-lg font-semibold">3.4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Growth</span>
                    <Badge className="bg-green-100 text-green-800">+8.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Growth</span>
                    <Badge className="bg-blue-100 text-blue-800">+24.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quarterly Growth</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      +67.8%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <p className="text-sm text-muted-foreground">
                Breakdown of visitors by acquisition channel
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${source.color}`}></div>
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">
                          {source.visitors.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({source.percentage}%)
                        </span>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {recentGoals.map((goal) => (
              <Card key={goal.name}>
                <CardHeader>
                  <CardTitle className="text-base">{goal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <span className="font-semibold">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <Progress value={goal.percentage} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {goal.percentage}% complete
                      </span>
                      <Badge variant="secondary" className={goal.color}>
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <p className="text-sm text-muted-foreground">
                Most visited pages and their performance metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={page.page}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          {page.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Bounce Rate</p>
                        <p className="font-semibold">{page.bounce}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Avg. Time</p>
                        <p className="font-semibold">{page.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
