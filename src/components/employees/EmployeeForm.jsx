import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { useTheme } from "next-themes"; // ✅ No conflict now
import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2, Upload } from "lucide-react";

const EmployeeForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mainDepartment,
  subDepartment,
  Branch = false,
}) => {
  const [imagePreview, setImagePreview] = useState(defaultValues?.ProfilePhoto);

  const form = useForm({
    defaultValues: {
      CompanyID: "",
      EmpCode: "",
      EmpName: "",
      FatherName: "",
      BranchId: "",
      EmailId: "",
      CellNo: "",
      EmpDeptId: "",
      MainDeptID: "",
      Gender: "",
      Role: "",
      Designation: "",
      JoiningDate: "",
      PostalAddress: "",
      PermanentAddress: "",
      Note: "",
      Status: "active",
      MaritalStatus: "",
      Dependents: "",
      BloodType: "",
      LastCompany: "",
      Qualification: "",
      CountryId: "",
      CityId: "",
      ResigningDate: "",
      EmpType: "",
      DOB: "",
      CNICNo: "",
      AttendanceCategory: "",
      EmergencyContactName: "",
      EmergencyContactNo: "",
      FormBNo: "",
      PostalZipCode: "",
      RosterId: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues); // Reset all form values
      setImagePreview(defaultValues.image || ""); // Reset profile image preview
    }
  }, [defaultValues]);

  console.log("defaultValues", defaultValues);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data) => {
    // let hasError = false;

    // if (!data.EmpName?.trim()) {
    //   form.setError("EmpName", { message: "Employee name is required" });
    //   hasError = true;
    // }

    // if (!data.EmpCode) {
    //   form.setError("EmpCode", { message: "Employee Code is required" });
    //   hasError = true;
    // }

    // if (!data.CNICNo) {
    //   form.setError("CNICNo", { message: "CNICNo  is required" });
    //   hasError = true;
    // }

    // if (!data.CellNo) {
    //   form.setError("CellNo", { message: "CellNo  is required" });
    //   hasError = true;
    // }

    // if (!data.MainDeptID) {
    //   form.setError("MainDeptID", { message: "Main Department  is required" });
    //   hasError = true;
    // }

    // if (!data.EmpDeptId) {
    //   form.setError("EmpDeptId", { message: "Sub Department  is required" });
    //   hasError = true;
    // }

    // if (!data.EmailId) {
    //   form.setError("EmailId", { message: "EmailId  is required" });
    //   hasError = true;
    // }

    // if (!data.JoiningDate) {
    //   form.setError("JoiningDate", { message: "Joining date is required" });
    //   hasError = true;
    // }

    // // Add other field validations here...

    // if (hasError) return;

    onSubmit({ ...data, ProfilePhoto: imagePreview });
  };

  const formatCnic = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    let formatted = digits;
    if (digits.length > 5)
      formatted = digits.slice(0, 5) + "-" + digits.slice(5);
    if (digits.length > 12)
      formatted = formatted.slice(0, 13) + "-" + digits.slice(12);
    return formatted;
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 4)
      formatted = digits.slice(0, 4) + "-" + digits.slice(4);
    return formatted;
  };

  const customStyles = (isDarkMode) => ({
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1f2937" : "", // dark: gray-800, light: white
      borderColor: state.isFocused
        ? "#6366f1"
        : isDarkMode
        ? "#374151"
        : "#d1d5db", // dark: gray-700, light: gray-300
      color: isDarkMode ? "#f3f4f6" : "", // dark: gray-100, light: gray-900
      boxShadow: "none",
      "&:hover": {
        borderColor: isDarkMode ? "#4b5563" : "#9ca3af", // subtle hover border
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
      color: isDarkMode ? "#f3f4f6" : "#111827",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "#4f46e5"
          : "#6366f1"
        : state.isFocused
        ? isDarkMode
          ? "#374151"
          : "#e5e7eb"
        : "transparent",
      color: isDarkMode ? "#f3f4f6" : "#111827",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#f3f4f6" : "",
    }),
    input: (base) => ({
      ...base,
      color: isDarkMode ? "#f3f4f6" : "",
    }),
  });

  const { theme } = useTheme(); // dark / light
  const isDarkMode = theme === "dark";

  const departmentOptions =
    subDepartment?.map((dept) => ({
      value: dept.EmpDeptId,
      label: dept.DeptName,
    })) || [];

  const mainDepartmentOptions =
    mainDepartment?.map((dept) => ({
      value: dept.MainDeptId,
      label: dept.MainDeptName,
    })) || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="EmpCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emp Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="BranchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit/Branch</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Branch.map((unit) => (
                          <SelectItem key={unit.BranchID} value={unit.BranchID}>
                            {unit.BranchName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="MainDeptID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Department</FormLabel>
                    <Controller
                      control={form.control}
                      name="MainDeptID"
                      render={({ field: { onChange, value, ref } }) => (
                        <ReactSelect
                          inputRef={ref}
                          value={mainDepartmentOptions.find(
                            (opt) => opt.value === value
                          )}
                          onChange={(selected) => onChange(selected?.value)}
                          options={mainDepartmentOptions}
                          placeholder="Select Main Department"
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={customStyles(isDarkMode)}
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="EmpType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employeement Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employeement Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Salary Base">Salary Base</SelectItem>
                        <SelectItem value="Contract Base">
                          Contract Base
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="EmpDeptId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Department</FormLabel>
                    <Controller
                      control={form.control}
                      name="EmpDeptId"
                      render={({ field: { onChange, value, ref } }) => (
                        <ReactSelect
                          inputRef={ref}
                          value={departmentOptions.find(
                            (opt) => opt.value === value
                          )}
                          onChange={(selected) => onChange(selected?.value)}
                          options={departmentOptions}
                          placeholder="Select Sub Department"
                          isSearchable
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={customStyles(isDarkMode)}
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="EmpName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="CompanyID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comapny ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="md:w-1/3 flex flex-col order-[-1] md:order-1 gap-4">
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed rounded-lg">
                  <Avatar className="h-32 w-32">
                    {imagePreview ? (
                      <AvatarImage src={imagePreview} alt="Profile preview" />
                    ) : null}
                    <AvatarFallback className="text-2xl">
                      {form.watch("EmpName")
                        ? form
                            .watch("EmpName")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "?"}
                    </AvatarFallback>
                  </Avatar>

                  <FormLabel
                    htmlFor="image-upload"
                    className="cursor-pointer bg-secondary hover:bg-[hsl(var(--secondary)/0.8)] text-secondary-foreground py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Upload size={16} />
                    <span>
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </span>
                  </FormLabel>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <FormDescription className="text-xs text-center">
                    Recommended: Square JPG, PNG (max 5MB)
                  </FormDescription>
                </div>
              </FormItem>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : defaultValues?.id ? (
                    "Update Employee"
                  ) : (
                    "Add Employee"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="Designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="DOB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="JoiningDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joining Date</FormLabel>
                <FormControl>
                  <Input  type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CNICNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNIC #</FormLabel>
                <FormControl>
                  <Input
                    placeholder="#####-#######-#"
                    value={field.value}
                    onChange={(e) => {
                      const formatted = formatCnic(e.target.value);
                      field.onChange(formatted); // update React Hook Form
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CellNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cell #</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxx-xxxxxxx"
                    value={field.value}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      field.onChange(formatted); // update React Hook Form
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="FormBNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form B Refrence</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="AttendanceCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attendance Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Attendance Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="EmergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="EmergencyContactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxx-xxxxxxx"
                    value={field.value}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      field.onChange(formatted); // update React Hook Form
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="EmailId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="MaritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Martial Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Martial Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widow">Widow</SelectItem>
                    <SelectItem value="Widower">Widower</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Dependents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number Of Depends</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="BloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="LastCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Last Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Education" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CountryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="161">Pakistan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="47575">Karachi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PostalZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Zip Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Postal Zip Code"
                    {...field}
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="RosterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roster ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Roster ID"
                    {...field}
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="PostalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St, City, State, Zip"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PermanentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
