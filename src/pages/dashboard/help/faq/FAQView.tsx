import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FAQView() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              How do I change my password?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Go to your Profile → Security tab and click "Change Password".
              You'll need to enter your current password and choose a new one.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              How do I customize the dashboard theme?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Click on the floating theme button (palette icon) in the
              bottom-right corner, or go to Settings → Themes to choose from
              predefined color schemes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              How do I manage user permissions?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Navigate to the Users section from the sidebar. You can assign
              roles and permissions to different users based on their access
              level.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How do I export data?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Most data tables have an export button. You can export data in CSV
              or Excel format. Check the individual sections for specific export
              options.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              How do I get notifications?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Notifications appear in the bell icon in the header. You can
              customize notification preferences in Settings → Notifications.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
