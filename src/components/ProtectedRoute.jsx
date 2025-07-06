"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session?.user &&
      requiredPermission &&
      !session.user.permissions?.includes(requiredPermission) &&
      !session.user.permissions?.includes("*")
    ) {
      router.push("/");
    }
  }, [session, status, requiredPermission, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default ProtectedRoute;
