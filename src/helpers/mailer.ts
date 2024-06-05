import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface MailParams {
  emailType: String;
  userId: String;
  email: String;
}

const sendMail = async ({ emailType, userId, email }: MailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        { email },
        {
          $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER_ID,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const mailOptions: any = {
      from: "saxena.bnishant@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Hello world?",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifytoken?token=${hashedToken}" > here </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your email"
      } or copy and paste the link below in your browser.
       <br> ${process.env.DOMAIN}/verifytoken?token=${hashedToken}
       </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    console.log("ERRRRRRORRRRR---------");
    throw new Error(error?.message);
  }
};

export default sendMail;
