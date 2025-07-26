import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from './Accordion';
import Deadline from './Deadline';
import './Home.css';
import pic1 from '../Assets/pic1.jpg';
import computer from '../Assets/computer.jpeg';
import Aftab from '../Assets/Aftab_Ahmad.jpeg';
import Nadeem_Iqbal from '../Assets/Nadeem_Iqbal.png';

export default function Home() {
  return (
    <>
      {/* Hero Carousel Section */}
      <section className="pt-2">
        <div className="container-fluid px-0">
          <div id="mycarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="2"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={pic1} className="carousel-image" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src={computer} className="carousel-image" alt="Slide 2" />
              </div>
              <div className="carousel-item">
                <img src={computer} className="carousel-image" alt="Slide 3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="my-5 fade-in">
        <div className="container">
          <div className="alert alert-info shadow-lg p-5 rounded text-center">
            <h1 className="fw-bold mb-3">🎓 Welcome to Your FYP Hub!</h1>
            <p className="text-dark">Your one-stop hub for resources tailored just for your FYP.</p>
            <p className="text-dark">Stay updated and dive into 30+ FAQs already available — more coming regularly!</p>
            <p className="text-dark">From starting your proposal to submitting your thesis, we've got you covered.</p>
            <h5 className="mt-4">
              <Link to="/" className="text-decoration-none text-primary fw-bold">
                Dr. Aftab Ahmad
              </Link> – Your Project Coordinator
            </h5>
          </div>
        </div>
      </section>

      {/* Accordion & Deadlines */}
      <section className="container fade-in">
        <Accordion />
        <div className="mt-5">
          <Deadline />
        </div>
      </section>

      {/* Chairman Message */}
      <section className="container my-5 fade-in">
        <div className="shadow-lg bg-white p-5 rounded">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={Nadeem_Iqbal}
                alt="Chairman"
                className="img-fluid rounded-circle shadow-lg"
                style={{ maxHeight: '250px' }}
              />
            </div>
            <div className="col-md-8">
              <h3 className="fw-bold mb-3 text-primary">Chairman's Message</h3>
              <p>Dear Senior Students,</p>
              <p>
                Your Final Year Project (FYP) is a significant milestone in your academic and professional
                journey. It demonstrates your skills, creativity, and ability to solve real-world problems.
              </p>
              <p>
                Choose projects with societal impact and industry relevance. You are not alone — our faculty
                and coordinators, especially Dr. Aftab Ahmad, are here to support you every step of the way.
              </p>
              <p>Remember, clear communication and timely submission are key to your success.</p>
              <strong>Warm regards,</strong>
              <br />
              <em>Dr. Nadeem Iqbal,<br />Head of Computer Science Department</em>
            </div>
          </div>
        </div>
      </section>

      {/* Coordinator Message */}
      <section className="container mb-5 fade-in">
        <div className="shadow-lg bg-white p-5 rounded">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={Aftab}
                alt="Coordinator"
                className="img-fluid rounded-circle shadow-lg"
                style={{ maxHeight: '250px' }}
              />
            </div>
            <div className="col-md-8">
              <h3 className="fw-bold mb-3 text-primary">Project Coordinator's Message</h3>
              <p>Dear Students,</p>
              <p>
                The FYP is more than an academic requirement — it's your chance to shine. Pick projects that
                solve real problems, are innovative, and show your best work.
              </p>
              <p>
                I’m here to guide and mentor you through each phase. Don’t hesitate to reach out for support
                or direction. Together, we’ll make your FYP journey productive and rewarding.
              </p>
              <p>
                Stay focused, communicate openly, and meet deadlines. The effort you put in today defines
                your future.
              </p>
              <strong>Warm regards,</strong>
              <br />
              <em>Dr. Aftab Ahmad,<br />FYP Coordinator, CS Department</em>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Styling */}
      <style>{`
        .fade-in {
          animation: fadeInUp 0.8s ease-in-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Make carousel images fixed height & responsive */
        .carousel-image {
          height: 600px;
         
          width: 100%;
        }

        @media (max-width: 768px) {
          .carousel-image {
            height: 250px;
          }
             @media (max-width: 330px) {
          .carousel-image {
            height: 180px;
          }
        }
      `}</style>
    </>
  );
}
