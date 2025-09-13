import { memo, useCallback, useState } from "react";
import {
  Settings,
  ChevronDown,
  LogOut,
  Bell,
  Menu,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

function HeaderComponent({ title = "Admin Panel", children }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { mutate: logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard
    if (pathSegments[0] === 'dashboard') {
      breadcrumbs.push({ label: 'Dashboard', path: '/dashboard' });

      // Add subsequent segments
      let currentPath = '/dashboard';
      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        currentPath += `/${segment}`;
        
        // Capitalize and format segment names
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({ label, path: currentPath });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleLogoClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    logout();
    navigate("/signin");
  }, [logout, navigate]);

  const handleProfileClick = useCallback(() => {
    navigate("/dashboard/settings");
  }, [navigate]);

  return (
    <header className="border-b bg-background px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Breadcrumbs */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={handleLogoClick}>
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {title}
            </h1>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center">
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(crumb.path);
                            }}
                            className="cursor-pointer">
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>

        {/* Search Bar and Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {children}

          <ThemeToggle />

          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-8 w-8 p-0">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Notifications
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          System update completed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your dashboard has been updated with new features
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New user registered
                        </p>
                        <p className="text-xs text-muted-foreground">
                          A new user has joined your platform
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Monthly report ready
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your monthly analytics report is available
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 h-8"
                  disabled={isLoading}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline font-medium">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-6 pt-6">
                {/* Search in mobile */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* User profile in mobile */}
                {user && (
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile notifications */}
                {user && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">
                      Recent Notifications
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                        <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            System update completed
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 minutes ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            New user registered
                          </p>
                          <p className="text-xs text-muted-foreground">
                            1 hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t">
                  {children && <div className="mb-4">{children}</div>}

                  {/* Theme toggle in mobile menu */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>

                  {user && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleProfileClick}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Optimize rendering with React.memo
export const Header = memo(HeaderComponent);
