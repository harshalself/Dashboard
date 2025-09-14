import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Switch } from "../../../../components/ui/switch";
import {
  Mail,
  Send,
  Copy,
  Download,
  Trash2,
  RefreshCw,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Upload,
} from "lucide-react";

interface Invitation {
  id: string;
  email: string;
  role: "admin" | "manager" | "editor" | "viewer";
  status: "pending" | "accepted" | "expired" | "failed";
  sentAt: string;
  expiresAt: string;
  acceptedAt?: string;
  invitedBy: string;
  message?: string;
  resends: number;
}

interface InviteFormData {
  emails: string[];
  role: "admin" | "manager" | "editor" | "viewer";
  message: string;
  sendWelcomeEmail: boolean;
  expiryDays: number;
}

const InviteUsersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("invite");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isBulkInviteOpen, setIsBulkInviteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvitations, setSelectedInvitations] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [inviteFormData, setInviteFormData] = useState<InviteFormData>({
    emails: [],
    role: "viewer",
    message: "",
    sendWelcomeEmail: true,
    expiryDays: 7,
  });

  // Mock data
  const mockInvitations: Invitation[] = [
    {
      id: "1",
      email: "john.doe@example.com",
      role: "editor",
      status: "pending",
      sentAt: "2024-01-15T10:00:00Z",
      expiresAt: "2024-01-22T10:00:00Z",
      invitedBy: "admin@company.com",
      message: "Welcome to our team!",
      resends: 0,
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      role: "manager",
      status: "accepted",
      sentAt: "2024-01-14T15:30:00Z",
      expiresAt: "2024-01-21T15:30:00Z",
      acceptedAt: "2024-01-15T09:15:00Z",
      invitedBy: "admin@company.com",
      resends: 1,
    },
    {
      id: "3",
      email: "bob.wilson@example.com",
      role: "viewer",
      status: "expired",
      sentAt: "2024-01-01T12:00:00Z",
      expiresAt: "2024-01-08T12:00:00Z",
      invitedBy: "manager@company.com",
      resends: 2,
    },
    {
      id: "4",
      email: "alice.brown@example.com",
      role: "admin",
      status: "failed",
      sentAt: "2024-01-16T14:20:00Z",
      expiresAt: "2024-01-23T14:20:00Z",
      invitedBy: "admin@company.com",
      resends: 0,
    },
    {
      id: "5",
      email: "charlie.davis@example.com",
      role: "editor",
      status: "pending",
      sentAt: "2024-01-16T16:45:00Z",
      expiresAt: "2024-01-23T16:45:00Z",
      invitedBy: "manager@company.com",
      message: "Looking forward to working with you!",
      resends: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expired":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "editor":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const addEmail = () => {
    if (
      emailInput.trim() &&
      !inviteFormData.emails.includes(emailInput.trim())
    ) {
      setInviteFormData((prev) => ({
        ...prev,
        emails: [...prev.emails, emailInput.trim()],
      }));
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setInviteFormData((prev) => ({
      ...prev,
      emails: prev.emails.filter((e) => e !== email),
    }));
  };

  const handleBulkEmailPaste = (text: string) => {
    const emails = text
      .split(/[,\n\r\s]+/)
      .map((email) => email.trim())
      .filter((email) => email && email.includes("@"))
      .filter((email) => !inviteFormData.emails.includes(email));

    setInviteFormData((prev) => ({
      ...prev,
      emails: [...prev.emails, ...emails],
    }));
  };

  const handleSendInvites = () => {
    console.log("Sending invites:", inviteFormData);
    setIsInviteDialogOpen(false);
    setIsBulkInviteOpen(false);
    setInviteFormData({
      emails: [],
      role: "viewer",
      message: "",
      sendWelcomeEmail: true,
      expiryDays: 7,
    });
  };

  const handleResendInvite = (invitation: Invitation) => {
    console.log("Resending invite:", invitation.id);
  };

  const handleCancelInvite = (invitationId: string) => {
    if (confirm("Are you sure you want to cancel this invitation?")) {
      console.log("Cancelling invite:", invitationId);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedInvitations);
    setSelectedInvitations([]);
  };

  const filteredInvitations = mockInvitations.filter((invitation) => {
    const matchesSearch =
      invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.invitedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invitation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const invitationStats = {
    total: mockInvitations.length,
    pending: mockInvitations.filter((inv) => inv.status === "pending").length,
    accepted: mockInvitations.filter((inv) => inv.status === "accepted").length,
    expired: mockInvitations.filter((inv) => inv.status === "expired").length,
    failed: mockInvitations.filter((inv) => inv.status === "failed").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invite Users</h2>
          <p className="text-muted-foreground">
            Send invitations and manage user access to the system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsBulkInviteOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Invite
          </Button>
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invitations
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitationStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {invitationStats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {invitationStats.accepted}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {invitationStats.expired}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {invitationStats.failed}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4">
        <TabsList>
          <TabsTrigger value="invite">Invite New Users</TabsTrigger>
          <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
          <TabsTrigger value="history">Invitation History</TabsTrigger>
        </TabsList>

        <TabsContent value="invite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Invite</CardTitle>
              <CardDescription>
                Send a quick invitation to a single user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    placeholder="user@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addEmail()}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={inviteFormData.role}
                    onValueChange={(
                      value: "admin" | "manager" | "editor" | "viewer"
                    ) => setInviteFormData({ ...inviteFormData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      if (emailInput.trim()) {
                        setInviteFormData((prev) => ({
                          ...prev,
                          emails: [emailInput.trim()],
                        }));
                        handleSendInvites();
                        setEmailInput("");
                      }
                    }}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invitation Templates</CardTitle>
              <CardDescription>
                Pre-configured invitation templates for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setIsInviteDialogOpen(true)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-red-600" />
                      </div>
                      <CardTitle className="text-base">New Admin</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Invite a new administrator with full system access
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setIsInviteDialogOpen(true)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-blue-600" />
                      </div>
                      <CardTitle className="text-base">Team Manager</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Invite a team manager with user management permissions
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setIsInviteDialogOpen(true)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-green-600" />
                      </div>
                      <CardTitle className="text-base">
                        Content Editor
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Invite a content editor with editing permissions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invitations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedInvitations.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("resend")}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Resend ({selectedInvitations.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("cancel")}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Cancel ({selectedInvitations.length})
                </Button>
              </div>
            )}
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedInvitations.length ===
                          filteredInvitations.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInvitations(
                              filteredInvitations.map((inv) => inv.id)
                            );
                          } else {
                            setSelectedInvitations([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedInvitations.includes(invitation.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInvitations([
                                ...selectedInvitations,
                                invitation.id,
                              ]);
                            } else {
                              setSelectedInvitations(
                                selectedInvitations.filter(
                                  (id) => id !== invitation.id
                                )
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {invitation.email}
                          </span>
                          {invitation.resends > 0 && (
                            <span className="text-xs text-muted-foreground">
                              Resent {invitation.resends} time
                              {invitation.resends > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getRoleColor(invitation.role)}
                          variant="secondary">
                          {invitation.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(invitation.status)}
                          <Badge
                            className={getStatusColor(invitation.status)}
                            variant="secondary">
                            {invitation.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.sentAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(
                              invitation.expiresAt
                            ).toLocaleDateString()}
                          </span>
                          {invitation.status === "pending" && (
                            <span className="text-xs text-muted-foreground">
                              {Math.ceil(
                                (new Date(invitation.expiresAt).getTime() -
                                  Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days left
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{invitation.invitedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {invitation.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleResendInvite(invitation)}>
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `${window.location.origin}/invite/${invitation.id}`
                              )
                            }>
                            <Copy className="w-4 h-4" />
                          </Button>
                          {invitation.status !== "accepted" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelInvite(invitation.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invitation history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Accepted Date</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">
                        {invitation.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getRoleColor(invitation.role)}
                          variant="secondary">
                          {invitation.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(invitation.status)}
                          <Badge
                            className={getStatusColor(invitation.status)}
                            variant="secondary">
                            {invitation.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.sentAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {invitation.acceptedAt
                          ? new Date(invitation.acceptedAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>{invitation.invitedBy}</TableCell>
                      <TableCell>
                        {invitation.message ? (
                          <div
                            className="max-w-[200px] truncate"
                            title={invitation.message}>
                            {invitation.message}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Single Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to join the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={inviteFormData.role}
                onValueChange={(
                  value: "admin" | "manager" | "editor" | "viewer"
                ) => setInviteFormData({ ...inviteFormData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Personal Message (Optional)</Label>
              <Textarea
                value={inviteFormData.message}
                onChange={(e) =>
                  setInviteFormData({
                    ...inviteFormData,
                    message: e.target.value,
                  })
                }
                placeholder="Welcome to our team!"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={inviteFormData.sendWelcomeEmail}
                onCheckedChange={(checked) =>
                  setInviteFormData({
                    ...inviteFormData,
                    sendWelcomeEmail: checked,
                  })
                }
              />
              <Label>Send welcome email</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (emailInput.trim()) {
                    setInviteFormData((prev) => ({
                      ...prev,
                      emails: [emailInput.trim()],
                    }));
                    handleSendInvites();
                    setEmailInput("");
                  }
                }}>
                Send Invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Invite Dialog */}
      <Dialog open={isBulkInviteOpen} onOpenChange={setIsBulkInviteOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Invite Users</DialogTitle>
            <DialogDescription>
              Invite multiple users at once by entering email addresses
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email Addresses</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email addresses..."
                    onKeyPress={(e) => e.key === "Enter" && addEmail()}
                  />
                  <Button type="button" onClick={addEmail}>
                    Add
                  </Button>
                </div>
                <Textarea
                  placeholder="Or paste multiple emails separated by commas or new lines..."
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text");
                    handleBulkEmailPaste(text);
                  }}
                  className="h-20"
                />
              </div>
              {inviteFormData.emails.length > 0 && (
                <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-1">
                  {inviteFormData.emails.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted px-2 py-1 rounded text-sm">
                      <span>{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEmail(email)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Role</Label>
                <Select
                  value={inviteFormData.role}
                  onValueChange={(
                    value: "admin" | "manager" | "editor" | "viewer"
                  ) => setInviteFormData({ ...inviteFormData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Expiry (Days)</Label>
                <Select
                  value={inviteFormData.expiryDays.toString()}
                  onValueChange={(value) =>
                    setInviteFormData({
                      ...inviteFormData,
                      expiryDays: parseInt(value),
                    })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message Template</Label>
              <Textarea
                value={inviteFormData.message}
                onChange={(e) =>
                  setInviteFormData({
                    ...inviteFormData,
                    message: e.target.value,
                  })
                }
                placeholder="Welcome to our team! We're excited to have you join us."
                className="h-20"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={inviteFormData.sendWelcomeEmail}
                onCheckedChange={(checked) =>
                  setInviteFormData({
                    ...inviteFormData,
                    sendWelcomeEmail: checked,
                  })
                }
              />
              <Label>Send welcome email to all users</Label>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsBulkInviteOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendInvites}
                disabled={inviteFormData.emails.length === 0}>
                Send {inviteFormData.emails.length} Invite
                {inviteFormData.emails.length !== 1 ? "s" : ""}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteUsersView;
