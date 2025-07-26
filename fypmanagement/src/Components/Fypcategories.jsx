import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaDesktop, FaBrain, FaCloud } from "react-icons/fa"; 

const FypCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      title: "Web-based Projects",
      icon: <FaGlobe className="text-primary display-4" />, 
      description:
        "This project category focuses on creating dynamic and interactive web-based solutions to address specific needs or challenges in organizations. The projects might include developing comprehensive web portals and other cross-platform solutions, designed with a focus on user experience and efficiency.",
      tools: "HTML, CSS, JavaScript, React JS, Angular JS, Flask, Django, Node, Express, MongoDB, SQL, Cassandra",
      supervisors: "Dr. Aamir Akbar, Dr. Aftab Ahmad, Dr. Ashraf Zia, Dr. Hashim Ali, Dr. Nazia, Dr. Rarim, Mr. Shehzad",
      link: "/coursera",
    },
    {
      title: "Desktop and Mobile Software Projects",
      icon: <FaDesktop className="text-primary display-4" />, 
      description:
        "This category allows students to develop mobile and desktop applications (or a full-fledged system) that cater to specific organizational needs or resolve certain issues. You might also be integrating these applications with AI or Cloud technologies to further enhance their functionality and versatility.",
      tools: "Java, Kotlin, Swift, Cloud technologies, AI, JavaScript, Web technologies",
      supervisors: "Dr. Ashraf Zia, Dr. Hashim Ali, Dr. Nazia, Mr. Shehzad",
      link: "/coursera",
    },
    {
      title: "AI-based Projects",
      icon: <FaBrain className="text-primary display-4" />, 
      description:
        "These projects primarily concentrate on harnessing the power of Artificial Intelligence (AI), Natural Language Processing (NLP), and Computer Vision (CV) for developing predictive models, chatbots, AI-powered games, or solving other complex issues.",
      tools: "TensorFlow, Keras, OpenCV, NLP libraries, Matlab, Python, C++",
      supervisors: "Dr. Aamir Akbar, Dr. Ashraf Zia, Dr. Maqsood Hayat, Dr. Nadeem Iqbal",
      link: "/coursera",
    },
    {
      title: "Networking, Cloud Computing & IoT Projects",
      icon: <FaCloud className="text-primary display-4" />,
      description:
        "Projects can involve network design, traffic analysis, network security, or cloud-based applications. You can also integrate AI for processing Big Data collected from IoT devices, creating highly scalable and flexible applications.",
      tools: "AWS, Google and Azure Cloud, Raspberry Pi, Arduino, Machine Learning, Python",
      supervisors: "Dr. Aamir Akbar, Dr. Aftab Ahmad, Dr. Maqsood Hayat, Dr. Nadeem Iqbal, Dr. Rahim",
      link: "/coursera",
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
    
      <div className="text-center mb-4 p-4 bg-light rounded shadow-sm">
        <h2 className="fw-bold text-primary">🚀 Project Categories</h2>
        <p className=" px-md-5">
          Discover a variety of Final Year Project (FYP) categories designed to match your interests and skills.  
          Each category includes a brief overview, recommended tools, and available supervisors to guide you.  
          Use the search bar below to quickly find the perfect project category for you!  
        </p>
        <hr className="w-50 mx-auto mt-3 border-primary" />
      </div>

   
      <div className="mb-4 mx-auto w-75">
        <input
          type="text"
          className="form-control form-control-lg border-primary shadow-sm"
          placeholder="🔍 Search for a project category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

  
      <div className="row">
        {filteredCategories.map((category, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-lg h-100 border-0 p-3 text-center bg-white rounded-lg">
              <div className="card-body">
                {category.icon} 
                <h5 className="card-title text-primary fw-bold mt-3">{category.title}</h5>
                <p className="text-lg ">{category.description}</p>
                <p><strong>Suggested Tools:</strong> {category.tools}</p>
                <p><strong>Supervisors:</strong></p>
                <ul className="text-lg list-unstyled">
                  {category.supervisors.split(', ').map((supervisor, i) => (
                    <li key={i}>✔️ {supervisor}</li>
                  ))}
                </ul>
                <Link to={category.link} className="btn btn-outline-primary btn-sm">
                  📚 Explore Related Courses
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FypCategories;
