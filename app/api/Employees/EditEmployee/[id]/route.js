import { NextResponse } from "next/server";
import { connectToDB, closeConnection, config } from "@/utils/database";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const EmpId = parseInt(id);

    if (!EmpId || isNaN(EmpId)) {
      return NextResponse.json(
        { message: "Invalid EmpId in URL." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const pool = await connectToDB(config);

    await pool
      .request()
      .input("EmpId", EmpId)
      .input("CompanyID", body.CompanyID)
      .input("BranchId", body.BranchId)
      .input("EmpCode", body.EmpCode)
      .input("MainDeptID", body.MainDeptID)
      .input("EmpDeptId", body.EmpDeptId)
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
      .input("PostalZipCode", body.PostalZipCode)
      .input("EmergencyContactName", body.EmergencyContactName)
      .input("EmergencyContactNo", body.EmergencyContactNo)
      .input("EmailId", body.EmailId)
      .input("PostalAddress", body.PostalAddress)
      .input("CountryId", body.CountryId)
      .input("CityId", body.CityId)
      .input("BloodType", body.BloodType)
      .input("ProfilePhoto", body.ProfilePhoto || null)
      .input("MaritalStatus", body.MaritalStatus)
      .input("Dependents", body.Dependents)
      .input("Qualification", body.Qualification)
      .input("LastCompany", body.LastCompany)
      .input("Note", body.Note)
      .input("CreatedOn", new Date())
      .input("CreatedBy", body.UserId || null)
      .input("LastUpdatedOn", new Date())
      .input("LastUpdatedBy", body.UserId || null)
      .input("PermanentAddress", body.PermanentAddress)
      .input("FormBNo", body.FormBNo)
      .input("RosterId", body.RosterId)
      .query(`
        UPDATE Employee_mst SET
          CompanyID = @CompanyID,
          BranchId = @BranchId,
          EmpCode = @EmpCode,
          MainDeptID = @MainDeptID,
          EmpDeptId = @EmpDeptId,
          EmpType = @EmpType,
          EmpName = @EmpName,
          FatherName = @FatherName,
          Gender = @Gender,
          Designation = @Designation,
          DOB = @DOB,
          JoiningDate = @JoiningDate,
          ResigningDate = @ResigningDate,
          CNICNo = @CNICNo,
          CellNo = @CellNo,
          ProfilePhoto = @ProfilePhoto,
          PostalZipCode = @PostalZipCode,
          EmergencyContactName = @EmergencyContactName,
          EmergencyContactNo = @EmergencyContactNo,
          EmailId = @EmailId,
          PostalAddress = @PostalAddress,
          CountryId = @CountryId,
          CityId = @CityId,
          BloodType = @BloodType,
          MaritalStatus = @MaritalStatus,
          Dependents = @Dependents,
          Qualification = @Qualification,
          LastCompany = @LastCompany,
          Note = @Note,
          PermanentAddress = @PermanentAddress,
          FormBNo = @FormBNo,
          RosterId = @RosterId,
          CreatedOn = @CreatedOn,
          CreatedBy = @CreatedBy,
          LastUpdatedOn = @LastUpdatedOn,
          LastUpdatedBy = @LastUpdatedBy
        WHERE EmpId = @EmpId
      `);

    await closeConnection(pool);

    return NextResponse.json({
      message: `Employee with ID ${EmpId} updated successfully.`,
    }); // ✅ proper JSON response
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
