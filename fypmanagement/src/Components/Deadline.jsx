import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const deadlines = [
  { title: "Proposal & Certificate Submission", due: "2026-10-31T23:00:00" },
  { title: "November Monthly Report", due: "2026-11-30T23:59:00" },
  { title: "December Monthly Report", due: "2026-12-31T23:59:00" },
  { title: "February Monthly Report", due: "2027-02-28T23:59:00" },
  { title: "March Monthly Report", due: "2027-03-31T23:59:00" },
  { title: "April Monthly Report", due: "2027-04-30T23:59:00" },
  { title: "Thesis and Sim-report (soft copies)", due: "2027-05-07T23:59:00" },
  { title: "Internal and External Vivas", due: "2027-05-22T23:59:00" },
  { title: "Final Thesis (hard copy) and Code Upload (zip)", due: "2027-05-30T14:00:00" },
];

function getCountdown(targetDate, now = new Date()) {
  const diff = targetDate - now;
  if (diff <= 0) return "Deadline passed";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
}

const Deadline = () => {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const nextDeadline = deadlines.find(d => new Date(d.due) > now);

  const prev = () => setIndex((i) => (i === 0 ? deadlines.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === deadlines.length - 1 ? 0 : i + 1));

  const deadline = deadlines[index];
  const dueDate = new Date(deadline.due);
  const isPast = dueDate < now;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="custom-col-11-8">
          {nextDeadline && (
            <div
              className="d-flex align-items-center justify-content-between mb-4 p-3 rounded-3"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                fontSize: "1.2rem",
              }}
            >
              <div className="d-flex align-items-center">
                <FaClock size={22} className="me-2" />
                <span>
                  Next Deadline: <strong>{nextDeadline.title}</strong>
                </span>
              </div>
              <div>{getCountdown(new Date(nextDeadline.due), now)}</div>
            </div>
          )}

          <div
            className="card shadow-lg rounded-4 p-5"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            <div className="d-flex align-items-center mb-4">
              <FaCalendarAlt size={30} className="text-primary me-3" />
              <h2 className="fw-bold mb-0" style={{ letterSpacing: "0.05em", color: "#000000" }}>
                FYP 2025 Session Deadlines
              </h2>
            </div>

            <div
              className="text-center py-4 px-3"
              style={{
                filter: isPast ? "grayscale(75%) opacity(0.6)" : "none",
                transition: "filter 0.5s ease",
                minHeight: 180,
                borderRadius: "12px",
                backgroundColor: isPast ? "#f0f0f0" : "#e6f2ff",
                boxShadow: isPast
                  ? "none"
                  : "0 8px 20px rgba(0, 123, 255, 0.15)",
                color: "#000000",
              }}
            >
              <h3 className={`mb-3`} style={{ fontWeight: "700", fontSize: "1.9rem", color: "#000000" }}>
                {deadline.title}{" "}
                {isPast && (
                  <span
                    className="badge bg-secondary ms-2"
                    style={{ fontSize: "0.85rem", color: "#000000" }}
                  >
                    <FaCheckCircle className="me-1" />
                    Passed
                  </span>
                )}
              </h3>

              <p className="mb-3 fs-5" style={{ color: "#000000" }}>
                Due by: <strong>{dueDate.toLocaleString()}</strong>
              </p>

              {!isPast && (
                <div
                  className="d-flex align-items-center justify-content-center fs-4 fw-semibold"
                  style={{ color: "#000000" }}
                >
                  <FaClock className="me-3" />
                  <span>{getCountdown(dueDate, now)}</span>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between mt-5">
              <button
                className="btn btn-outline-primary btn-lg px-3"
                onClick={prev}
                aria-label="Previous deadline"
              >
                &larr; Previous
              </button>
              <button
                className="btn btn-primary btn-lg px-3"
                onClick={next}
                aria-label="Next deadline"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-col-11-8 {
          width: 98.33%; /* 11.8 / 12 columns */
          max-width: 98.33%;
          margin: 0 auto;
        }

        @media (max-width: 767.98px) {
          .custom-col-11-8 {
            width: 100%;
            max-width: 100%;
            padding: 0 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Deadline;
