import nodemailer from "nodemailer";

//  SEND VERIFICATION EMAIL

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamsinghlkr20@gmail.com",
        pass: "fqyy pget vzet iyet",
      },
    });

    const verificationUrl = `https://jasper-unaffixed-denisha.ngrok-free.dev/verify-email?token=${token}`;

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
    console.log("✅ Verification email sent to:", email);
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
};

// SEND RESET PASSWORD EMAIL

export const sendResetPasswordEmail = async (
  email: string,
  resetLink: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamsinghlkr20@gmail.com",
        pass: "fqyy pget vzet iyet",
      },
    });

    const mailOptions = {
      from: '"SarkariPrep" <shivamsinghlkr20@gmail.com>',
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}"
           style="padding:10px 20px;background:#1976D2;color:#fff;border-radius:5px;text-decoration:none;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("🔗 Reset password email sent:", email);
  } catch (error) {
    console.error("❌ Reset Email sending Error:", error);
  }
};

// ✅ SEND ADMIN VERIFICATION EMAIL
export const sendAdminVerificationEmail = async (
  email: string,
  token: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamsinghlkr20@gmail.com",
        pass: "fqyy pget vzet iyet",
      },
    });

    const verificationUrl = `https://jasper-unaffixed-denisha.ngrok-free.dev/admin/verify-email?token=${token}`;

    const mailOptions = {
      from: '"SarkariPrep Admin" <shivamsinghlkr20@gmail.com>',
      to: email,
      subject: "Verify Your Admin Email",
      html: `
        <h2>Admin Email Verification</h2>
        <p>Click below to verify your admin account:</p>
        <a href="${verificationUrl}" 
           style="padding:10px 20px;background:#e11d48;color:#fff;border-radius:5px;text-decoration:none;">
          Verify Admin Email
        </a>
        <p>This link expires in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Admin verification email sent to:", email);
  } catch (error) {
    console.error("❌ Admin email sending error:", error);
  }
};

// ✅ SEND ADMIN RESET PASSWORD EMAIL
export const sendAdminResetPasswordEmail = async (
  email: string,
  resetLink: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamsinghlkr20@gmail.com",
        pass: "fqyy pget vzet iyet",
      },
    });

    const mailOptions = {
      from: '"SarkariPrep Admin" <shivamsinghlkr20@gmail.com>',
      to: email,
      subject: "Reset Your Admin Password",
      html: `
        <h2>Admin Password Reset</h2>
        <p>Click below to reset your admin password:</p>
        <a href="${resetLink}"
           style="padding:10px 20px;background:#dc2626;color:#fff;border-radius:5px;text-decoration:none;">
          Reset Admin Password
        </a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("🔐 Admin reset password email sent:", email);
  } catch (error) {
    console.error("❌ Admin Reset Email sending Error:", error);
  }
};

