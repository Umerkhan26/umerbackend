const Contact = require("../models/contactModel");
const sendEmail = require("../utils/email");
const path = require("path");

// Create a new Contact message
// const createContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Validate required fields
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Create a new contact message
//     const contact = new Contact({ name, email, subject, message });

//     await contact.save();
//     res.status(201).json({ message: 'Your message has been sent successfully', contact });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Validate required fields
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the admin email is set in the environment variables
//     const adminEmail = process.env.ADMIN_EMAIL;
//     if (!adminEmail) {
//       return res.status(500).json({
//         message:
//           "Admin email is not configured. Please check your environment variables.",
//       });
//     }

//     // Create a new contact message
//     const contact = new Contact({ name, email, subject, message });

//     // Save the contact message in the database
//     await contact.save();

//     // Define the path to your email template
//     const templatePath = path.resolve(
//       __dirname,
//       "../views/VerifyTemplete.html"
//     );

//     // Prepare the data for the email template
//     const emailData = {
//       name,
//       email,
//       subject,
//       message,
//     };

//     // Send the email to the admin
//     await sendEmail(
//       adminEmail,
//       "New Contact Form Submission",
//       templatePath,
//       emailData
//     );

//     res
//       .status(201)
//       .json({ message: "Your message has been sent successfully", contact });
//   } catch (error) {
//     console.error("Error creating contact:", error);
//     res.status(500).json({
//       message:
//         "An error occurred while processing your request. Please try again later.",
//     });
//   }
// };

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the admin email is set in the environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return res.status(500).json({
        message:
          "Admin email is not configured. Please check your environment variables.",
      });
    }

    // Create a new contact message
    const contact = new Contact({ name, email, subject, message });

    // Save the contact message in the database
    await contact.save();

    // Define the path to your email template
    const templatePath = path.resolve(
      __dirname,
      "../views/VerifyTemplete.html"
    );

    // Prepare the data for the email template
    const emailData = { name, email, subject, message };

    // Send email to admin
    await sendEmail(
      adminEmail,
      "New Contact Form Submission",
      templatePath,
      emailData
    );

    // Send email to the user (they will receive a confirmation email)
    const userTemplatePath = path.resolve(
      __dirname,
      "../views/UserConfirmationTemplate.html"
    );
    await sendEmail(
      email, // User's email
      "Thank you for contacting us",
      userTemplatePath, // Template for user
      emailData
    );

    res
      .status(201)
      .json({ message: "Your message has been sent successfully", contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

// Get all Contact messages (Optional, for admin use)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
