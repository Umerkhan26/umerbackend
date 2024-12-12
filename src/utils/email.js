// const nodemailer = require('nodemailer');
// const path = require('path');
// const fs = require('fs');
// const ejs = require('ejs');

// const sendEmail = async (to, subject, templatePath, templateData) => {
//   // Check if the environment variables are set
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     throw new Error('Email configuration is not set.');
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     // Read the HTML template file
//     const templateFilePath = path.join(__dirname, templatePath);
//     const template = await fs.promises.readFile(templateFilePath, 'utf-8');

//     // Render the template with EJS
//     const emailBody = ejs.render(template, { otp: templateData.otp });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html: emailBody, // Send rendered HTML content
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to} successfully.`);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Failed to send email. Please try again later.');
//   }
// };

// module.exports = sendEmail;

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
