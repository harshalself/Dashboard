import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function UsersPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect /dashboard/users to /dashboard/users/all by default
  useEffect(() => {
    if (location.pathname === "/dashboard/users") {
      navigate("/dashboard/users/all", { replace: true });
    }
  }, [location.pathname, navigate]);

  return <DashboardLayout title="Admin Dashboard" />;
}
