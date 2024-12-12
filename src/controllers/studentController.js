const Student = require("../models/studentModel");
const User = require("../models/userModel");

const createStudentWithUser = async (req, res) => {
  try {
    const {
      studentName,
      registrationNumber,
      class: studentClass,
      section,
      email,
      gender,
    } = req.body;
    const userId = req.userId; // Get the userId from the request object, set by the middleware

    // Validate if the userId exists in the User collection
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
    }

    // Check for unique email and registration number in Student schema
    const isUnique = await Student.checkUniqueEmailAndRegNumber(
      email,
      registrationNumber
    );
    if (!isUnique) {
      return res
        .status(400)
        .json({ message: "Email or Registration Number already exists" });
    }

    // Create the student with or without a user reference
    const student = new Student({
      studentName,
      registrationNumber,
      class: studentClass,
      section,
      email,
      gender,
      user: userId || null, // Link to the user if provided
    });

    await student.save();
    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Fetch all students and populate the user field if it exists
    const students = await Student.find().populate("user", "name email role");
    res
      .status(200)
      .json({ message: "Students fetched successfully", students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const updateStudentProfile = async (req, res) => {
//   try {
//     const { studentName, registrationNumber, class: studentClass, section, email, gender } = req.body;
//     const userId = req.userId; // Get userId from the request object, set by the middleware

//     // Validate if the logged-in user is a student
//     const student = await Student.findOne({ user: userId });  // Find student based on userId
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Only allow updates on the student profile associated with the logged-in user
//     if (student.user.toString() !== userId) {
//       return res.status(403).json({ message: 'You are not authorized to update this profile' });
//     }

//     // Check if the email or registration number is being changed and validate uniqueness
//     if (email && email !== student.email) {
//       const isEmailUnique = await Student.checkUniqueEmailAndRegNumber(email, registrationNumber);
//       if (!isEmailUnique) {
//         return res.status(400).json({ message: 'Email or Registration Number already exists' });
//       }
//     }

//     // Update the student fields (you can update only the provided fields)
//     student.studentName = studentName || student.studentName;
//     student.registrationNumber = registrationNumber || student.registrationNumber;
//     student.class = studentClass || student.class;
//     student.section = section || student.section;
//     student.email = email || student.email;
//     student.gender = gender || student.gender;

//     // Save the updated student profile
//     await student.save();

//     res.status(200).json({ message: 'Student profile updated successfully', student });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateStudentProfile = async (req, res) => {
  try {
    const {
      studentName,
      registrationNumber,
      class: studentClass,
      section,
      email,
      gender,
    } = req.body;
    const userId = req.userId; // Get userId from the request object, set by the middleware

    // Validate if the logged-in user is a student
    const student = await Student.findOne({ user: userId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the email or registration number is being changed and validate uniqueness
    if (email && email !== student.email) {
      const isEmailUnique = await Student.checkUniqueEmailAndRegNumber(
        email,
        registrationNumber
      );
      if (!isEmailUnique) {
        return res
          .status(400)
          .json({ message: "Email or Registration Number already exists" });
      }
    }

    // Update only the provided fields
    student.studentName = studentName || student.studentName;
    student.registrationNumber =
      registrationNumber || student.registrationNumber;
    student.class = studentClass || student.class;
    student.section = section || student.section;
    student.email = email || student.email;
    student.gender = gender || student.gender;

    // Save the updated student profile
    await student.save();

    // Send the updated student profile
    const updatedStudent = await Student.findById(student._id);
    res.status(200).json({
      message: "Student profile updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student profile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getStudentProfile = async (req, res) => {
//   try {
//     const userId = req.userId; // Get the logged-in user's ID from the middleware

//     // Find the student associated with this user
//     const student = await Student.findOne({ user: userId }).populate(
//       "user",
//       "name email role"
//     );

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json({
//       message: "Student profile fetched successfully",
//       student,
//     });
//   } catch (error) {
//     console.error("Error fetching student profile:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports = {
  createStudentWithUser,
  getAllStudents,
  updateStudentProfile,
};
