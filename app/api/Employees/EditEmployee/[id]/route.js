import { connectToDB, closeConnection, config } from "@/utils/database";
import { NextResponse } from "next/server";

// PATCH /api/employee/edit/[id]
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const EmpId = parseInt(id);
    if (!EmpId || isNaN(EmpId)) {
      return NextResponse.json(
        { message: "Invalid EmpId in URL." },
        { status: 400 }
      );
    }

    const body = await req.json(); // Incoming updated data

    const pool = await connectToDB(config);

    await pool
      .request()
      .input("EmpId", EmpId)
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
      .input("LastUpdatedOn", new Date())
      .input("LastUpdatedBy", body.lastUpdatedBy)
      .input("Del", body.del ?? 0)
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
          EmergencyContactName = @EmergencyContactName,
          EmergencyContactNo = @EmergencyContactNo,
          EmailId = @EmailId,
          PostalAddress = @PostalAddress,
          CountryId = @CountryId,
          CityId = @CityId,
          PostalZipCode = @PostalZipCode,
          BloodType = @BloodType,
          MaritalStatus = @MaritalStatus,
          Dependents = @Dependents,
          ProfilePhoto = @ProfilePhoto,
          LastUpdatedOn = @LastUpdatedOn,
          LastUpdatedBy = @LastUpdatedBy,
          Del = @Del,
          IsSalaryTransfer = @IsSalaryTransfer,
          BankName = @BankName,
          AccountNo = @AccountNo,
          IsOTApply = @IsOTApply,
          IsActive = @IsActive,
          IsAttRequired = @IsAttRequired,
          Qualification = @Qualification,
          LastCompany = @LastCompany,
          Note = @Note,
          PermanentAddress = @PermanentAddress,
          IsOTOnHolidays = @IsOTOnHolidays,
          FormBNo = @FormBNo,
          RosterId = @RosterId
        WHERE EmpId = @EmpId
      `);

    await closeConnection(pool);

    return NextResponse.json({
      message: `Employee with ID ${EmpId} updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
