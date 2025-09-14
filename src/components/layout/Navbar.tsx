import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { mutate: logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a
              href="#stats"
              className="text-muted-foreground hover:text-foreground transition-colors">
              Stats
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-6 pt-6">
                  {/* Navigation Links */}
                  <div className="space-y-4">
                    <a
                      href="#home"
                      className="block text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Home
                    </a>
                    <a
                      href="#features"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Features
                    </a>
                    <a
                      href="#stats"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Stats
                    </a>
                    <a
                      href="#about"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      About Us
                    </a>
                  </div>

                  {/* Auth Actions */}
                  <div className="space-y-2 pt-4 border-t">
                    {/* Theme toggle in mobile menu */}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeToggle />
                    </div>

                    {isAuthenticated ? (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate("/dashboard");
                            setIsMobileMenuOpen(false);
                          }}>
                          Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate("/signin");
                            setIsMobileMenuOpen(false);
                          }}>
                          Sign In
                        </Button>
                        <Button
                          className="w-full justify-start"
                          onClick={() => {
                            navigate("/signup");
                            setIsMobileMenuOpen(false);
                          }}>
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
