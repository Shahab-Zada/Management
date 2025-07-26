const mongoose=require("mongoose");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true,
  },

  fileUrl: {
    type: String,
    default: null, 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  roll: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  feeProofPath: { type: String, required: true, trim: true },
});

const groupSchema = new mongoose.Schema(
  {
    fypGroupName: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    fypTitle: { type: String, required: true, trim: true },
    fypCategory: { type: String, required: true, trim: true },
    supervisor: { type: String, required: true, trim: true },
    externalExaminer: { type: String, default: "pending", trim: true },
    fypGroupMembers: [memberSchema],

    marks: { type: Map, of: Number, default: () => new Map() },
    internalMarks: { type: Number,default :0 },
    attendance: { type: Map, of: String, default: () => new Map() },
    designFeedback: { type: String, default: "" },
thesisMarks: { type: Number, default: 0 },
designCodeMarks: { type: Number, default: 0 },
demoRuntimeMarks: { type: Number, default: 0 },
    

    // ✅ Add this line for external marks

externalMarks: { type: Number, default: 0 },
  externalAttendance: { type: Map, of: String, default: () => new Map() },
  externalDesignFeedback: { type: String, default: "" },
  externalThesisMarks: { type: Number, default: 0 },
  externalDesignCodeMarks: { type: Number, default: 0 },
  externalDemoRuntimeMarks: { type: Number, default: 0 },
    
  

    proposalUrl: { type: String, default: "" },
    thesisUrl: { type: String, default: "" },
    similarityReportUrl: { type: String, default: "" },
    projectCodeUrl: { type: String, default: "" },
  },
  { timestamps: true }
);


const Group=mongoose.model("Group", groupSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, Group};