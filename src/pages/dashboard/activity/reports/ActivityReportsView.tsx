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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Shield,
  Database,
  Clock,
  CheckCircle,
} from "lucide-react";

interface ReportData {
  id: string;
  name: string;
  type: "summary" | "detailed" | "trend" | "security";
  description: string;
  icon: typeof FileText;
  estimatedTime: string;
  fileSize: string;
  lastGenerated?: string;
}

interface ReportConfig {
  dateRange: string;
  format: string;
  includeCharts: boolean;
  includeDetails: boolean;
  categories: string[];
}

export function ActivityReportsView() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    dateRange: "7d",
    format: "pdf",
    includeCharts: true,
    includeDetails: true,
    categories: ["user", "system", "security"],
  });
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const availableReports: ReportData[] = [
    {
      id: "activity-summary",
      name: "Activity Summary Report",
      type: "summary",
      description: "High-level overview of system activities and key metrics",
      icon: BarChart3,
      estimatedTime: "2-3 minutes",
      fileSize: "~1.5 MB",
      lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "user-activity",
      name: "User Activity Report",
      type: "detailed",
      description: "Detailed breakdown of user actions and engagement",
      icon: Users,
      estimatedTime: "3-5 minutes",
      fileSize: "~2.8 MB",
      lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    },
    {
      id: "security-audit",
      name: "Security Audit Report",
      type: "security",
      description: "Security events, failed logins, and threat analysis",
      icon: Shield,
      estimatedTime: "4-6 minutes",
      fileSize: "~3.2 MB",
      lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "system-performance",
      name: "System Performance Report",
      type: "detailed",
      description: "System metrics, performance trends, and resource usage",
      icon: Activity,
      estimatedTime: "3-4 minutes",
      fileSize: "~2.1 MB",
      lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: "trend-analysis",
      name: "Trend Analysis Report",
      type: "trend",
      description: "Long-term trends and pattern analysis",
      icon: TrendingUp,
      estimatedTime: "5-8 minutes",
      fileSize: "~4.5 MB",
    },
    {
      id: "data-operations",
      name: "Data Operations Report",
      type: "detailed",
      description: "Database operations, backups, and data integrity checks",
      icon: Database,
      estimatedTime: "2-4 minutes",
      fileSize: "~1.8 MB",
      lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
  ];

  const formatLastGenerated = (timestamp?: string) => {
    if (!timestamp) return "Never generated";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Less than 1 hour ago";
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const toggleReport = (reportId: string) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const toggleCategory = (category: string) => {
    setReportConfig((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const generateReports = async () => {
    if (selectedReports.length === 0) return;

    setGenerating(true);
    setGenerationProgress(0);

    // Simulate report generation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setGenerationProgress(i);
    }

    // Simulate file download
    setTimeout(() => {
      const reportNames = selectedReports
        .map((id) => availableReports.find((r) => r.id === id)?.name)
        .join(", ");

      alert(`Reports generated successfully: ${reportNames}`);
      setGenerating(false);
      setGenerationProgress(0);
      setSelectedReports([]);
    }, 500);
  };

  const downloadSampleReport = (reportId: string) => {
    // Simulate download
    const report = availableReports.find((r) => r.id === reportId);
    alert(`Downloading sample: ${report?.name}`);
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "summary":
        return "bg-blue-100 text-blue-800";
      case "detailed":
        return "bg-green-100 text-green-800";
      case "trend":
        return "bg-purple-100 text-purple-800";
      case "security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Activity Reports
          </h1>
          <p className="text-muted-foreground">
            Generate and download comprehensive activity reports
          </p>
        </div>
        <Button
          onClick={generateReports}
          disabled={selectedReports.length === 0 || generating}>
          <Download className="h-4 w-4 mr-2" />
          {generating ? "Generating..." : "Generate Selected Reports"}
        </Button>
      </div>

      {/* Report Generation Progress */}
      {generating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Generating reports...
                </span>
                <span className="text-sm text-muted-foreground">
                  {generationProgress}%
                </span>
              </div>
              <Progress value={generationProgress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                This may take a few minutes depending on the selected date range
                and report types.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Configure report parameters and filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select
                value={reportConfig.dateRange}
                onValueChange={(value) =>
                  setReportConfig({ ...reportConfig, dateRange: value })
                }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select
                value={reportConfig.format}
                onValueChange={(value) =>
                  setReportConfig({ ...reportConfig, format: value })
                }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Report Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeCharts"
                    checked={reportConfig.includeCharts}
                    onCheckedChange={(checked) =>
                      setReportConfig({
                        ...reportConfig,
                        includeCharts: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="includeCharts" className="text-sm">
                    Include Charts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeDetails"
                    checked={reportConfig.includeDetails}
                    onCheckedChange={(checked) =>
                      setReportConfig({
                        ...reportConfig,
                        includeDetails: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="includeDetails" className="text-sm">
                    Include Detailed Logs
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Activity Categories</Label>
            <div className="flex flex-wrap gap-2">
              {["user", "system", "security", "data", "performance"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={reportConfig.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm capitalize">
                      {category}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Select the reports you want to generate
            {selectedReports.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedReports.length} selected
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableReports.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReports.includes(report.id);

              return (
                <div
                  key={report.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => toggleReport(report.id)}>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground">
                          {report.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getReportTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                          {isSelected && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{report.estimatedTime}</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>{report.fileSize}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div>Last generated:</div>
                          <div className="font-medium">
                            {formatLastGenerated(report.lastGenerated)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadSampleReport(report.id);
                      }}>
                      <Download className="h-3 w-3 mr-1" />
                      Download Sample
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Reports Generated
                </p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  This Month
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Size
                </p>
                <p className="text-2xl font-bold">124 MB</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Time
                </p>
                <p className="text-2xl font-bold">4.2 min</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
