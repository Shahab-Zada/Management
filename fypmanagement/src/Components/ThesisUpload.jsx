import React, { useState } from "react";
import { FaFilePdf, FaFileCode, FaFileSignature } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ThesisUpload() {
  const [thesis, setThesis] = useState(null);
  const [similarityReport, setSimilarityReport] = useState(null);
  const [projectCode, setProjectCode] = useState(null);

  const [loadingThesis, setLoadingThesis] = useState(false);
  const [loadingSimilarity, setLoadingSimilarity] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);

  const email = localStorage.getItem("email");

  const handleUpload = async (file, type) => {
    if (!file || !email) {
      toast.info("Missing file or user email.");
      return;
    }

    if (type === "thesis") setLoadingThesis(true);
    if (type === "similarity") setLoadingSimilarity(true);
    if (type === "code") setLoadingCode(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`https://management-production-4dab.up.railway.app/api/auth/upload/${type}/${email}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`${type.toUpperCase()} uploaded successfully.`);
        if (type === "thesis") setThesis(null);
        if (type === "similarity") setSimilarityReport(null);
        if (type === "code") setProjectCode(null);
      } else {
        toast.error(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during upload.");
    } finally {
      if (type === "thesis") setLoadingThesis(false);
      if (type === "similarity") setLoadingSimilarity(false);
      if (type === "code") setLoadingCode(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-5 fw-bold">
        📁 Upload Project Documents
      </h3>

      <div className="row g-4">
        {/* Thesis Upload */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 rounded-4 bg-light">
            <div className="card-body">
              <h5 className="card-title text-primary fw-semibold mb-3">
                <FaFilePdf className="me-2" />
                Thesis File (.pdf)
              </h5>
              <input
                type="file"
                accept=".pdf"
                className="form-control mb-3"
                onChange={(e) => setThesis(e.target.files[0])}
              />
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleUpload(thesis, "thesis")}
                disabled={!thesis || loadingThesis}
              >
                {loadingThesis ? "Uploading..." : "Upload Thesis"}
              </button>
            </div>
          </div>
        </div>

        {/* Similarity Report Upload */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 rounded-4 bg-light">
            <div className="card-body">
              <h5 className="card-title text-primary fw-semibold mb-3">
                <FaFileSignature className="me-2" />
                Similarity Report (.pdf)
              </h5>
              <input
                type="file"
                accept=".pdf"
                className="form-control mb-3"
                onChange={(e) => setSimilarityReport(e.target.files[0])}
              />
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleUpload(similarityReport, "similarity")}
                disabled={!similarityReport || loadingSimilarity}
              >
                {loadingSimilarity ? "Uploading..." : "Upload Report"}
              </button>
            </div>
          </div>
        </div>

        {/* Project Code Upload */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 rounded-4 bg-light">
            <div className="card-body">
              <h5 className="card-title text-primary fw-semibold mb-3">
                <FaFileCode className="me-2" />
                Project Code (.zip/.rar)
              </h5>
              <input
                type="file"
                accept=".zip,.rar"
                className="form-control mb-3"
                onChange={(e) => setProjectCode(e.target.files[0])}
              />
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleUpload(projectCode, "code")}
                disabled={!projectCode || loadingCode}
              >
                {loadingCode ? "Uploading..." : "Upload Code"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
