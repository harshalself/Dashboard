import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReusableSidebar } from "@/components/ui/reusable-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

const analyticsItems = [
  { id: "overview", label: "Analytics Overview", icon: BarChart3 },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "audience", label: "Audience Insights", icon: Users },
  { id: "goals", label: "Goals & Conversions", icon: Target },
];

export default function AnalyticsPage() {
  const [activeItem, setActiveItem] = useState("overview");

  const kpis = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Page Views",
      value: "12,234",
      change: "-3%",
      trend: "down",
      icon: Eye,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                  Track performance and business metrics.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <Card key={kpi.title}>
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
                          <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                        )}
                        <span
                          className={
                            kpi.trend === "up"
                              ? "text-success"
                              : "text-destructive"
                          }>
                          {kpi.change}
                        </span>
                        <span className="ml-1">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      case "performance":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Performance Metrics
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Page Load Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Homepage</span>
                    <span className="font-mono text-success">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dashboard</span>
                    <span className="font-mono text-warning">2.8s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "audience":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Audience Insights
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>18-24</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "goals":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Goals & Conversions
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Conversion Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded">
                  <div>
                    <p className="font-medium">Newsletter Signups</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly goal: 500
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">425</p>
                    <p className="text-xs text-success/80">85% complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="flex min-h-[calc(100vh-120px)]">
        <ReusableSidebar
          title="Analytics"
          items={analyticsItems}
          activeItem={activeItem}
          onItemChange={setActiveItem}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
}
