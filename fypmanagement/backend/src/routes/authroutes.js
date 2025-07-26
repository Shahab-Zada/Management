const express = require("express");
const router = express.Router();

const { uploadSingleCV, googleDriveUpload,uploadFileMulter } = require("../midlleware/upload");  // fixed path
const { register, login, createGroup,updateInternalMarks,updateMonthlyMarks,
  getGroupDetailsByEmail,getGroups,updateGroupp,
  uploadGroupFile,getGroupsForExternalExaminer,
  updateExternalMarks,sendGroupEmails} = require("../controllers/authcontroller");
const { getGroupsBySupervisor } = require("../controllers/authcontroller");
const verifyToken = require("../midlleware/authmidllleware");

router.get("/supervisor/:name", getGroupsBySupervisor);


router.post("/register", uploadSingleCV, register);


router.post("/login", login);

router.get("/group/:email", getGroupDetailsByEmail);
router.post("/creategroup",googleDriveUpload,createGroup);
// Upload thesis / similarity report / code file by email and type
router.post(
  "/upload/:type/:email",
  uploadFileMulter,
  uploadGroupFile
);


router.get("/external-groups/:name", getGroupsForExternalExaminer);

// 2. Update external marks for a group



router.post("/send-group-emails/:groupId", sendGroupEmails);
router.get('/getgroup', verifyToken, getGroups);
router.put("/:groupId/update-monthly-marks", updateMonthlyMarks);
router.put("/:groupId/update-internal-marks", updateInternalMarks);
router.put("/external-marks/:groupId", updateExternalMarks);
// PUT update group by ID
router.put('/update/:id', verifyToken, updateGroupp);
module.exports = router;

