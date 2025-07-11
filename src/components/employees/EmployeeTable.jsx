import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EmployeeTable = ({
  employees,
  department,
  mainDepartment,
  branch,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = [
    "all",
    ...Array.from(new Set(employees.map((emp) => emp.department))),
  ];

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString("en-GB"); // "10/03/1971"
  };

  const getMainDepartmentName = (id) => {
    const mainDept = mainDepartment.find((d) => d.MainDeptID === id);
    return mainDept ? mainDept.MainDeptName : "Unknown";
  };

  const getSubDepartmentName = (id) => {
    const subDept = department.find((d) => d.EmpDeptId === id);
    return subDept ? subDept.DeptName : "Unknown";
  };

  const getBranchName = (id) => {
    const Unit = branch.find((d) => d.BranchID === id);
    return Unit ? Unit.BranchName : "Unknown";
  };

  const filteredEmployees = employees.filter((employee) => {
    const name = employee.EmpName?.toLowerCase() || "";
    const email = employee.email?.toLowerCase() || "";
    const role = employee.role?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" ||
      employee.MainDepartment === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const offset = currentPage * rowsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    offset,
    offset + rowsPerPage
  );
  const pageCount = Math.ceil(filteredEmployees.length / rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "on-leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
             {departments.map((dept, index) => {
                const value = dept || `unknown-${index}`;
                return (
                  <SelectItem key={value} value={value}>
                    {dept === "all" ? "All Departments" : dept || "Unknown"}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onAddNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="rounded-md border shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="hidden md:table-cell">Unit</TableHead>
              <TableHead className="hidden sm:table-cell">
                Main Department
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Sub Department
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                CNIC/Form B#
              </TableHead>
              <TableHead className="hidden sm:table-cell">Cell #</TableHead>
              <TableHead className="hidden sm:table-cell">DOB</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              paginatedEmployees.map((employee) => (
                <TableRow key={employee.EmpId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={employee.image}
                          alt={employee.EmpName}
                        />
                        <AvatarFallback>
                          {employee.EmpName?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.EmpName}</p>{" "}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {getBranchName(employee.BranchId)}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {getMainDepartmentName(employee.MainDeptId)}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {getSubDepartmentName(employee.EmpDeptId)}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {employee.CNICNo}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {employee.CellNo}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {formatDate(employee.DOB)}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeStyle(employee.status)}
                    >
                      {employee.status
                        ? employee.status === "on-leave"
                          ? "On Leave"
                          : employee.status.charAt(0).toUpperCase() +
                            employee.status.slice(1)
                        : "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(employee.EmpId)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex   items-center mt-6 ">
        <p className="text-sm text-muted-foreground mr-2">
          Showing <b>{paginatedEmployees.length}</b> of{" "}
          <b>{filteredEmployees.length}</b> employees
        </p>
        <ReactPaginate
          previousLabel={
            <span className="flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-800 text-sm">
              <ChevronLeft className="h-4 w-4" />
            </span>
          }
          nextLabel={
            <span className="flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-800 text-sm">
              <ChevronRight className="h-4 w-4" />
            </span>
          }
          breakLabel={<span className="px-2 py-1 text-sm">...</span>}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          forcePage={currentPage}
          containerClassName="flex w-full justify-center cursor-pointer mr-6 items-center gap-2  flex-wrap"
          pageLinkClassName="px-3 py-1 border rounded text-sm hover:bg-gray-800 hover:text-white"
          activeLinkClassName="bg-blue-600 text-white"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
