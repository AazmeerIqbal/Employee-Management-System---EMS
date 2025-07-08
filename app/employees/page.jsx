"use client";

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import EmployeeTable from "../../src/components/employees/EmployeeTable";
import EmployeeForm from "../../src/components/employees/EmployeeForm";
import { Button } from "../../src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "../../src/hooks/use-toast";
import { useSession } from "next-auth/react";


const Employees = () => {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  console.log("Session Data:", session.user.id);

 const getEmployeeData = async () => {
  try {
    const apiUrl = `/api/Employees/GetEmployees/${session.user.id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Fetched Employees:", data.data);
    
    setEmployees(data.data || []);

  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};

  useEffect(() => {
    if (session && session.user && session.user.id) {
      getEmployeeData();
    }
  }, [session]);

  const getDepartmentData = async () => {
    try {
      const apiUrl = `/api/Departments/GetDepartments/${session.user.id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched Departments:", data.data);
      
      // Assuming you want to do something with the department data
      setDepartments(data.data || []);

    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

    useEffect(() => {
    if (session && session.user && session.user.id) {
      getDepartmentData();
    }
  }, [session]);



  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("view");
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("edit");
  };

  const handleDeleteEmployee = (employeeId) => {
    // In a real app, you would make an API call
    // For now, we just filter the employee out of our state
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
    toast({
      title: "Employee deleted",
      description: "The employee has been removed successfully",
    });
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setCurrentView("add");
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    getEmployeeData();

    // if (currentView === "add") {
    //   // Generate a random ID (in a real app, the backend would do this)
    //   const newEmployee = {
    //     ...data,
    //     id: `${employees.length + 1}`,
    //     status: data.status || "active",
    //     role: data.role || "",
    //     email: data.email || "",
    //     department: data.department || "",
    //     joinedDate: data.joinedDate || new Date().toLocaleDateString(),
    //     image: data.image || "",
    //     name: data.name || "",
    //   };
    //   setEmployees([...employees, newEmployee]);
    //   toast({
    //     title: "Employee added",
    //     description: "The employee has been added successfully",
    //   });
    // } else if (currentView === "edit" && selectedEmployee) {
    //   setEmployees(
    //     employees.map((emp) =>
    //       emp.id === selectedEmployee.id
    //         ? {
    //             ...emp,
    //             ...data,
    //             status: data.status || emp.status,
    //           }
    //         : emp
    //     )
    //   );
    //   toast({
    //     title: "Employee updated",
    //     description: "The employee has been updated successfully",
    //   });
    // }

    setIsSubmitting(false);
    setCurrentView("list");
  };

  const goBack = () => {
    setCurrentView("list");
    setSelectedEmployee(null);
  };

  return (
    <>
      <Helmet>
        <title>Employees | AuraHR</title>
      </Helmet>
      <div className="space-y-6">
        {currentView === "list" ? (
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
              <p className="text-muted-foreground">
                Manage your organization's employee records
              </p>
            </div>
            <EmployeeTable
              employees={employees}
              department={departments}
              onView={handleViewEmployee}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              onAddNew={handleAddNew}
            />
          </>
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">
                  {currentView === "add"
                    ? "Add Employee"
                    : currentView === "edit"
                    ? "Edit Employee"
                    : "View Employee"}
                </h1>
              </div>
              <p className="text-muted-foreground ml-10">
                {currentView === "add"
                  ? "Add a new employee to your organization"
                  : currentView === "edit"
                  ? "Update employee information"
                  : "View employee details"}
              </p>
            </div>
            <div className="ml-10">
              <EmployeeForm
                defaultValues={selectedEmployee}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Employees;
