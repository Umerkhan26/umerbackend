const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (to, subject, templatePath, templateData) => {
  try {
    // Resolve the absolute path to the template file
    const templateFilePath = path.resolve(__dirname, templatePath);

    // Debug log for the resolved template path
    console.log("Resolved Template Path:", templateFilePath);

    // Check if the template file exists
    if (!fs.existsSync(templateFilePath)) {
      throw new Error(`Template file not found at ${templateFilePath}`);
    }

    // Read the HTML template
    const emailTemplate = fs.readFileSync(templateFilePath, "utf8");

    // Replace placeholders with actual data
    const emailBody = emailTemplate.replace(
      /{{\s*(\w+)\s*}}/g,
      (_, key) => templateData[key] || ""
    );

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to, // Receiver address
      subject: subject, // Subject of the email
      html: emailBody, // Email content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

module.exports = sendEmail;
// m
