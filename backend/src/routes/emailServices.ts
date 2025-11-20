import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamsinghlkr20@gmail.com",     // YOUR GMAIL
        pass: "fqyy pget vzet iyet",           // APP PASSWORD
      },
    });

    // const verificationUrl = `http://localhost:5000/verify-email?token=${token}`;
    // const verificationUrl = `https://abcd1234.ngrok.io/verify-email?token=${token}`;
    const verificationUrl = `https://informational-paxton-unliquidated.ngrok-free.dev/verify-email?token=${token}`;

    const mailOptions = {
      from: '"SarkariPrep" <shivamsinghlkr20@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Verify Your Email</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationUrl}" 
           style="padding:10px 20px;background:#4caf50;color:#fff;border-radius:5px;text-decoration:none;">
          Verify Email
        </a>
        <p>This link expires in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);

  } catch (error) {
    console.error("Email sending error:", error);
  }
};
