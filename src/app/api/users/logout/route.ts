import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      expires: new Date(0),
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("Error --- ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
