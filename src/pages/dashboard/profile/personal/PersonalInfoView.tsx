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
import { useAuth } from "@/contexts";

interface PersonalInfoViewProps {
  onNavigateToOverview: () => void;
}

export function PersonalInfoView({
  onNavigateToOverview,
}: PersonalInfoViewProps) {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Personal Information
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                defaultValue={user?.name?.split(" ")[0] || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                defaultValue={user?.name?.split(" ")[1] || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex space-x-4">
            <Button>Save Changes</Button>
            <Button variant="outline" onClick={onNavigateToOverview}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
