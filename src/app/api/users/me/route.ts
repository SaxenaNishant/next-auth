import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  // extract data from the token

  const userId = getDataFromToken(request);
  console.log("userId", userId);

  const user: any = await User.findOne({ _id: userId }).select("-password");
  console.log("user", user);

  if (!user) {
    return NextResponse.json({ error: "User is not found" }, { status: 400 });
  }
  return NextResponse.json(
    { message: "User is found successfully", data: user },
    { status: 200 }
  );
}
