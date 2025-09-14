import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  DollarSign,
  Users,
  ShoppingCart,
  Mail,
  Eye,
  MousePointer,
  Clock,
  Award,
} from "lucide-react";
import { useState } from "react";

export function GoalsConversionsView() {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    {
      id: "newsletter",
      name: "Newsletter Signups",
      description: "Users who subscribe to the newsletter",
      type: "engagement",
      current: 425,
      target: 500,
      percentage: 85,
      status: "on-track",
      deadline: "2024-01-31",
      value: 12.5,
      conversions: 425,
      conversionRate: 3.2,
      trend: "up",
      change: "+12%",
      icon: Mail,
    },
    {
      id: "demo",
      name: "Product Demo Requests",
      description: "Users requesting product demonstrations",
      type: "lead",
      current: 89,
      target: 100,
      percentage: 89,
      status: "at-risk",
      deadline: "2024-01-31",
      value: 250.0,
      conversions: 89,
      conversionRate: 2.1,
      trend: "down",
      change: "-3%",
      icon: Eye,
    },
    {
      id: "premium",
      name: "Premium Upgrades",
      description: "Free users upgrading to premium plans",
      type: "revenue",
      current: 34,
      target: 50,
      percentage: 68,
      status: "behind",
      deadline: "2024-01-31",
      value: 99.0,
      conversions: 34,
      conversionRate: 4.7,
      trend: "up",
      change: "+8%",
      icon: Award,
    },
    {
      id: "support",
      name: "Support Tickets Resolved",
      description: "Customer support tickets resolved within SLA",
      type: "satisfaction",
      current: 167,
      target: 150,
      percentage: 111,
      status: "exceeded",
      deadline: "2024-01-31",
      value: 0,
      conversions: 167,
      conversionRate: 92.8,
      trend: "up",
      change: "+15%",
      icon: CheckCircle,
    },
    {
      id: "purchases",
      name: "Online Purchases",
      description: "Completed e-commerce transactions",
      type: "revenue",
      current: 234,
      target: 300,
      percentage: 78,
      status: "on-track",
      deadline: "2024-01-31",
      value: 89.99,
      conversions: 234,
      conversionRate: 1.8,
      trend: "up",
      change: "+22%",
      icon: ShoppingCart,
    },
    {
      id: "retention",
      name: "User Retention (30-day)",
      description: "Users active after 30 days of signup",
      type: "engagement",
      current: 687,
      target: 800,
      percentage: 85.9,
      status: "on-track",
      deadline: "2024-01-31",
      value: 0,
      conversions: 687,
      conversionRate: 68.7,
      trend: "up",
      change: "+5%",
      icon: Users,
    },
  ];

  const conversionFunnels = [
    {
      name: "E-commerce Funnel",
      steps: [
        { name: "Product View", users: 12450, percentage: 100, dropOff: 0 },
        { name: "Add to Cart", users: 3456, percentage: 27.8, dropOff: 8994 },
        {
          name: "Checkout Started",
          users: 1234,
          percentage: 9.9,
          dropOff: 2222,
        },
        { name: "Payment Info", users: 876, percentage: 7.0, dropOff: 358 },
        {
          name: "Purchase Complete",
          users: 654,
          percentage: 5.3,
          dropOff: 222,
        },
      ],
    },
    {
      name: "Signup Funnel",
      steps: [
        { name: "Landing Page", users: 24567, percentage: 100, dropOff: 0 },
        { name: "Sign Up Form", users: 8234, percentage: 33.5, dropOff: 16333 },
        {
          name: "Email Verification",
          users: 6789,
          percentage: 27.6,
          dropOff: 1445,
        },
        {
          name: "Profile Completion",
          users: 5432,
          percentage: 22.1,
          dropOff: 1357,
        },
        { name: "First Action", users: 4321, percentage: 17.6, dropOff: 1111 },
      ],
    },
  ];

  const attributionData = [
    {
      channel: "Direct",
      conversions: 234,
      value: 23400,
      percentage: 28.5,
      cost: 0,
      roas: "∞",
    },
    {
      channel: "Organic Search",
      conversions: 189,
      value: 18900,
      percentage: 23.0,
      cost: 0,
      roas: "∞",
    },
    {
      channel: "Paid Search",
      conversions: 156,
      value: 15600,
      percentage: 19.0,
      cost: 5200,
      roas: "3.0x",
    },
    {
      channel: "Social Media",
      conversions: 98,
      value: 9800,
      percentage: 11.9,
      cost: 2800,
      roas: "3.5x",
    },
    {
      channel: "Email",
      conversions: 87,
      value: 8700,
      percentage: 10.6,
      cost: 400,
      roas: "21.8x",
    },
    {
      channel: "Referral",
      conversions: 58,
      value: 5800,
      percentage: 7.0,
      cost: 600,
      roas: "9.7x",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded":
        return "text-green-600 bg-green-100";
      case "on-track":
        return "text-blue-600 bg-blue-100";
      case "at-risk":
        return "text-yellow-600 bg-yellow-100";
      case "behind":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exceeded":
        return <CheckCircle className="h-4 w-4" />;
      case "on-track":
        return <Target className="h-4 w-4" />;
      case "at-risk":
        return <AlertCircle className="h-4 w-4" />;
      case "behind":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "text-green-600 bg-green-50";
      case "engagement":
        return "text-blue-600 bg-blue-50";
      case "lead":
        return "text-purple-600 bg-purple-50";
      case "satisfaction":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Goals & Conversions
          </h2>
          <p className="text-muted-foreground">
            Track conversion goals, funnel performance, and attribution metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowCreateGoal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Goal
          </Button>
        </div>
      </div>

      {/* Goals Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">
              {goals.filter((g) => g.status === "on-track").length} on track
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-green-600">+0.4% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$82,456</div>
            <p className="text-xs text-green-600">+18% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Goals Achieved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.filter((g) => g.percentage >= 100).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {goals.length} goals this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">Goal Progress</TabsTrigger>
          <TabsTrigger value="funnels">Conversion Funnels</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <Card
                  key={goal.id}
                  className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">{goal.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(goal.type)}>
                          {goal.type}
                        </Badge>
                        <Badge className={getStatusColor(goal.status)}>
                          {getStatusIcon(goal.status)}
                          {goal.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Progress
                        </span>
                        <span className="font-semibold">
                          {goal.current.toLocaleString()} /{" "}
                          {goal.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={goal.percentage} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Completion</p>
                          <p className="font-semibold">{goal.percentage}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-semibold flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Conversion Rate
                          </p>
                          <p className="font-semibold">
                            {goal.conversionRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Trend</p>
                          <p
                            className={`font-semibold flex items-center ${
                              goal.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}>
                            {goal.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {goal.change}
                          </p>
                        </div>
                      </div>

                      {goal.value > 0 && (
                        <div className="pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Revenue per Conversion
                            </span>
                            <span className="font-semibold">${goal.value}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-muted-foreground">
                              Total Revenue
                            </span>
                            <span className="font-semibold text-green-600">
                              ${(goal.current * goal.value).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="funnels" className="space-y-4">
          {conversionFunnels.map((funnel) => (
            <Card key={funnel.name}>
              <CardHeader>
                <CardTitle>{funnel.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  User progression through conversion steps
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnel.steps.map((step, index) => (
                    <div key={step.name} className="relative">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{step.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {step.users.toLocaleString()} users (
                              {step.percentage}%)
                            </p>
                          </div>
                        </div>
                        {step.dropOff > 0 && (
                          <div className="text-right">
                            <p className="text-sm text-red-600 font-medium">
                              -{step.dropOff.toLocaleString()} dropped off
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(
                                (step.dropOff / funnel.steps[0].users) *
                                100
                              ).toFixed(1)}
                              % of total
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <Progress value={step.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="attribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attribution Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Conversion attribution by marketing channel
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attributionData.map((channel) => (
                  <div
                    key={channel.channel}
                    className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{channel.channel}</h4>
                      <p className="text-sm text-muted-foreground">
                        {channel.conversions} conversions ({channel.percentage}
                        %)
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-semibold">
                          ${channel.value.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Cost</p>
                        <p className="font-semibold">
                          {channel.cost === 0
                            ? "Free"
                            : `$${channel.cost.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">ROAS</p>
                        <p className="font-semibold text-green-600">
                          {channel.roas}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">
                        Strong Performance
                      </p>
                      <p className="text-sm text-green-700">
                        Newsletter signups are 85% to goal with 12% growth this
                        month.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Needs Attention
                      </p>
                      <p className="text-sm text-yellow-700">
                        Demo requests are down 3% and may miss monthly target.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Opportunity</p>
                      <p className="text-sm text-blue-700">
                        E-commerce funnel has 72% drop-off at checkout. Optimize
                        for better conversions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Optimize checkout flow
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reduce cart abandonment rate
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      High Priority
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">A/B test demo CTA</p>
                      <p className="text-xs text-muted-foreground">
                        Improve demo request rate
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Medium Priority
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Increase email frequency
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Leverage high-performing channel
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Low Priority
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Goal Dialog */}
      <Dialog open={showCreateGoal} onOpenChange={setShowCreateGoal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set up a new conversion goal to track
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Goal Name</Label>
              <Input placeholder="Enter goal name..." />
            </div>
            <div className="space-y-2">
              <Label>Goal Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="lead">Lead Generation</SelectItem>
                  <SelectItem value="satisfaction">Satisfaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Value</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateGoal(false)}>
                Cancel
              </Button>
              <Button>Create Goal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
