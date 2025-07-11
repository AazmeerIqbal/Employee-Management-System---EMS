import { connectToDB, closeConnection, config } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Receive posted JSON data

    const pool = await connectToDB(config);

    const result = await pool
      .request()
      .input("CompanyID", parseInt(body.CompanyID))
      .input("BranchId", parseInt(body.BranchId))
      .input("EmpCode", body.EmpCode)
      .input("MainDeptID", parseInt(body.MainDeptID))
      .input("EmpDeptId", parseInt(body.EmpDeptId))
      .input("EmpType", body.EmpType)
      .input("EmpName", body.EmpName)
      .input("FatherName", body.FatherName)
      .input("Gender", body.Gender)
      .input("Designation", body.Designation)
      .input("DOB", body.DOB)
      .input("JoiningDate", body.JoiningDate)
      .input("ResigningDate", body.ResigningDate || null)
      .input("CNICNo", body.CNICNo)
      .input("CellNo", body.CellNo)
      .input("EmergencyContactName", body.EmergencyContactName)
      .input("EmergencyContactNo", body.EmergencyContactNo)
      .input("EmailId", body.EmailId)
      .input("ProfilePhoto", body.ProfilePhotos || null)
      .input("PostalAddress", body.PostalAddress)
      .input("CountryId", parseInt(body.CountryId))
      .input("CityId", parseInt(body.CityId))
      .input("BloodType", body.BloodType)
      .input("MaritalStatus", body.MaritalStatus)
      .input("Dependents", body.Dependents)
      .input("Qualification", body.Qualification)
      .input("PostalZipCode", body.PostalZipCode)
      .input("LastCompany", body.LastCompany)
      .input("CreatedOn", new Date())
      .input("CreatedBy", body.UserId || null)
       .input("LastUpdatedOn", new Date())
      .input("LastUpdatedBy", body.UserId || null)
      .input("Note", body.Note)
      .input("PermanentAddress", body.PermanentAddress)
      .input("FormBNo", body.FormBNo)
      .input("RosterId", body.RosterId).query(`
        INSERT INTO Employee_mst (
          CompanyID ,BranchId, EmpCode, MainDeptID, EmpDeptId, EmpType,
          EmpName, FatherName, Gender, Designation, DOB, JoiningDate,
          ResigningDate, CNICNo, CellNo,PostalZipCode, EmergencyContactName, EmergencyContactNo,
          EmailId, PostalAddress, CountryId, CityId, BloodType,ProfilePhoto
          MaritalStatus, Dependents, Qualification,CreatedOn,CreatedBy,LastUpdatedOn, LastUpdatedBy,
          LastCompany, Note, PermanentAddress,FormBNo,RosterId
        )
        VALUES (
          @CompanyID ,@BranchId, @EmpCode, @MainDeptID, @EmpDeptId, @EmpType,
          @EmpName, @FatherName, @Gender, @Designation, @DOB, @JoiningDate,
          @ResigningDate, @CNICNo, @CellNo, @PostalZipCode, @EmergencyContactName, @EmergencyContactNo,
          @EmailId, @PostalAddress, @CountryId, @CityId, @BloodType,@ProfilePhoto,
          @MaritalStatus, @Dependents, @Qualification,@CreatedOn, @CreatedBy,@LastUpdatedOn, @LastUpdatedBy,
          @LastCompany, @Note, @PermanentAddress, @FormBNo,@RosterId
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
