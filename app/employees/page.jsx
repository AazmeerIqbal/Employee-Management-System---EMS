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
   const [mainDepartments, setMainDepartments] = useState([]);
    const [branch, setBranch] = useState([]);


    console.log("Session Data:", session);
      
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();



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


  

    const getMainDepartmentData = async () => {
    try {
      const apiUrl = `/api/Departments/MainDepartments/${session.user.id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
   
      
      // Assuming you want to do something with the department data
      setMainDepartments(data.data || []);

    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

    useEffect(() => {
    if (session && session.user && session.user.id) {
      getMainDepartmentData();
    }
  }, [session]);


  const getDepartmentData = async () => {
    try {
      const apiUrl = `/api/Departments/SubDepartments/${session.user.id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      
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


  
  const getBranchData = async () => {
    try {
      const apiUrl = `/api/Branch/GetBranch/${session.user.id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
  
      
      // Assuming you want to do something with the department data
      setBranch(data.data || []);

    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

    useEffect(() => {
    if (session && session.user && session.user.id) {
      getBranchData();
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



const handleDeleteEmployee = async (employeeId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/api/Employees/DeleteEmployee/${employeeId}`, {
      method: "DELETE",
    });


    if (!response.ok) {
      throw new Error("Failed to delete employee.");
    }

    toast({
      title: "Employee deleted",
      description: "The employee has been removed successfully.",
    });

    // Reload employee list
    await getEmployeeData();

  } catch (error) {
    console.error("Delete error:", error);
    toast({
      title: "Error",
      description: error.message || "Failed to delete employee.",
      variant: "destructive",
    });
  }

  
    console.log("Selected Employee For Delete:", employeeId);
};

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setCurrentView("add");
  };

  const handleSubmit = async (formData) => {
  setIsSubmitting(true);

   console.log("📦 Submitting to backend:", formData);

  try {
    const isEdit = currentView === "edit";
    const endpoint = isEdit
      ? `/api/Employees/EditEmployee/${selectedEmployee.EmpId}`
      : `/api/Employees/InsertEmployees`;

    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        UserId: session.user.id, // if required by backend
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit employee data.");
    }

    toast({
      title: isEdit ? "Employee updated" : "Employee added",
      description: `The employee has been successfully ${isEdit ? "updated" : "added"}.`,
    });

    // Reload employee data
    await getEmployeeData();
    setCurrentView("list");
    setSelectedEmployee(null);
  } catch (error) {
    console.error("Submit error:", error);
    toast({
      title: "Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const goBack = () => {
    setCurrentView("list");
    setSelectedEmployee(null);
  };


  console.log("Selected for edit:", selectedEmployee);

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
              mainDepartment={mainDepartments}
              branch={branch}
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
                mainDepartment={mainDepartments}
                subDepartment={departments}
                Branch={branch}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Employees;
