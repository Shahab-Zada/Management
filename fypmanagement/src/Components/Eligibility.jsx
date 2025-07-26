import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  "Are all members of your group enrolled in the same class?",
  "Does your group consist of more than three members?",
  "Has your group completed the Final Year Project proposal?",
  "Can every member of your group present Fee proof from LMS?",
];

const Eligibility = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    program: "",
    title: "",
    category: "",
    supervisor: "",
    proposalFile: null,
    groupMembers: [
      { name: "", roll: "", email: "", phone: "", feeProof: null },
    ],
  });

  const resetAssessment = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setMessage("");
    setShowForm(false);
    setFormData({
      program: "",
      title: "",
      category: "",
      supervisor: "",
      proposalFile: null,
      groupMembers: [
        { name: "", roll: "", email: "", phone: "", feeProof: null },
      ],
    });
  };

  const handleAnswer = (value) => {
    const updatedAnswers = [...answers, value];

    if (
      (currentQuestion === 1 && value === "Yes") ||
      (currentQuestion === 2 && value === "Yes") ||
      (currentQuestion === 3 && value === "No")
    ) {
      setMessage("❌ Your answer violated the eligibility criteria. Restarting...");
      setTimeout(() => resetAssessment(), 2000);
      return;
    }

    setAnswers(updatedAnswers);

    if (currentQuestion === 3) {
      setShowForm(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, proposalFile: e.target.files[0] }));
  };

  const handleMemberFieldChange = (index, field, value) => {
    const updated = [...formData.groupMembers];
    updated[index][field] = value;
    setFormData({ ...formData, groupMembers: updated });
  };

  const handleMemberFileChange = (index, file) => {
    const updated = [...formData.groupMembers];
    updated[index].feeProof = file;
    setFormData({ ...formData, groupMembers: updated });
  };

  const addGroupMember = () => {
    setFormData((prev) => ({
      ...prev,
      groupMembers: [
        ...prev.groupMembers,
        { name: "", roll: "", email: "", phone: "", feeProof: null },
      ],
    }));
  };

  const removeGroupMember = (index) => {
    const updated = [...formData.groupMembers];
    updated.splice(index, 1);
    setFormData({ ...formData, groupMembers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("program", formData.program);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("supervisor", formData.supervisor);
    formDataToSend.append("proposalFile", formData.proposalFile);

    // Append group members info and files
    formData.groupMembers.forEach((member, index) => {
      formDataToSend.append(`groupMembers[${index}][name]`, member.name);
      formDataToSend.append(`groupMembers[${index}][roll]`, member.roll);
      formDataToSend.append(`groupMembers[${index}][email]`, member.email);
      formDataToSend.append(`groupMembers[${index}][phone]`, member.phone);
      formDataToSend.append(`groupMembers[${index}][feeProof]`, member.feeProof);
    });

    try {
      const response = await fetch("http://localhost:8000/api/auth/creategroup", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("🎉 Group Created Successfully!");
        resetAssessment();
      } else {
        toast.error("❌ Failed to submit group. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("🚫 Something went wrong! Please check your connection.");
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-center mb-4 fw-bold text-dark" style={{ fontSize: "2rem" }}>
        Student Eligibility Assessment
      </h2>

      {!showForm ? (
        <div className="d-flex justify-content-center">
          <div className="card shadow p-5 rounded-4 text-center" style={{ maxWidth: "600px", width: "100%" }}>
            <h4 className="mb-4 text-dark fw-semibold">{questions[currentQuestion]}</h4>
            <div className="d-flex justify-content-center gap-4">
              <button className="btn btn-success btn-lg px-4" onClick={() => handleAnswer("Yes")}>Yes</button>
              <button className="btn btn-danger btn-lg px-4" onClick={() => handleAnswer("No")}>No</button>
            </div>
            <p className="mt-3 text-secondary">Question {currentQuestion + 1} of {questions.length}</p>
            {message && (
              <div className="alert alert-warning mt-3 fw-medium" role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow p-5 rounded-4 mx-auto" style={{ maxWidth: "900px" }}>
          <h3 className="mb-4 text-primary fw-bold">FYP Details</h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select your BS program *</label>
            <select name="program" className="form-select" value={formData.program} onChange={handleInputChange} required>
              <option value="">-- Select Program --</option>
              <option value="BSCS">BSCS</option>
              <option value="BSSE">BSSE</option>
              <option value="BSIT">BSIT</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Enter your project title *</label>
            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
            <small className="">Title can later be changed by your Supervisor.</small>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select your FYP category *</label>
            <select name="category" className="form-select" value={formData.category} onChange={handleInputChange} required>
              <option value="">-- Select Category --</option>
              <option value="Research">Research</option>
              <option value="Development">Development</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select your desired supervisor *</label>
            <select name="supervisor" className="form-select" value={formData.supervisor} onChange={handleInputChange} required>
              <option value="">-- Select Supervisor --</option>
              <option value="Dr. Ahmed">Dr. Ahmed</option>
              <option value="Dr. Asim">Dr. Asim</option>
              <option value="Dr. Fatima">Dr. Fatima</option>
              <option value="Ms. Sara">Ms. Sara</option>
              <option value="Mr. Zain">Mr. Zain</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Upload your FYP proposal file *</label>
            <input type="file" accept=".pdf,.doc,.docx" className="form-control" onChange={handleFileChange} required />
          </div>

          <h3 className="mb-3 text-primary fw-bold">FYP Group Members</h3>

          {formData.groupMembers.map((member, index) => (
            <div key={index} className="border rounded-3 p-4 mb-4 bg-light position-relative">
              <h5 className="text-dark fw-semibold">Member {index + 1}</h5>
              {index !== 0 && (
                <button type="button" onClick={() => removeGroupMember(index)} className="btn-close position-absolute top-0 end-0 m-2"></button>
              )}

              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-control" value={member.name}
                  onChange={(e) => handleMemberFieldChange(index, "name", e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Roll Number *</label>
                <input type="text" className="form-control" value={member.roll}
                  onChange={(e) => handleMemberFieldChange(index, "roll", e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-control" value={member.email}
                  onChange={(e) => handleMemberFieldChange(index, "email", e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number *</label>
                <input type="tel" className="form-control" placeholder="+92 3XXXXXXXXX" value={member.phone}
                  pattern="^(\+92)?3[0-9]{9}$"
                  onChange={(e) => handleMemberFieldChange(index, "phone", e.target.value)} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Upload Fee Proof (PDF only) *</label>
                <input type="file" accept=".pdf" className="form-control"
                  onChange={(e) => handleMemberFileChange(index, e.target.files[0])} required />
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-outline-primary mb-4" onClick={addGroupMember}>
            ➕ Add Another Member
          </button>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
             Submit Group Details
          </button>
        </form>
      )}
    </div>
  );
};

export default Eligibility;
