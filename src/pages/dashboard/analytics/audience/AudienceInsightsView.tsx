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
  Users,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserPlus,
  UserMinus,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

export function AudienceInsightsView() {
  const audienceMetrics = [
    {
      title: "Total Users",
      value: "24,567",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "New Users",
      value: "3,284",
      change: "+12.5%",
      trend: "up",
      icon: UserPlus,
      description: "vs last month",
    },
    {
      title: "Returning Users",
      value: "21,283",
      change: "+6.8%",
      trend: "up",
      icon: UserCheck,
      description: "vs last month",
    },
    {
      title: "Churned Users",
      value: "1,156",
      change: "-4.2%",
      trend: "up",
      icon: UserMinus,
      description: "vs last month",
    },
  ];

  const demographics = [
    { age: "18-24", percentage: 18, count: 4421, color: "bg-blue-500" },
    { age: "25-34", percentage: 32, count: 7861, color: "bg-green-500" },
    { age: "35-44", percentage: 25, count: 6142, color: "bg-yellow-500" },
    { age: "45-54", percentage: 15, count: 3685, color: "bg-purple-500" },
    { age: "55+", percentage: 10, count: 2457, color: "bg-red-500" },
  ];

  const devices = [
    {
      device: "Desktop",
      users: 14567,
      percentage: 59.3,
      sessions: 18234,
      color: "bg-blue-500",
    },
    {
      device: "Mobile",
      users: 8234,
      percentage: 33.5,
      sessions: 12456,
      color: "bg-green-500",
    },
    {
      device: "Tablet",
      users: 1766,
      percentage: 7.2,
      sessions: 2134,
      color: "bg-purple-500",
    },
  ];

  const browsers = [
    { browser: "Chrome", users: 15234, percentage: 62.0, version: "119.0" },
    { browser: "Safari", users: 4821, percentage: 19.6, version: "17.1" },
    { browser: "Firefox", users: 2456, percentage: 10.0, version: "118.0" },
    { browser: "Edge", users: 1543, percentage: 6.3, version: "117.0" },
    { browser: "Other", users: 513, percentage: 2.1, version: "N/A" },
  ];

  const locations = [
    {
      country: "United States",
      users: 8234,
      percentage: 33.5,
      city: "New York",
      flag: "🇺🇸",
    },
    {
      country: "United Kingdom",
      users: 3456,
      percentage: 14.1,
      city: "London",
      flag: "🇬🇧",
    },
    {
      country: "Canada",
      users: 2987,
      percentage: 12.2,
      city: "Toronto",
      flag: "🇨🇦",
    },
    {
      country: "Germany",
      users: 2134,
      percentage: 8.7,
      city: "Berlin",
      flag: "🇩🇪",
    },
    {
      country: "France",
      users: 1876,
      percentage: 7.6,
      city: "Paris",
      flag: "🇫🇷",
    },
    {
      country: "Australia",
      users: 1543,
      percentage: 6.3,
      city: "Sydney",
      flag: "🇦🇺",
    },
    {
      country: "Japan",
      users: 1234,
      percentage: 5.0,
      city: "Tokyo",
      flag: "🇯🇵",
    },
    {
      country: "Other",
      users: 3103,
      percentage: 12.6,
      city: "Various",
      flag: "🌍",
    },
  ];

  const userBehavior = [
    {
      metric: "Avg Session Duration",
      value: "4m 32s",
      change: "+15s",
      trend: "up",
      icon: Clock,
    },
    {
      metric: "Pages per Session",
      value: "3.4",
      change: "+0.2",
      trend: "up",
      icon: Eye,
    },
    {
      metric: "Bounce Rate",
      value: "42.3%",
      change: "-2.1%",
      trend: "up",
      icon: MousePointer,
    },
    {
      metric: "Return Rate",
      value: "68.7%",
      change: "+4.3%",
      trend: "up",
      icon: UserCheck,
    },
  ];

  const userJourney = [
    { step: "Landing Page", users: 24567, dropOff: 0, conversion: 100 },
    { step: "Registration", users: 18234, dropOff: 6333, conversion: 74.2 },
    { step: "Profile Setup", users: 15876, dropOff: 2358, conversion: 64.6 },
    { step: "First Action", users: 12456, dropOff: 3420, conversion: 50.7 },
    { step: "Active User", users: 10234, dropOff: 2222, conversion: 41.6 },
  ];

  const engagementSegments = [
    {
      segment: "Power Users",
      users: 2456,
      percentage: 10.0,
      avgSessions: 45,
      avgTime: "12m 34s",
      color: "text-green-600 bg-green-100",
    },
    {
      segment: "Regular Users",
      users: 9823,
      percentage: 40.0,
      avgSessions: 12,
      avgTime: "5m 21s",
      color: "text-blue-600 bg-blue-100",
    },
    {
      segment: "Casual Users",
      users: 7345,
      percentage: 29.9,
      avgSessions: 4,
      avgTime: "2m 45s",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      segment: "New Users",
      users: 3284,
      percentage: 13.4,
      avgSessions: 1,
      avgTime: "1m 56s",
      color: "text-purple-600 bg-purple-100",
    },
    {
      segment: "At-Risk Users",
      users: 1659,
      percentage: 6.7,
      avgSessions: 0.5,
      avgTime: "0m 34s",
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Audience Insights
          </h2>
          <p className="text-muted-foreground">
            Understand your users' demographics, behavior, and engagement
            patterns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
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

      {/* Audience Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {audienceMetrics.map((metric) => {
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
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }>
                    {metric.change}
                  </span>
                  <span className="ml-1">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">
                  User distribution across age groups
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demographics.map((demo) => (
                    <div key={demo.age} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${demo.color}`}></div>
                          <span className="font-medium">{demo.age}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            {demo.count.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({demo.percentage}%)
                          </span>
                        </div>
                      </div>
                      <Progress value={demo.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Behavior Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Key engagement and interaction metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBehavior.map((behavior) => {
                    const Icon = behavior.icon;
                    return (
                      <div
                        key={behavior.metric}
                        className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{behavior.metric}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{behavior.value}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {behavior.trend === "up" ? (
                              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                            )}
                            <span
                              className={
                                behavior.trend === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }>
                              {behavior.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <p className="text-sm text-muted-foreground">
                  User distribution across device types
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${device.color}`}></div>
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            {device.users.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({device.percentage}%)
                          </span>
                        </div>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {device.sessions.toLocaleString()} sessions
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Most popular browsers among users
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {browsers.map((browser, index) => (
                    <div
                      key={browser.browser}
                      className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{browser.browser}</p>
                          <p className="text-sm text-muted-foreground">
                            Version {browser.version}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {browser.users.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {browser.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Geographic Distribution
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                User distribution by country and region
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locations.map((location) => (
                  <div
                    key={location.country}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{location.flag}</span>
                      <div>
                        <p className="font-medium">{location.country}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {location.users.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {location.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Funnel</CardTitle>
              <p className="text-sm text-muted-foreground">
                User progression through key conversion steps
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userJourney.map((step, index) => (
                  <div key={step.step} className="relative">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{step.step}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.users.toLocaleString()} users (
                            {step.conversion}%)
                          </p>
                        </div>
                      </div>
                      {step.dropOff > 0 && (
                        <div className="text-right">
                          <p className="text-sm text-red-600 font-medium">
                            -{step.dropOff.toLocaleString()} dropped off
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <Progress value={step.conversion} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Segments</CardTitle>
              <p className="text-sm text-muted-foreground">
                Users categorized by engagement level and behavior patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {engagementSegments.map((segment) => (
                  <div
                    key={segment.segment}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{segment.segment}</h3>
                      <Badge className={segment.color}>
                        {segment.percentage}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Users</span>
                        <span className="font-medium">
                          {segment.users.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Avg Sessions
                        </span>
                        <span className="font-medium">
                          {segment.avgSessions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Avg Time</span>
                        <span className="font-medium">{segment.avgTime}</span>
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
