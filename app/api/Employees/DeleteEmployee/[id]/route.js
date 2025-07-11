
import { connectToDB, closeConnection, config } from "@/utils/database";
import { NextResponse } from "next/server";

// Use DELETE instead of GET
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { message: "Invalid or missing EmpId." },
        { status: 400 }
      );
    }

    const pool = await connectToDB(config);

    await pool
      .request()
      .input("EmpId", parseInt(id))
      .query("DELETE FROM Employee_mst WHERE EmpId = @EmpId");

    await closeConnection(pool);

    return NextResponse.json({
      message: `Employee with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error executing delete query:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
