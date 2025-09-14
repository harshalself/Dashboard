import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Clock,
} from "lucide-react";

export function MetricsView() {
  const metrics = [
    {
      title: "Performance Score",
      value: 87,
      target: 90,
      unit: "%",
      trend: "+5%",
      icon: Target,
    },
    {
      title: "User Engagement",
      value: 73,
      target: 80,
      unit: "%",
      trend: "+2%",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: 12.5,
      target: 15,
      unit: "%",
      trend: "+1.2%",
      icon: TrendingUp,
    },
    {
      title: "Response Time",
      value: 245,
      target: 200,
      unit: "ms",
      trend: "-15ms",
      icon: Clock,
    },
  ];

  const kpiData = [
    { label: "Daily Active Users", value: "1,234", change: "+8.2%" },
    { label: "Monthly Recurring Revenue", value: "$12,450", change: "+12.5%" },
    { label: "Customer Satisfaction", value: "4.8/5", change: "+0.3" },
    { label: "Support Tickets", value: "23", change: "-5" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Metrics Overview
          </h2>
          <p className="text-muted-foreground">
            Track your key performance indicators
          </p>
        </div>
        <Badge variant="secondary">
          <Calendar className="mr-1 h-3 w-3" />
          Last 30 days
        </Badge>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const percentage = (metric.value / metric.target) * 100;

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">
                    {metric.value}
                    {metric.unit}
                  </span>
                  <span className="text-xs text-green-500">{metric.trend}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      Target: {metric.target}
                      {metric.unit}
                    </span>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* KPI Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>
            Essential metrics for business performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{kpi.value}</span>
                  <span className="text-xs text-green-500">{kpi.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>
            Visual representation of your metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chart component would go here</p>
              <p className="text-xs">Connect your preferred charting library</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
