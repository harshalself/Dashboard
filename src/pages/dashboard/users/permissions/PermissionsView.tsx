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
import { Switch } from "../../../../components/ui/switch";
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
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import { Checkbox } from "../../../../components/ui/checkbox";
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
import {
  Plus,
  Settings,
  Users,
  Shield,
  Eye,
  Edit,
  Trash2,
  Copy,
  Search,
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: "create" | "read" | "update" | "delete" | "manage";
}

interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface RoleFormData {
  name: string;
  description: string;
  level: number;
  permissions: string[];
}

const PermissionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleFormData, setRoleFormData] = useState<RoleFormData>({
    name: "",
    description: "",
    level: 1,
    permissions: [],
  });

  // Mock data
  const mockRoles: Role[] = [
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      level: 10,
      userCount: 2,
      permissions: [
        "user:create",
        "user:read",
        "user:update",
        "user:delete",
        "role:manage",
        "system:manage",
      ],
      isSystem: true,
      color: "red",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: "2",
      name: "Admin",
      description: "Administrative access with user management",
      level: 8,
      userCount: 5,
      permissions: [
        "user:create",
        "user:read",
        "user:update",
        "user:delete",
        "role:read",
      ],
      isSystem: false,
      color: "orange",
      createdAt: "2023-01-01",
      updatedAt: "2023-02-15",
    },
    {
      id: "3",
      name: "Manager",
      description: "Team management with limited system access",
      level: 6,
      userCount: 12,
      permissions: ["user:read", "user:update", "team:manage"],
      isSystem: false,
      color: "blue",
      createdAt: "2023-01-15",
      updatedAt: "2023-03-01",
    },
    {
      id: "4",
      name: "Editor",
      description: "Content creation and editing permissions",
      level: 4,
      userCount: 25,
      permissions: [
        "content:create",
        "content:read",
        "content:update",
        "user:read",
      ],
      isSystem: false,
      color: "green",
      createdAt: "2023-02-01",
      updatedAt: "2023-03-10",
    },
    {
      id: "5",
      name: "Viewer",
      description: "Read-only access to system resources",
      level: 2,
      userCount: 48,
      permissions: ["user:read", "content:read", "reports:read"],
      isSystem: false,
      color: "gray",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-01",
    },
  ];

  const mockPermissions: Permission[] = [
    {
      id: "user:create",
      name: "Create Users",
      description: "Create new user accounts",
      module: "Users",
      action: "create",
    },
    {
      id: "user:read",
      name: "View Users",
      description: "View user information",
      module: "Users",
      action: "read",
    },
    {
      id: "user:update",
      name: "Edit Users",
      description: "Modify user information",
      module: "Users",
      action: "update",
    },
    {
      id: "user:delete",
      name: "Delete Users",
      description: "Remove user accounts",
      module: "Users",
      action: "delete",
    },
    {
      id: "role:read",
      name: "View Roles",
      description: "View role information",
      module: "Roles",
      action: "read",
    },
    {
      id: "role:manage",
      name: "Manage Roles",
      description: "Create, edit, and delete roles",
      module: "Roles",
      action: "manage",
    },
    {
      id: "content:create",
      name: "Create Content",
      description: "Create new content",
      module: "Content",
      action: "create",
    },
    {
      id: "content:read",
      name: "View Content",
      description: "View content",
      module: "Content",
      action: "read",
    },
    {
      id: "content:update",
      name: "Edit Content",
      description: "Modify content",
      module: "Content",
      action: "update",
    },
    {
      id: "team:manage",
      name: "Manage Teams",
      description: "Manage team assignments",
      module: "Teams",
      action: "manage",
    },
    {
      id: "reports:read",
      name: "View Reports",
      description: "Access reporting dashboard",
      module: "Reports",
      action: "read",
    },
    {
      id: "system:manage",
      name: "System Admin",
      description: "Full system administration",
      module: "System",
      action: "manage",
    },
  ];

  const handleCreateRole = () => {
    console.log("Creating role:", roleFormData);
    setIsCreateRoleOpen(false);
    setRoleFormData({ name: "", description: "", level: 1, permissions: [] });
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleFormData({
      name: role.name,
      description: role.description,
      level: role.level,
      permissions: role.permissions,
    });
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    console.log("Updating role:", editingRole?.id, roleFormData);
    setIsEditRoleOpen(false);
    setEditingRole(null);
    setRoleFormData({ name: "", description: "", level: 1, permissions: [] });
  };

  const handleDeleteRole = (roleId: string) => {
    const role = mockRoles.find((r) => r.id === roleId);
    if (role?.isSystem) {
      alert("Cannot delete system roles");
      return;
    }
    if (
      confirm(
        `Are you sure you want to delete this role? This will affect ${role?.userCount} users.`
      )
    ) {
      console.log("Deleting role:", roleId);
    }
  };

  const handleDuplicateRole = (role: Role) => {
    setRoleFormData({
      name: `${role.name} (Copy)`,
      description: role.description,
      level: role.level,
      permissions: [...role.permissions],
    });
    setIsCreateRoleOpen(true);
  };

  const togglePermission = (permissionId: string) => {
    setRoleFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="w-4 h-4" />;
      case "read":
        return <Eye className="w-4 h-4" />;
      case "update":
        return <Edit className="w-4 h-4" />;
      case "delete":
        return <Trash2 className="w-4 h-4" />;
      case "manage":
        return <Settings className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "text-green-600";
      case "read":
        return "text-blue-600";
      case "update":
        return "text-yellow-600";
      case "delete":
        return "text-red-600";
      case "manage":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredRoles = mockRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPermissions = mockPermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Permissions & Roles
          </h2>
          <p className="text-muted-foreground">
            Manage user roles and permissions across the system
          </p>
        </div>
        <Button onClick={() => setIsCreateRoleOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={role.isSystem ? "secondary" : "default"}
                        className={`bg-${role.color}-100 text-${role.color}-800`}>
                        {role.name}
                      </Badge>
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs">
                          System
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                        disabled={role.isSystem}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicateRole(role)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={role.isSystem}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{role.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span className="font-medium">{role.userCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Permissions</span>
                      <span className="font-medium">
                        {role.permissions.length}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-muted-foreground">
                        Updated: {new Date(role.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([module, permissions]) => (
              <Card key={module}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>{module}</span>
                  </CardTitle>
                  <CardDescription>
                    {permissions.length} permission
                    {permissions.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-3 p-3 rounded-lg border">
                        <div
                          className={`p-2 rounded-md bg-gray-100 ${getActionColor(
                            permission.action
                          )}`}>
                          {getActionIcon(permission.action)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{permission.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {permission.description}
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {permission.action}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                View which roles have access to specific permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Permission</TableHead>
                      {filteredRoles.map((role) => (
                        <TableHead
                          key={role.id}
                          className="text-center min-w-[100px]">
                          <div className="flex flex-col items-center space-y-1">
                            <Badge
                              variant="outline"
                              className={`bg-${role.color}-100 text-${role.color}-800`}>
                              {role.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Level {role.level}
                            </span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`p-1 rounded ${getActionColor(
                                permission.action
                              )}`}>
                              {getActionIcon(permission.action)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {permission.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {permission.module}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        {filteredRoles.map((role) => (
                          <TableCell key={role.id} className="text-center">
                            {role.permissions.includes(permission.id) ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                                ✓
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
                                ✕
                              </div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Role Dialog */}
      <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Create a new role with specific permissions for your users.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={roleFormData.name}
                  onChange={(e) =>
                    setRoleFormData({ ...roleFormData, name: e.target.value })
                  }
                  placeholder="Enter role name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Permission Level</Label>
                <Select
                  value={roleFormData.level.toString()}
                  onValueChange={(value) =>
                    setRoleFormData({ ...roleFormData, level: parseInt(value) })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        Level {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={roleFormData.description}
                onChange={(e) =>
                  setRoleFormData({
                    ...roleFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what this role can do"
              />
            </div>
            <div className="space-y-3">
              <Label>Permissions</Label>
              {Object.entries(groupedPermissions).map(
                ([module, permissions]) => (
                  <div key={module} className="space-y-2">
                    <h4 className="font-medium text-sm">{module}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={roleFormData.permissions.includes(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              togglePermission(permission.id)
                            }
                          />
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-normal cursor-pointer">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateRoleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole}>Create Role</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
            <DialogDescription>
              Modify the role settings and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Role Name</Label>
                <Input
                  id="edit-name"
                  value={roleFormData.name}
                  onChange={(e) =>
                    setRoleFormData({ ...roleFormData, name: e.target.value })
                  }
                  placeholder="Enter role name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-level">Permission Level</Label>
                <Select
                  value={roleFormData.level.toString()}
                  onValueChange={(value) =>
                    setRoleFormData({ ...roleFormData, level: parseInt(value) })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        Level {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={roleFormData.description}
                onChange={(e) =>
                  setRoleFormData({
                    ...roleFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what this role can do"
              />
            </div>
            <div className="space-y-3">
              <Label>Permissions</Label>
              {Object.entries(groupedPermissions).map(
                ([module, permissions]) => (
                  <div key={module} className="space-y-2">
                    <h4 className="font-medium text-sm">{module}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${permission.id}`}
                            checked={roleFormData.permissions.includes(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              togglePermission(permission.id)
                            }
                          />
                          <Label
                            htmlFor={`edit-${permission.id}`}
                            className="text-sm font-normal cursor-pointer">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditRoleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole}>Update Role</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsView;
