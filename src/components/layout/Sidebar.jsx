"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
      permission: "view_dashboard",
    },
    {
      title: "Employees",
      icon: <Users size={20} />,
      path: "/employees",
      permission: "view_employees",
    },
    {
      title: "Attendance",
      icon: <Clock size={20} />,
      path: "/attendance",
      permission: "view_attendance",
    },
    {
      title: "Salary",
      icon: <DollarSign size={20} />,
      path: "/salary",
      permission: "view_salary",
    },
    {
      title: "Departments",
      icon: <Briefcase size={20} />,
      path: "/departments",
      permission: "view_departments",
    },
    {
      title: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/reports",
      permission: "view_reports",
    },
    {
      title: "Calendar",
      icon: <Calendar size={20} />,
      path: "/calendar",
      permission: "view_calendar",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      permission: "view_settings",
    },
  ];

  // Filter menu items based on user permissions
  const filteredMenuItems = menuItems.filter((item) => {
    // If no session or no permissions, show all items (fallback)
    if (!session?.user?.permissions) {
      console.log("No permissions found, showing all menu items");
      return true;
    }

    // Check if user has wildcard permission or specific permission
    const hasPermission =
      session.user.permissions.includes("*") ||
      session.user.permissions.includes(item.permission);

    console.log(
      `Menu item ${item.title}: permissions=${session.user.permissions}, hasPermission=${hasPermission}`
    );

    return hasPermission;
  });

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground flex flex-col h-full ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out shadow-lg border-r border-sidebar-border`}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border/30">
        {!collapsed && (
          <div className="text-xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-white">
              AuraHR
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md bg-sidebar-accent/20 text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all duration-200 hover:scale-105"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                }`}
              >
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border/30">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent/20 flex items-center justify-center text-sidebar-foreground font-medium">
              {session?.user?.name?.charAt(0) ||
                session?.user?.fullname?.charAt(0) ||
                "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">
                {session?.user?.name || session?.user?.fullname || "User"}
              </span>
              <span className="text-xs opacity-75 text-sidebar-foreground">
                {session?.user?.roleId === 1 ? "Admin" : "User"}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
