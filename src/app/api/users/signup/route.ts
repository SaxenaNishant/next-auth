import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendMail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User is already exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();

    const savedUser = JSON.parse(JSON.stringify(createdUser));

    // send verification email

    await sendMail({ emailType: "VERIFY", userId: savedUser._id, email });
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("Error---- ", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
