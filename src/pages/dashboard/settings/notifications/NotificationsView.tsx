import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function NotificationsView() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Notification Settings
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure which events trigger email notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System status changes</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about system updates and maintenance
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Error alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for system errors
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly reports</Label>
              <p className="text-sm text-muted-foreground">
                Get weekly performance summaries
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New user notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new users register
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
