// const nodemailer = require("nodemailer");
// const fs = require("fs");
// const path = require("path");

// const sendVerificationEmail = async (email, token) => {
//   try {
//     // Resolve the absolute path to the template file
//     const templatePath = path.resolve(
//       __dirname,
//       "../views/verifyEmail.templete.html"
//     );

//     // Read the HTML template from the file system
//     const template = fs.readFileSync(templatePath, "utf-8");

//     // Generate the verification link with the provided token
//     const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${token}`;

//     // Replace the placeholder in the template with the actual verification link
//     const htmlContent = template.replace(
//       "{{verificationLink}}",
//       verificationLink
//     );

//     // Set up nodemailer transporter for sending emails via Gmail
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // Gmail SMTP service
//       auth: {
//         user: process.env.EMAIL_USER, // Your Gmail email address
//         pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
//       },
//     });

//     // Set up the email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Sender email address
//       to: email, // Recipient email address
//       subject: "Email Verification", // Subject of the email
//       html: htmlContent, // Email content (HTML format)
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);

//     // Log the successful email send response
//     console.log("Verification email sent: ", info.response);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     // Use a custom ErrorHandler for more informative error responses
//     throw new ErrorHandler(500, "Failed to send verification email");
//   }
// };
// module.exports = sendVerificationEmail;

const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Use async promises-based API
const path = require("path");

const sendVerificationEmail = async (
  email,
  token,
  userName,
  userEmail,
  userRole
) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "../views/verifyEmail.template.html"
    );

    // Async reading of the template
    const template = await fs.readFile(templatePath, "utf-8");

    const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${token}`;
    const approvalLink = `${process.env.FRONT_END_URL}/review-application?email=${userEmail}`;

    const htmlContent = template
      .replace("{{userName}}", userName)
      .replace("{{userEmail}}", userEmail)
      .replace("{{userRole}}", userRole)
      .replace("{{approvalLink}}", approvalLink);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Registration Pending Approval",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

module.exports = sendVerificationEmail;
