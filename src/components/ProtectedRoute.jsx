"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (
        requiredPermission &&
        !user.permissions.includes(requiredPermission) &&
        !user.permissions.includes("*")
      ) {
        router.push("/");
      }
    }
  }, [user, loading, requiredPermission, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
