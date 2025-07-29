import React, { useEffect, useState } from "react";
import ThesisUpload from "./ThesisUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserGraduate, FaFileAlt, FaClipboardList, FaUsers } from "react-icons/fa";

export default function Marks() {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("No email found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://management-production-4dab.up.railway.app/api/auth/group/${email}`);
        const data = await response.json();

        if (response.ok) {
          setGroup(data);
          setError("");
        } else {
          setError(data.message || "Failed to fetch group details");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
      setLoading(false);
    };

    fetchGroupDetails();
  }, []);

  if (loading) return <p className="text-center mt-5 fs-5">Loading group details...</p>;
  if (error) return <p className="text-danger text-center mt-5 fs-5">{error}</p>;
  if (!group) return <p className="text-center mt-5 fs-5">No group details available.</p>;

  const marksEntries = group.marks ? Object.entries(group.marks) : [];
  const combinedMarks = [
    ...marksEntries.map(([month, mark]) => [month, mark]),
    ["Internal Marks", group.internalMarks ?? 0],["External Marks", group.externalMarks ?? 0]
  ];

  return (
    <div className="container my-5" style={{ maxWidth: "1140px" }}>
      <div className="card shadow-lg rounded-4 p-5 bg-white">
        <h2 className="text-center text-primary fw-bold mb-4">
          <FaClipboardList className="me-2" />
          Group Marks Details
        </h2>

        {/* Group Details */}
        <div className="table-responsive mb-5">
          <table className="table table-bordered shadow-sm bg-light rounded-4">
            <tbody className="fs-6">
              <tr><th className="bg-light">Group Name</th><td>{group.fypGroupName}</td></tr>
              <tr><th className="bg-light">Program</th><td>{group.program}</td></tr>
              <tr><th className="bg-light">Project Title</th><td>{group.fypTitle}</td></tr>
              <tr><th className="bg-light">Category</th><td>{group.fypCategory}</td></tr>
              <tr><th className="bg-light">Supervisor</th><td>{group.supervisor}</td></tr>
              <tr><th className="bg-light">External Examiner</th><td>{group.externalExaminer || "Pending"}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Members */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaUsers className="me-2" />Group Members
        </h4>
        <div className="row g-4 mb-5">
          {group.fypGroupMembers?.map((member, index) => (
            <div className="col-md-6" key={member.email || index}>
              <div className="card border-0 shadow-sm rounded-4 h-100 bg-light">
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">
                    <FaUserGraduate className="me-2" />
                    {member.name}
                  </h5>
                  <p className="mb-1"><strong>Roll:</strong> {member.roll}</p>
                  <p className="mb-1"><strong>Email:</strong> {member.email}</p>
                  <p className="mb-0"><strong>Phone:</strong> {member.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marks */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaClipboardList className="me-2" />Assessment Marks
        </h4>
        {combinedMarks.length > 0 ? (
          <div className="table-responsive mb-5">
            <table className="table table-bordered shadow-sm rounded-4 text-center bg-light">
              <thead className="table-primary">
                <tr>
                  <th>Assessment</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {combinedMarks.map(([label, score]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td className="fw-bold">{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mb-5">No marks available.</p>
        )}

        {/* Feedback */}
        <h4 className="text-primary fw-semibold mb-3">Evaluator Feedback</h4>
        <p className="fs-5 fst-italic text-dark border-start border-4 ps-3 border-primary">
          {group.designFeedback || "No feedback yet."}
        </p>

        {/* Proposal Document */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaFileAlt className="me-2" />Proposal Document
        </h4>
        {group.proposalUrl ? (
          <a
            href={group.proposalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-lg px-2 py-3 "
          >
            View Proposal
          </a>
        ) : (
          <p className="text-muted fs-5">No proposal document uploaded.</p>
        )}




         {/* Thesis Document */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaFileAlt className="me-2" />Thesis Document
        </h4>
        {group.thesisUrl ? (
          <a
            href={group.thesisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg px-2 py-3 "
          >
            View Thesis
          </a>
        ) : (
          <p className="text-muted fs-5">No Thesis document uploaded.</p>
        )}




        {/* Similarity Report Document */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaFileAlt className="me-2" />Similarity Report Document
        </h4>
        {group.similarityReportUrl ? (
          <a
            href={group.similarityReportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg px-2 py-3 "
          >
            View Similarity Report
          </a>
        ) : (
          <p className="text-muted fs-5">No Similarity Report document uploaded.</p>
        )}





      {/* project Code Document */}
        <h4 className="text-primary fw-semibold mb-3">
          <FaFileAlt className="me-2" />Project Code Document
        </h4>
        {group.projectCodeUrl ? (
         <a
  href={group.projectCodeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-lg px-2 py-3 "
>
  View Project Code
</a>

        ) : (
          <p className="text-muted fs-5">No Project Code document uploaded.</p>
        )}



        
      </div>


      

      {/* Thesis Upload */}
      <div className="mt-5">
        <ThesisUpload />
      </div>
    </div>
  );
}
