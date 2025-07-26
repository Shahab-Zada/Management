import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

const TeacherGroups = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("Monthly");
  const [saving, setSaving] = useState(false);
  const supervisorName = localStorage.getItem("name");
  const months = ["November", "December", "February", "March","April"];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const [supervisorRes, externalRes] = await Promise.all([
          fetch(`http://localhost:8000/api/auth/supervisor/${supervisorName}`),
          fetch(`http://localhost:8000/api/auth/external-groups/${supervisorName}`),
        ]);
        const [supervisorData, externalData] = await Promise.all([
          supervisorRes.json(),
          externalRes.json(),
        ]);
        if (supervisorData.success || externalData.success) {
          const allGroups = [
            ...(supervisorData.groups || []),
            ...(externalData.groups || []),
          ];
          setGroups(allGroups);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (supervisorName) fetchGroups();
  }, [supervisorName]);

  const handleMarksChange = (month, value) => {
    setSelectedGroup(prev => ({
      ...prev,
      marks: { ...prev.marks, [month]: Number(value) }
    }));
  };

  const handleInternalMarksChange = (field, value) => {
    setSelectedGroup(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let url = "";
      let body = {};

      if (activeTab === "Monthly") {
        url = `http://localhost:8000/api/auth/${selectedGroup._id}/update-monthly-marks`;
        body = { marks: selectedGroup.marks || {} };
      } else if (activeTab === "Internal") {
        url = `http://localhost:8000/api/auth/${selectedGroup._id}/update-internal-marks`;
        body = {
          attendance: selectedGroup.attendance || {},
          thesisMarks: selectedGroup.thesisMarks || 0,
          designFeedback: selectedGroup.designFeedback || "",
          designCodeMarks: selectedGroup.designCodeMarks || 0,
          demoRuntimeMarks: selectedGroup.demoRuntimeMarks || 0,
        };
      } else if (activeTab === "External") {
        url = `http://localhost:8000/api/auth/external-marks/${selectedGroup._id}`;
        body = {
          externalAttendance: selectedGroup.externalAttendance || {},
          externalThesisMarks: selectedGroup.externalThesisMarks || 0,
          externalDesignFeedback: selectedGroup.externalDesignFeedback || "",
          externalDesignCodeMarks: selectedGroup.externalDesignCodeMarks || 0,
          externalDemoRuntimeMarks: selectedGroup.externalDemoRuntimeMarks || 0,
        };
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        await fetch(`http://localhost:8000/api/auth/send-group-emails/${selectedGroup._id}`, {
          method: "POST",
        });
        toast.success("Saved and email sent successfully!");
      } else {
        toast.error("Failed to save data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving.");
    }
    setSaving(false);
  };

  const filteredGroups = groups.filter(g =>
    activeTab === "External" ? g.externalExaminer === supervisorName : g.supervisor === supervisorName
  );

  return (
    <div className="container py-4 teacher-groups">
      <h2 className="text-center fw-bold mb-4 fade-in-top">
        Welcome back, {supervisorName || "Supervisor"}!
      </h2>

      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        {["Monthly", "Internal", "External"].map(tab => (
          <button
            key={tab}
            className={`btn px-4 py-2 rounded-pill fw-semibold shadow-sm ${
              activeTab === tab ? "btn-primary active-tab" : "btn-outline-primary"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSelectedGroup(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="fade-in">
        <select
          className="form-select mb-4 shadow-sm group-select"
          value={selectedGroup?.fypGroupName || ""}
          onChange={e => {
            const selected = filteredGroups.find(g => g.fypGroupName === e.target.value);
            if (selected) {
              setSelectedGroup({
                ...selected,
                marks: selected.marks || {},
                attendance: selected.attendance || {},
                thesisMarks: selected.thesisMarks || 0,
                designFeedback: selected.designFeedback || "",
                designCodeMarks: selected.designCodeMarks || 0,
                demoRuntimeMarks: selected.demoRuntimeMarks || 0,
                externalAttendance: selected.externalAttendance || {},
                externalThesisMarks: selected.externalThesisMarks || 0,
                externalDesignFeedback: selected.externalDesignFeedback || "",
                externalDesignCodeMarks: selected.externalDesignCodeMarks || 0,
                externalDemoRuntimeMarks: selected.externalDemoRuntimeMarks || 0,
              });
            }
          }}
        >
          <option value="">-- Select Group --</option>
          {filteredGroups.map(g => (
            <option key={g._id} value={g.fypGroupName}>
              {g.fypGroupName}
            </option>
          ))}
        </select>

        {selectedGroup && (
          <div className="card p-4 shadow fade-in">
            {activeTab === "Monthly" && (
              <>
                <h5 className="mb-3">📅 Monthly Evaluation</h5>
                <table className="table table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Month</th>
                      <th>Total</th>
                      <th>Obtained</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map(month => (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>10</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            className="form-control"
                            value={selectedGroup.marks?.[month] ?? ""}
                            onChange={e => handleMarksChange(month, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {(activeTab === "Internal" || activeTab === "External") && (
              <div>
                <h2 className="text-center mb-4 fw-bold">
                  {activeTab === "Internal" ? "🧪 Internal Evaluation" : "🌐 External Evaluation"}
                </h2>

                <div className="mb-4">
                  <h3 className="mb-2 text-start">📋 Attendance</h3>
                  {selectedGroup.fypGroupMembers?.map((student, index) => {
                    const name = student.name || student;
                    const attendanceField = activeTab === "Internal" ? "attendance" : "externalAttendance";
                    const isChecked = selectedGroup[attendanceField]?.[name];

                    return (
                      <div key={index} className="mb-3">
                        <label className="form-label fw-semibold d-block">{name}</label>
                        {["Present", "Absent"].map(status => (
                          <div key={status} className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`attendance-${activeTab}-${name}`}
                              id={`${status}-${name}`}
                              value={status}
                              checked={isChecked === status}
                              onChange={e =>
                                setSelectedGroup(prev => ({
                                  ...prev,
                                  [attendanceField]: {
                                    ...prev[attendanceField],
                                    [name]: e.target.value,
                                  },
                                }))
                              }
                            />
                            <label className="form-check-label" htmlFor={`${status}-${name}`}>
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {[
                  {
                    label: "📐 Project Design and Implementation",
                       description:(
  <><p>This section focuses on evaluating the design and architecture of the group project.</p>
        <p>Please assess the overall structure, modularity, and adherence to software engineering best practices.</p>
        <p><strong>Key areas to consider include:</strong></p>
        <ul>
          <li>Use of architectural patterns (e.g., MVC)</li>
          <li>Code organization and modularity</li>
          <li>Clarity in class responsibilities</li>
          <li>Application of object-oriented principles</li>
          <li>Interface design and documentation quality</li>
        </ul>
        <p><strong>Strengths:</strong></p>
        <ul>
          <li>Effective use of object-oriented programming (OOP) concepts</li>
          <li>Clear subsystem decomposition using MVC architecture</li>
          <li>Well-structured and readable codebase</li>
          <li>Helpful and consistent code documentation</li>
        </ul>
        <p><strong>Weaknesses:</strong></p>
        <ul>
          <li>Responsibilities between classes are not clearly separated</li>
          <li>Code repetition due to design inefficiencies</li>
          <li>Poorly designed class interfaces that may lead to misuse</li>
          <li>Inadequate or unclear code comments</li>
        </ul>
        <p><strong>Please assign a mark that reflects the overall quality of the project’s design and implementation.</strong></p>
      </>
                       ),

                    field: activeTab === "Internal" ? "designCodeMarks" : "externalDesignCodeMarks",
                    marks: [20, 16, 12, 10, 7],
                  },
                  {
                    label: "🚀 Project Demo and Runtime",
                  
                     description: (
    <>
      <p>
        In this part of the evaluation, review and evaluate the project in a demo environment where students
        will interact with it.
      </p>

      <p><strong>Strengths:</strong></p>
      <ul>
        <li>The code executes without compile or run-time errors.</li>
        <li>Exception handling: effectively handles runtime errors.</li>
        <li>Data validation: ensures the integrity and accuracy of input data.</li>
        <li>The software demonstrates efficient performance and responsiveness.</li>
      </ul>

      <p><strong>Weaknesses:</strong></p>
      <ul>
        <li>Inconsistent user interface and user experience.</li>
        <li>Slower response times, and potential stability issues.</li>
        <li>Compile-time or run-time errors.</li>
      </ul>

      <p><strong>Please assign marks that reflect the quality of the project live demo.</strong></p>
    </>),
                    
                    field: activeTab === "Internal" ? "demoRuntimeMarks" : "externalDemoRuntimeMarks",
                    marks: [20, 15, 10, 5, 0],
                  },
                 {
  label: "📄 Project Thesis and Originality",
description: (
  <>
    <p>
      In this part of the evaluation, review the project thesis and the similarity report. Links are
      provided below:
    </p>
    <p>
      {selectedGroup.thesisUrl ? (
        <>
          <a href={selectedGroup.thesisUrl} target="_blank" rel="noopener noreferrer">
            Click here
          </a>{" "}
          to open the thesis file of the group
          <br />
        </>
      ) : (
        <span className="text-muted">Thesis not submitted<br /></span>
      )}
      {selectedGroup.similarityReportUrl ? (
        <>
          <a href={selectedGroup.similarityReportUrl} target="_blank" rel="noopener noreferrer">
            Click here
          </a>{" "}
          to open the similarity report file of the group
        </>
      ) : (
        <span className="text-muted">Similarity report not submitted</span>
      )}
    </p>

    <p><strong>Main points of assessment:</strong></p>
    <ol>
      <li>Review the project thesis to assess its clarity, organization, structure, and coherence</li>
      <li>Ensure that the thesis adheres to the guidelines</li>
      <li>Assess the similarity report and check the extent of originality</li>
    </ol>

    <p><strong>Please assign marks that reflect the quality of the thesis writing and its originality.</strong></p>
  </>
),



  field: activeTab === "Internal" ? "thesisMarks" : "externalThesisMarks",
  marks: [10, 7, 5, 3, 0],
}
,
                ].map(({ label, description, field, marks }) => (
                  <div className="mb-4" key={field}>
                    <h3 className="mb-2 text-start">{label}</h3>
                    <p className="text-start">{description}</p>
                    <select
                      className="form-select"
                      value={selectedGroup[field] ?? ""}
                      onChange={e => handleInternalMarksChange(field, Number(e.target.value))}
                    >
                      {marks.map(m => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <label className="fw-semibold text-start d-block">Feedback</label>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Write feedback here..."
                  value={
                    activeTab === "Internal"
                      ? selectedGroup.designFeedback
                      : selectedGroup.externalDesignFeedback
                  }
                  onChange={e =>
                    handleInternalMarksChange(
                      activeTab === "Internal"
                        ? "designFeedback"
                        : "externalDesignFeedback",
                      e.target.value
                    )
                  }
                />
              </div>
            )}

            <button
              className="btn btn-success w-100 mt-3 d-flex justify-content-center align-items-center"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Saving...
                </>
              ) : (
                "💾 Save & Send Email"
              )}
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-in; }
        .fade-in-top { animation: fadeInTop 0.6s ease-in; }
        .active-tab { transform: scale(1.05); transition: all 0.3s ease; }
        .group-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInTop {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TeacherGroups;
