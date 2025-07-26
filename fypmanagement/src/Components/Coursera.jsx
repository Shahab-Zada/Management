import React, { useState } from "react";

import {Link} from 'react-router-dom'
const CourseCategory = ({ title, courses }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card mt-4">
      <div
        className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="card-body">
          <ul className="list-group">
            {courses.map((course, index) => (
              <CourseItem key={index} name={course.name} link={course.link} details={course.details} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CourseItem = ({ name, link, details }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li className="list-group-item d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          {name}
        </Link>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {showDetails && <p className="mt-2 text-muted">{details}</p>}
    </li>
  );
};

const Coursera = () => {
  const [searchTerm, setSearchTerm] = useState("");
 

  const categories = [
    
    {
      title: "Python Programming",
      courses: [
        { name: "Introduction to Python Programming - University of Pennsylvania", link: "https://dlsei.hec.gov.pk/courses/view/23193", details: "Basic introduction to Python programming." },
        { name: "Python Programming Essentials - Rice University", link: "https://dlsei.hec.gov.pk/courses/view/23200", details: "Essential programming concepts in Python." },
        { name: "Python Classes and Inheritance - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/30685", details: "Understanding object-oriented programming in Python." },
        { name: "Select Topics in Python: Django - Codio", link: "https://dlsei.hec.gov.pk/courses/view/30888", details: "Introduction to Django framework for web development." }
      ]
    },
    {
      title: "Java Programming",
      courses: [
        { name: "Java Programming: Principles of Software Design - Duke University", link: "https://dlsei.hec.gov.pk/courses/view/23269", details: "Design principles and software development." },
        { name: "Java Programming: Solving Problems with Software - Duke University", link: "https://dlsei.hec.gov.pk/courses/view/30413", details: "Problem-solving using Java." },
        { name: "Java Programming: Arrays, Lists, and Structured Data - Duke University", link: "https://dlsei.hec.gov.pk/courses/view/23268", details: "Working with data structures in Java." },
        { name: "Introduction to Java and Object-Oriented Programming - University of Pennsylvania", link: "https://dlsei.hec.gov.pk/courses/view/30414", details: "Basics of Java and OOP principles." },
        { name: "Introduction to Java Programming: Java Fundamental Concepts - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/26426", details: "Fundamental Java concepts and syntax." }
      ]
    },
    {
      title: "Writing Skills",
      courses: [
        { name: "Writing Skills for University Success - University of California", link: "https://dlsei.hec.gov.pk/courses/view/22150", details: "Develop academic writing skills for university." },
        { name: "Writing and Editing: Word Choice and Word Order - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/22540", details: "Improve writing clarity through word choice." },
        { name: "Writing and Editing: Structure and Organization - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/22541", details: "Learn how to structure and organize writing." },
        { name: "Getting Started with Essay Writing - University of California", link: "https://dlsei.hec.gov.pk/courses/view/20955", details: "Foundations of essay writing." }
      ]
    },{
        title: "Speaking Skills",
        courses: [
          { name: "English for Effective Business Speaking - The Hong Kong University of Science and Technology", link: "https://dlsei.hec.gov.pk/courses/view/21395", details: "Enhance business communication skills." },
          { name: "Speaking Skills for University Success - University of California, Irvine", link: "https://dlsei.hec.gov.pk/courses/view/22149", details: "Improve speaking skills for academic success." },
          { name: "Speaking and Presenting: Pitches and Persuasion - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/22537", details: "Learn persuasive speaking and presentations." },
          { name: "IELTS Listening and Speaking Sections Skills Mastery - University of California", link: "https://dlsei.hec.gov.pk/courses/view/22941", details: "Prepare for IELTS speaking and listening sections." }
        ]
      },{
        title: "PowerPoint & Project Management",
        courses: [
          { name: "Design, Format, and Presentation in Microsoft PowerPoint - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/25073", details: "Learn to create professional PowerPoint presentations." },
          { name: "Learn and design an attractive PowerPoint presentation - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/26622", details: "Improve PowerPoint design skills." },
          { name: "Project Management: How to Create a Gantt Chart in Wrike - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/26623", details: "Manage projects effectively using Gantt charts." },
          { name: "Project Management: Life cycle and project planning - Politecnico di Milano", link: "https://dlsei.hec.gov.pk/courses/view/30671", details: "Understand project planning and lifecycle." },
          { name: "Software Engineering: Software Design and Project Management - The Hong Kong University of Science and Technology", link: "https://dlsei.hec.gov.pk/courses/view/30959", details: "Learn software design and project management." },
          { name: "Introduction to Software Product Management - University of Alberta", link: "https://dlsei.hec.gov.pk/courses/view/30960", details: "Get started with software product management." }
        ]
      }, {
        title: "Web Development",
        courses: [
          { name: "Programming Foundations with JavaScript, HTML and CSS - Duke University", link: "https://dlsei.hec.gov.pk/courses/view/23266", details: "Introduction to web development technologies." },
          { name: "Programming with JavaScript - Meta", link: "https://dlsei.hec.gov.pk/courses/view/23660", details: "Learn JavaScript programming fundamentals." },
          { name: "Developing Front-End Apps with React - IBM Skills Network", link: "https://dlsei.hec.gov.pk/courses/view/22901", details: "Build React-based web applications." },
          { name: "React Basics and Advanced React - Meta", link: "https://dlsei.hec.gov.pk/courses/view/23637", details: "Deep dive into React fundamentals and advanced topics." },
          { name: "Create Your First Web App with Python and Flask - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/23637", details: "Build a web application using Flask and Python." },
          { name: "Building Web Applications in Django - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/22030", details: "Learn how to develop applications using Django." },
          { name: "Front-End JavaScript Frameworks: Angular - The Hong Kong University of Science and Technology", link: "https://dlsei.hec.gov.pk/courses/view/22350", details: "Master Angular framework for front-end development." },
          { name: "Server-side Development with NodeJS, Express and MongoDB - The Hong Kong University of Science and Technology", link: "https://dlsei.hec.gov.pk/courses/view/22351", details: "Learn back-end development using NodeJS and MongoDB." },
          { name: "Build a Node Server backend with Express - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/25981", details: "Create a Node.js server with Express." },
          { name: "Front-End Web UI Frameworks and Tools: Bootstrap 4 - The Hong Kong University of Science and Technology", link: "https://dlsei.hec.gov.pk/courses/view/22349", details: "Use Bootstrap 4 for responsive web development." }
        ]
      }, {
        title: "Databases & SQL",
        courses: [
          { name: "Using Databases with Python - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/30703", details: "Learn how to interact with databases using Python." },
          { name: "Concepts in SQL - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/24231", details: "Understand SQL fundamentals and queries." },
          { name: "Create a Python Application using MySQL - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/26791", details: "Develop a Python application with MySQL integration." },
          { name: "Building a Dynamic Web App using PHP & MySQL - Coursera Project Network", link: "https://dlsei.hec.gov.pk/courses/view/24173", details: "Create web applications using PHP and MySQL." }
        ]
      },{
        title: "Android Development",
        courses: [
          { name: "Java for Android - Vanderbilt University", link: "https://dlsei.hec.gov.pk/courses/view/21113", details: "Learn Java programming for Android development." },
          { name: "Android App Components - Intents, Activities, and Broadcast Receivers - Vanderbilt University", link: "https://dlsei.hec.gov.pk/courses/view/21114", details: "Understand Android app components and their interactions." },
          { name: "Android App Components - Services, Local IPC, and Content Providers - Vanderbilt University", link: "https://dlsei.hec.gov.pk/courses/view/21115", details: "Explore advanced Android app components." },
          { name: "Programming Mobile Applications for Android Handheld Systems - University of Maryland", link: "https://dlsei.hec.gov.pk/courses/view/27490", details: "Develop mobile applications for Android systems." },
          { name: "Introduction to Android graphics - Imperial College London", link: "https://dlsei.hec.gov.pk/courses/view/20990", details: "Learn the basics of Android graphics programming." }
        ]
      },{
        title: "Networking, IoT, Raspberry Pi",
        courses: [
          { name: "The Raspberry Pi Platform and Python Programming for the Raspberry Pi - University of California, Irvine", link: "https://dlsei.hec.gov.pk/courses/view/21061", details: "Learn Raspberry Pi and Python for IoT development." },
          { name: "Introduction to the Internet of Things and Embedded Systems - University of California, Irvine", link: "https://dlsei.hec.gov.pk/courses/view/21058", details: "Understand IoT fundamentals and embedded systems." },
          { name: "Fundamentals of Network Communication - University of Colorado", link: "https://dlsei.hec.gov.pk/courses/view/21598", details: "Learn networking concepts and communication protocols." },
          { name: "IoT Communications and Networks - Institut Mines-Télécom", link: "https://dlsei.hec.gov.pk/courses/view/26207", details: "Explore IoT communication methods and network protocols." },
          { name: "Programming for the Internet of Things Project - University of California", link: "https://dlsei.hec.gov.pk/courses/view/21063", details: "Develop IoT projects using programming skills." }
        ]
      }, {
        title: "Cloud Computing",
        courses: [
          { name: "API Design and Fundamentals of Google Cloud's Apigee API Platform - Google Cloud", link: "https://dlsei.hec.gov.pk/courses/view/21908", details: "Learn API design and Apigee API platform fundamentals." },
          { name: "Developing Cloud Apps with Node.js and React - IBM Skills Network", link: "https://dlsei.hec.gov.pk/courses/view/21535", details: "Develop cloud applications using Node.js and React." },
          { name: "Deploying a Python Flask Web Application to App Engine Flexible - Google Cloud", link: "https://dlsei.hec.gov.pk/courses/view/24298", details: "Deploy Flask web applications on Google Cloud." },
          { name: "Deploy Your Website on Cloud Run - Google Cloud", link: "https://dlsei.hec.gov.pk/courses/view/26083", details: "Learn how to deploy websites on Google Cloud Run." },
          { name: "IoT Cloud - University of Illinois at Urbana-Champaign", link: "https://dlsei.hec.gov.pk/courses/view/22740", details: "Explore IoT cloud computing concepts and applications." }
        ]
      },{
        title: "Python and AI",
        courses: [
          { name: "Python Project for AI & Application Development - IBM", link: "https://dlsei.hec.gov.pk/courses/view/21155", details: "Develop AI applications using Python." },
          { name: "Python Data Analysis - Rice University", link: "https://dlsei.hec.gov.pk/courses/view/23202", details: "Learn data analysis techniques with Python." },
          { name: "Python Data Visualization - Rice University", link: "https://dlsei.hec.gov.pk/courses/view/23203", details: "Create visualizations using Python libraries." },
          { name: "Introduction to Linear Algebra and Python - Howard University", link: "https://dlsei.hec.gov.pk/courses/view/23437", details: "Understand linear algebra concepts using Python." },
          { name: "Data Collection and Processing with Python - University of Michigan", link: "https://dlsei.hec.gov.pk/courses/view/30684", details: "Techniques for data collection and processing." }
        ]
      }, {
        title: "AI and R Programming",
        courses: [
          { name: "Introduction to Artificial Intelligence (AI) - IBM Skills Network", link: "https://dlsei.hec.gov.pk/courses/view/21041", details: "Learn the basics of AI and its applications." },
          { name: "Introduction to R Programming for Data Science - IBM Skills Network", link: "https://dlsei.hec.gov.pk/courses/view/21143", details: "Learn R programming for data science applications." },
          { name: "R Programming - Johns Hopkins University", link: "https://dlsei.hec.gov.pk/courses/view/21772", details: "Master R programming for statistical computing." },
          { name: "Introduction to TensorFlow for AI, ML, and Deep Learning - DeepLearning.AI", link: "https://dlsei.hec.gov.pk/courses/view/21879", details: "Get started with TensorFlow for AI applications." },
          { name: "Data Analysis with R Programming - Google", link: "https://dlsei.hec.gov.pk/courses/view/22587", details: "Analyze data effectively using R programming." }
        ]
      }



  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    courses: category.courses.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(category => category.courses.length > 0);

  return (
    <div className={`container mt-5 border-1`}>
    
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-center text-primary">Final Year Project (FYP) - Coursera Course Requirements</h2>
      
      </div>
      <div className=" " role="alert">
        <strong>Dear students,</strong> please note that you must select one course from each of the mandatory course sections: Python, Java, Thesis Writing, English Speaking, and Project Management and Presentation. These mandatory sections are indicated with an asterisk (*) after the section title. This will result in a total of 5 mandatory courses. In addition, you should select at least 3 optional courses that are relevant to your final year project. This implies that each student is required to submit a minimum of 8 completed Coursera course certificates along with their FYP proposals. These 8 courses will be considered as part of your internship program. You can take extra courses as you want and submit those certificates, but 8 is the minimum requirement. Choose wisely, and best of luck with your FYPs!
      </div>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCategories.map((category, index) => (
        <CourseCategory key={index} title={category.title} courses={category.courses} />
      ))}
    </div>
  );
};

export default Coursera;
