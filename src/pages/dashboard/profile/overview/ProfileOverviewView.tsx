import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { useAuth } from "@/contexts";

interface ProfileOverviewViewProps {
  onNavigateToPersonal: () => void;
  onNavigateToSecurity: () => void;
}

export function ProfileOverviewView({
  onNavigateToPersonal,
  onNavigateToSecurity,
}: ProfileOverviewViewProps) {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-2xl">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {user?.name || "User"}
          </h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary">{user?.role || "User"}</Badge>
            <Badge variant="outline">Active</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-muted-foreground">
                  {user?.role || "User"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common profile management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onNavigateToPersonal}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onNavigateToSecurity}>
              <User className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
