const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { User, Group } = require("../models/usermodel");
const uploadToDrive = require("../uploades/googledrive");
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const file = req.file;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let fileUrl = null;
    if (file) {
      fileUrl = await uploadToDrive({
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype,
      });
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      fileUrl,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const login = async (req, res) => {
  try {
    const { email, roll, password } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else if (roll) {
      user = await User.findOne({ roll });
    } else {
      return res.status(400).json({ message: "Please provide email or roll" });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email, // Added email to payload (optional)
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email, // ✅ Included email here
      studentId: user.role === 'student' ? user._id : null,
      teacherId: user.role === 'faculty' ? user._id : null,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const createGroup = async (req, res) => {
  try {
    const {
      program,
      title,
      category,
      supervisor,
      groupMembers,
    } = req.body;

    let parsedMembers;
    if (typeof groupMembers === "string") {
      parsedMembers = JSON.parse(groupMembers);
    } else {
      parsedMembers = groupMembers;
    }

    const proposalFile = req.files["proposalFile"]?.[0];
    const proposalUrl = await uploadToDrive(proposalFile);

    const membersWithFeeProof = [];

    for (let i = 0; i < parsedMembers.length; i++) {
      const feeFile = req.files[`groupMembers[${i}][feeProof]`]?.[0];
      const feeUrl = await uploadToDrive(feeFile);

      membersWithFeeProof.push({
        ...parsedMembers[i],
        feeProofPath: feeUrl,
      });
    }

    const newGroup = new Group({
      
      fypGroupName: title,
      program,
      fypTitle: title,
      fypCategory: category,
      supervisor,
      fypGroupMembers: membersWithFeeProof,
      proposalUrl,  // you might want to save this link as well
    });

    await newGroup.save();
    res.status(201).json({ message: "Group created", group: newGroup });

  } catch (err) {
    console.error("Group creation failed:", err);
    res.status(500).json({ error: "Group creation failed" });
  }
};

const updateMonthlyMarks = async (req, res) => {
  const { groupId } = req.params;
  const { marks } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });

    if (marks && typeof marks === "object") {
      group.marks = new Map();
      for (const [month, val] of Object.entries(marks)) {
        const numVal = Number(val);
        if (!isNaN(numVal)) {
          group.marks.set(month, numVal);
        }
      }
    }

    await group.save();
    res.json({ success: true, message: "Monthly marks updated", group });
  } catch (err) {
    console.error("Error updating monthly marks:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateInternalMarks = async (req, res) => {
  const { groupId } = req.params;
  const {
    designCodeMarks,
    demoRuntimeMarks,
    thesisMarks,
    attendance,
    designFeedback,
  } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    // Save individual fields
    group.designCodeMarks = Number(designCodeMarks) || 0;
    group.demoRuntimeMarks = Number(demoRuntimeMarks) || 0;
    group.thesisMarks = Number(thesisMarks) || 0;
    

    // Compute internal total
    group.internalMarks =
      group.designCodeMarks +
      group.demoRuntimeMarks +
      group.thesisMarks;

    // Attendance as Map
    if (attendance && typeof attendance === "object") {
      group.attendance = new Map(Object.entries(attendance));
    }

    // Optional feedback
    if (typeof designFeedback === "string") {
      group.designFeedback = designFeedback;
    }

    await group.save();

    res.json({
      success: true,
      message: "Internal marks updated successfully",
      group,
    });
  } catch (err) {
    console.error("Error updating internal marks:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

async function updateExternalMarks(req, res) {
  const { groupId } = req.params;
  const { externalAttendance ,externalThesisMarks ,externalDesignFeedback ,externalDesignCodeMarks ,
          externalDemoRuntimeMarks } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    // Save individual fields
    group.externalDesignCodeMarks = Number(externalDesignCodeMarks) || 0;
    group.externalDemoRuntimeMarks  = Number(externalDemoRuntimeMarks ) || 0;
    group.externalThesisMarks  = Number(externalThesisMarks ) || 0;
    

    // Compute external total
    group.externalMarks =
      group.externalDesignCodeMarks +
      group.externalDemoRuntimeMarks  +
      group.externalThesisMarks;

    // Attendance as Map
    if (externalAttendance  && typeof externalAttendance  === "object") {
      group.externalAttendance = new Map(Object.entries(externalAttendance ));
    }

    // Optional feedback
    if (typeof externalDesignFeedback === "string") {
      group.externalDesignFeedback = externalDesignFeedback;
    }

    await group.save();

    res.json({
      success: true,
      message: "External marks updated successfully",
      group,
    });
  } catch (err) {
    console.error("Error updating external marks:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}





const getGroupsBySupervisor = async (req, res) => {
  try {
    const supervisorName = decodeURIComponent(req.params.name); // handles encoded names like Dr.%20Ahmed

    const groups = await Group.find({ supervisor: supervisorName });

    if (!groups || groups.length === 0) {
      return res.status(404).json({ success: false, message: "No groups assigned to this supervisor." });
    }

    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups for supervisor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const getGroupDetailsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the group where fypGroupMembers array contains a member with this email
    const group = await Group.findOne({ "fypGroupMembers.email": email });

    if (!group) {
      return res.status(404).json({ message: "Group not found for this user" });
    }

    // Convert maps to plain objects before sending JSON
    const groupObj = group.toObject();
    groupObj.marks = Object.fromEntries(group.marks);
    groupObj.attendance = Object.fromEntries(group.attendance);

    res.json(groupObj);
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const uploadGroupFile = async (req, res) => {
  const { email, type } = req.params;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // Validate upload type
  const validTypes = ["thesis", "similarity", "code"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid upload type." });
  }

  try {
    // Upload file buffer to Google Drive
    const driveUrl = await uploadToDrive(req.file);

    // Prepare the update object depending on the type
    const updateField = {
      thesis: { thesisUrl: driveUrl },
      similarity: { similarityReportUrl: driveUrl },
      code: { projectCodeUrl: driveUrl },
    }[type];

    // Update the group document matching the user's email inside fypGroupMembers array
    const updatedGroup = await Group.findOneAndUpdate(
      { "fypGroupMembers.email": email },
      { $set: updateField },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Return success with Google Drive URL
    res.status(200).json({ message: "File uploaded and group updated.", url: driveUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed." });
  }
};


async function getGroupsForExternalExaminer(req, res) {
  const { name } = req.params;
  try {
    const groups = await Group.find({ externalExaminer: name });
    if (!groups.length) {
      return res.json({ success: false, message: "No groups found for this external examiner." });
    }
    res.json({ success: true, groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const updateGroupp = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Group.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Group not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////





async function sendGroupEmails(req, res) {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    const marksMap = group.marks instanceof Map
      ? group.marks
      : new Map(Object.entries(group.marks || {}));

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.verify();
      console.log("✅ SMTP connection verified");
    } catch (verifyErr) {
      console.error("❌ SMTP verification failed:", verifyErr);
      return res.status(500).json({
        success: false,
        message: "SMTP connection failed",
        error: verifyErr.message,
      });
    }

    const subject = `Marks Updated for Your FYP Group: ${group.fypGroupName}`;
    const months = ["November", "December", "January", "February", "March"];

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Marks Notification</h2>
        <p>Dear Student,</p>
        <p>The marks for your group <strong>${group.fypGroupName}</strong> have been updated.</p>

        <h3>📅 Monthly Evaluation</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th>Month</th>
              <th>Marks (out of 10)</th>
            </tr>
          </thead>
          <tbody>
            ${months.map(month => `
              <tr>
                <td>${month}</td>
                <td>${marksMap.get(month) ?? "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <h3>🏫 Internal Evaluation</h3>
        <p><strong>Internal Marks:</strong> ${group.internalMarks ?? "-"} / 50</p>

        <h3>🧑‍⚖️ External Evaluation</h3>
        <p><strong>External Examiner Marks:</strong> ${group.externalMarks ?? "-"} / 50</p>

        <h3>📝 Supervisor Feedback</h3>
        <p>${group.designFeedback || "N/A"}</p>

        <p style="margin-top: 20px;">For any concerns, please contact your supervisor.</p>
      </div>
    `;

    for (const member of group.fypGroupMembers) {
      try {
        await transporter.sendMail({
          from: `"FYP Coordinator" <${process.env.EMAIL_USER}>`,
          to: member.email,
          subject,
          html: htmlContent,
        });
        console.log(`📧 Email sent to ${member.email}`);
      } catch (err) {
        console.error(`❌ Failed to send to ${member.email}:`, err.message);
      }
    }

    res.status(200).json({ success: true, message: "Emails sent to all group members" });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send emails",
      error: error.message,
    });
  }
}
module.exports = {register,login,createGroup,uploadGroupFile,
  getGroupsBySupervisor,updateGroupp,getGroups,updateInternalMarks,updateMonthlyMarks,
  getGroupDetailsByEmail,updateExternalMarks,
  getGroupsForExternalExaminer,sendGroupEmails};
