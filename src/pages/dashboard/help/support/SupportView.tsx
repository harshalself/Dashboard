import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, ExternalLink } from "lucide-react";

export function SupportView() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Support & Contact
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Get help from our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              Live Chat
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Mail className="h-6 w-6 mb-2" />
              Email Support
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community & Resources</CardTitle>
          <CardDescription>
            Connect with other users and find additional resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Community Forum
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Knowledge Base
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Video Tutorials
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
