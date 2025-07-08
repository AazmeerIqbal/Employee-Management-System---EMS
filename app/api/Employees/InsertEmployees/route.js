import { connectToDB, closeConnection, config } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Receive posted JSON data

    const pool = await connectToDB(config);

    const result = await pool
      .request()
      .input("CompanyID", body.companyId)
      .input("BranchId", body.branchId)
      .input("EmpCode", body.empCode)
      .input("MainDeptID", body.mainDeptId)
      .input("EmpDeptId", body.empDeptId)
      .input("EmpType", body.empType)
      .input("EmpName", body.empName)
      .input("FatherName", body.fatherName)
      .input("Gender", body.gender)
      .input("Designation", body.designation)
      .input("DOB", body.dob)
      .input("JoiningDate", body.joiningDate)
      .input("ResigningDate", body.resigningDate || null)
      .input("CNICNo", body.cnicNo)
      .input("CellNo", body.cellNo)
      .input("EmergencyContactName", body.emergencyContactName)
      .input("EmergencyContactNo", body.emergencyContactNo)
      .input("EmailId", body.emailId)
      .input("PostalAddress", body.postalAddress)
      .input("CountryId", body.countryId)
      .input("CityId", body.cityId)
      .input("PostalZipCode", body.postalZipCode)
      .input("BloodType", body.bloodType)
      .input("MaritalStatus", body.maritalStatus)
      .input("Dependents", body.dependents)
      .input("ProfilePhoto", body.profilePhoto)
      .input("CreatedOn", new Date())
      .input("CreatedBy", body.createdBy)
      .input("LastUpdatedOn", new Date())
      .input("LastUpdatedBy", body.lastUpdatedBy)
      .input("Del", 0)
      .input("IsSalaryTransfer", body.isSalaryTransfer)
      .input("BankName", body.bankName)
      .input("AccountNo", body.accountNo)
      .input("IsOTApply", body.isOTApply)
      .input("IsActive", body.isActive)
      .input("IsAttRequired", body.isAttRequired)
      .input("Qualification", body.qualification)
      .input("LastCompany", body.lastCompany)
      .input("Note", body.note)
      .input("PermanentAddress", body.permanentAddress)
      .input("IsOTOnHolidays", body.isOTOnHolidays)
      .input("FormBNo", body.formBNo)
      .input("RosterId", body.rosterId).query(`
        INSERT INTO Employee_mst (
          CompanyID, BranchId, EmpCode, MainDeptID, EmpDeptId, EmpType,
          EmpName, FatherName, Gender, Designation, DOB, JoiningDate,
          ResigningDate, CNICNo, CellNo, EmergencyContactName, EmergencyContactNo,
          EmailId, PostalAddress, CountryId, CityId, PostalZipCode, BloodType,
          MaritalStatus, Dependents, ProfilePhoto, CreatedOn, CreatedBy,
          LastUpdatedOn, LastUpdatedBy, Del, IsSalaryTransfer, BankName,
          AccountNo, IsOTApply, IsActive, IsAttRequired, Qualification,
          LastCompany, Note, PermanentAddress, IsOTOnHolidays, FormBNo, RosterId
        )
        VALUES (
          @CompanyID, @BranchId, @EmpCode, @MainDeptID, @EmpDeptId, @EmpType,
          @EmpName, @FatherName, @Gender, @Designation, @DOB, @JoiningDate,
          @ResigningDate, @CNICNo, @CellNo, @EmergencyContactName, @EmergencyContactNo,
          @EmailId, @PostalAddress, @CountryId, @CityId, @PostalZipCode, @BloodType,
          @MaritalStatus, @Dependents, @ProfilePhoto, @CreatedOn, @CreatedBy,
          @LastUpdatedOn, @LastUpdatedBy, @Del, @IsSalaryTransfer, @BankName,
          @AccountNo, @IsOTApply, @IsActive, @IsAttRequired, @Qualification,
          @LastCompany, @Note, @PermanentAddress, @IsOTOnHolidays, @FormBNo, @RosterId
        )
      `);

    await closeConnection(pool);

    return NextResponse.json({
      message: "Employee inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting employee:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Sample json input Data

// {
//     "companyId": 12,
//     "branchId": 1,
//     "empCode": "EMP-1001",
//     "mainDeptId": 2,
//     "empDeptId": 3,
//     "empType": "Full-Time",
//     "empName": "Ali Khan",
//     "fatherName": "Mehmood Khan",
//     "gender": "Male",
//     "designation": "Software Engineer",
//     "dob": "1995-06-10",
//     "joiningDate": "2022-01-01",
//     "resigningDate": null,
//     "cnicNo": "42101-1234567-8",
//     "cellNo": "03001234567",
//     "emergencyContactName": "Sara Khan",
//     "emergencyContactNo": "03211234567",
//     "emailId": "ali.khan@example.com",
//     "postalAddress": "House #1, Street 2, Karachi",
//     "countryId": 167,
//     "cityId": 23,
//     "postalZipCode": "74000",
//     "bloodType": "B+",
//     "maritalStatus": "Single",
//     "dependents": "0",
//     "profilePhoto": "photo_url_here",
//     "createdBy": 1,
//     "lastUpdatedBy": 1,
//     "isSalaryTransfer": 1,
//     "bankName": "UBL",
//     "accountNo": "1234567890123456",
//     "isOTApply": 1,
//     "isActive": 1,
//     "isAttRequired": 1,
//     "qualification": "BSCS",
//     "lastCompany": "XYZ Ltd.",
//     "note": "N/A",
//     "permanentAddress": "Same as above",
//     "isOTOnHolidays": 0,
//     "formBNo": "B123456789",
//     "rosterId": 4
//   }
