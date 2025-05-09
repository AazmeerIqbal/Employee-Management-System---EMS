"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation"; // ✅ Next.js router

const AuthContext = createContext(undefined);

const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@aurahr.com",
    password: "password123",
    role: "Super Admin",
    permissions: ["*"]
  },
  {
    id: "2",
    name: "HR Manager",
    email: "hr@aurahr.com",
    password: "password123",
    role: "HR Manager",
    permissions: [
      "view_dashboard",
      "view_employees",
      "manage_employees",
      "view_attendance",
      "manage_attendance",
      "view_departments",
      "view_salary"
    ]
  },
  {
    id: "3",
    name: "Finance User",
    email: "finance@aurahr.com",
    password: "password123",
    role: "Finance",
    permissions: ["view_dashboard", "view_employees", "view_salary", "manage_salary"]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter(); // ✅ Next.js router

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      const safeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.permissions
      };

      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));

      toast({
        title: "Welcome back!",
        description: `Logged in as ${safeUser.name}`,
      });

      router.push("/"); // ✅ Next.js navigation
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      const userExists = mockUsers.some(u => u.email === email);
      if (userExists) {
        throw new Error("User with this email already exists");
      }

      console.log("Sign up data:", { name, email, password });

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });

      router.push("/login"); // ✅ Next.js navigation
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    router.push("/login"); // ✅ Next.js navigation
  };

  const checkPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes("*")) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
