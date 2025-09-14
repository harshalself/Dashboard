import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Trash2,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Clock,
  Save,
  X,
  Upload,
  Download,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor" | "viewer" | "user";
  status: "active" | "inactive" | "pending" | "suspended";
  department?: string;
  phone?: string;
  address?: string;
  joinDate: string;
  lastLogin?: string;
  notes?: string;
  permissions?: string[];
}

interface UserFormData {
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | "user";
  department: string;
  phone: string;
  address: string;
  notes: string;
  permissions: string[];
}

export function ManageUsersView() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<string>("");

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      avatar: "/api/placeholder/32/32",
      role: "admin",
      status: "active",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      notes: "Senior administrator with full system access",
      permissions: ["user_management", "system_settings", "reports", "billing"],
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@company.com",
      role: "editor",
      status: "active",
      department: "Marketing",
      phone: "+1 (555) 234-5678",
      joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      notes: "Content manager for marketing campaigns",
      permissions: ["content_management", "reports"],
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "user",
      status: "suspended",
      department: "Sales",
      phone: "+1 (555) 345-6789",
      joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      notes: "Account suspended due to policy violation",
      permissions: ["basic_access"],
    },
  ]);

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "user",
    department: "",
    phone: "",
    address: "",
    notes: "",
    permissions: [],
  });

  const availablePermissions = [
    {
      id: "user_management",
      label: "User Management",
      description: "Create, edit, and delete users",
    },
    {
      id: "system_settings",
      label: "System Settings",
      description: "Modify system configuration",
    },
    {
      id: "reports",
      label: "Reports",
      description: "Generate and view reports",
    },
    {
      id: "billing",
      label: "Billing",
      description: "Access billing and payment information",
    },
    {
      id: "content_management",
      label: "Content Management",
      description: "Create and edit content",
    },
    {
      id: "basic_access",
      label: "Basic Access",
      description: "Standard user access",
    },
  ];

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.id));
    }
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || "",
      phone: user.phone || "",
      address: user.address || "",
      notes: user.notes || "",
      permissions: user.permissions || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              department: formData.department,
              phone: formData.phone,
              address: formData.address,
              notes: formData.notes,
              permissions: formData.permissions,
            }
          : user
      )
    );

    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedUsers.length === 0) return;

    setUsers((prev) =>
      prev.map((user) => {
        if (!selectedUsers.includes(user.id)) return user;

        switch (bulkAction) {
          case "activate":
            return { ...user, status: "active" as const };
          case "deactivate":
            return { ...user, status: "inactive" as const };
          case "suspend":
            return { ...user, status: "suspended" as const };
          default:
            return user;
        }
      })
    );

    setSelectedUsers([]);
    setBulkAction("");
  };

  const handleBulkDelete = () => {
    if (
      confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)
    ) {
      setUsers((prev) =>
        prev.filter((user) => !selectedUsers.includes(user.id))
      );
      setSelectedUsers([]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (lastLogin?: string) => {
    if (!lastLogin) return "Never";
    const date = new Date(lastLogin);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">
            Edit user details, roles, and permissions
          </p>
        </div>
        {selectedUsers.length > 0 && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{selectedUsers.length} selected</Badge>
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Bulk Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activate">Activate</SelectItem>
                <SelectItem value="deactivate">Deactivate</SelectItem>
                <SelectItem value="suspend">Suspend</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleBulkAction} disabled={!bulkAction}>
              Apply
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select All ({users.length} users)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import Users
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id} className="relative">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleSelectUser(user.id)}
                  />
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {user.phone}
                          </div>
                        )}
                        {user.address && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {user.address}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Joined {formatDate(user.joinDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Last login {formatLastLogin(user.lastLogin)}
                        </div>
                        {user.department && (
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            {user.department}
                          </div>
                        )}
                      </div>
                    </div>

                    {user.notes && (
                      <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                        {user.notes}
                      </p>
                    )}

                    {user.permissions && user.permissions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 3).map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs">
                            {
                              availablePermissions.find(
                                (p) => p.id === permission
                              )?.label
                            }
                          </Badge>
                        ))}
                        {user.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(user)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user information and permissions
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(
                      value: "admin" | "editor" | "viewer" | "user"
                    ) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  User Permissions
                </h4>
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start space-x-3 p-3 border rounded">
                    <Checkbox
                      checked={formData.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            permissions: [
                              ...formData.permissions,
                              permission.id,
                            ],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            permissions: formData.permissions.filter(
                              (p) => p !== permission.id
                            ),
                          });
                        }
                      }}
                    />
                    <div>
                      <div className="font-medium">{permission.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {permission.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Account Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Force Password Reset</div>
                      <div className="text-sm text-muted-foreground">
                        User will be required to change password on next login
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reset Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">
                        Two-Factor Authentication
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Enable or disable 2FA for this user
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure 2FA
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
