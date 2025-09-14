import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function APISettingsView() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        API Configuration
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys and integration settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Primary API Key</Label>
            <div className="flex space-x-2">
              <Input
                id="api-key"
                type="password"
                placeholder="your-api-key-here"
                className="flex-1"
              />
              <Button variant="outline">Update</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex space-x-2">
              <Input
                id="webhook-url"
                placeholder="https://api.yourapp.com/webhook"
                className="flex-1"
              />
              <Button variant="outline">Update</Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Usage Status</p>
              <p className="text-sm text-muted-foreground">
                Current monthly usage and limits
              </p>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
