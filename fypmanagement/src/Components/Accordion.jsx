import React, { useState } from "react";
import {Link} from 'react-router-dom'
const Accordion = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">FYP FAQs</h2>
      <div className="faq-container border rounded shadow p-3" style={{ maxHeight: "500px", overflowY: "auto" }} >
        
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            
            <h4 className="bg-light p-3 rounded title">{section.id}. {section.title}</h4>

         
            <div className="mt-2 pl-3">
              {section.questions.map((item) => (
                <div key={item.id} className="faq-item p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 flex-grow-1">{item.id} {item.question}</h5>
                    <button 
                      className="btn btn-sm ml-3 btn-outline border" 
                      onClick={() => toggleQuestion(item.id)}
                    >
                      {openQuestion === item.id ? "▲" : "▼"}
                    </button>
                  </div>
                  {openQuestion === item.id && <p className="mt-2">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const sections = [
  {
    id: 1,
    title: "Coursera Courses FAQ's",
    questions: [
      { id: "1.1", question: "Should I opt for an internship or complete Coursera courses online?", answer: "Each student is expected to submit at least 8 completed Coursera course certificates with their FYP proposals. However, if you can provide an internship certificate, this can serve as a substitute for the 8 Coursera courses, thus giving you the flexibility to choose between the two." },
      { id: "1.2", question: "How do I register for the coursera courses?", answer: (
        <>
         visit the following link:  {" "}
          <Link to=" https://dlsei.hec.gov.pk/">https://dlsei.hec.gov.pk/</Link> and follow the registration process. 
        </>)},
      { id: "1.3", question: "There is no Garden Campus in University Campuses, what should i do?", answer: "Select main campus instead." },
      { id: "1.4", question: "What is the  next step after submitting the online application?",answer: (
        <>
          Please send a confirmation email to Dr. Salman at{" "}
          <Link to="mailto:salman@awkum.edu.pk">salman@awkum.edu.pk</Link>. He will then proceed with your registration approval.
        </>)},
      { id: "1.5", question: "Whomm should I reach out if i encounter any issues during login and registration process?", answer: (
        <>
         For any issues during the registration or login process, please reach out to Dr. Salman at {" "}
          <Link to="mailto:salman@awkum.edu.pk">salman@awkum.edu.pk</Link>.
        </>) },
      { id: "1.6", question: "What is the minimum numberr of courses i need to complete to eligible for the FYP?", answer: (
        <>
        To be eligible for the FYP, you are required to complete a minimum of 8 courses. This includes 5 mandatory courses and 3 optional courses that are relevant to your FYP project. You can find more details on the {" "}
          <Link to="/courseracourses">Coursera Courses</Link> page.
        </>) },
      { id: "1.7", question: "Am I allowed to take more than required 8 courses?", answer: "Absolutely, you're welcome to take as many courses as you wish." },
      { id: "1.8", question: "What initial benefit can I get fro taking these courses, aside from fulfilling the FYP requirements?", answer: "Completing these courses not only fulfills your FYP requirement, but also allows you to add the certificates of completion to your LinkedIn profile and CV. This can significantly enhance your profile when you're applying for jobs." }, 
      { id: "1.9", question: "I already have availed Cohort-I, what should I do?", answer: "The deadline for Cohort-I has been extended until the 30th of September. This means you have enough time to fulfill the 8-course requirement for FYP acceptance." }

    ]
  },
  
  {
    id: 2,
    title: "Starting Your FYP Proposal",
    questions: [
      { id: "2.1", question: "What are prerequesites for FYP to be accepted?", answer: "To have an FYP accepted, all group members must be from the same class (i.e., BCS 7th Open, BCS 7th Self, BSW 7th). Additionally, each member must provide either an internship certificate or proof of completion for 8 courses on Coursera." },
      { id: "2.2", question: "What are the maximum number of students allowed in FYP group?", answer: "An FYP group can consist of up to three students." },
      { id: "2.3", question: "What is the recommended approach for forming my FYP group?", answer: "I suggest discussing with your classmates to identify shared interests and potential project ideas. Once you've agreed on a project concept, you can form your FYP group based on this shared vision." },

      { id: "2.4", question: "What is the process of joining the designated Whatsapp group?", answer: "If you are not already a member of the WhatsApp group, please reach out to your CR and request to be added." },
      { id: "2.5", question: "What is the process of writing my FYP proposal?",answer: (<>
       You can start writing your FYP proposal by using the provided template. You can download the template from {" "}
          <Link to="https://docs.google.com/document/d/1bCaMxcpl-YWFbTHQL8L3Z03kVj8I4CQZ/edit?usp=sharing&amp;ouid=115269946706901525504&amp;rtpof=true&amp;sd=true">here</Link>.
        </>) },
      { id: "2.6", question: "I am not sure whether to  select a research base project or more practical.I need some guidance on this matter?", answer: "Both types of projects have their merits and are suited to different objectives. If your interest lies in creating and delivering tangible software solutions, then a practical project, which involves the practical application of concepts, would be an ideal fit. These projects often involve designing, developing, and testing a software product to address specific needs or problems. On the other hand, research-based projects are typically more theoretical and investigative in nature. They involve identifying gaps in the current state-of-art and proposing innovative solutions or improvements. Such projects are often more aligned with advanced degrees like MS or PhD where the focus is on contributing new knowledge to the field. However, as an undergraduate student, I recommend to choose a practical project that can provide a comprehensive and practical understanding of the subject matter and the application of learned concepts. Practical projects can better prepare you for entering the professional sphere where you'll likely be working on creating and implementing software solutions. It's important, though, to choose a practical project that interests and motivates you, as this will help ensure a rewarding and successful project experience." },
      { id: "2.7", question: "I am not sure which practical project type to choose and i need some guidance?",answer: (<>
        Understanding the type of project that aligns with your interest and academic goals is crucial. I have created a comprehensive list of various project categories which can be found on our  {" "}
           <Link to="/fypcategories">FYP Categories</Link> page. Each project category is equipped with detailed descriptions, recommended tools, and potential supervisors. You can explore these categories to understand what each type of project entails and find one that fits your skills, passion, and future career plans. Remember, the right project can provide a foundation for your career, so choose wisely!.
         </>) },
      { id: "2.8", question: "I can see the list of supervisor in each project category, but what is the process of selecting a supervisor for my FYP?", answer: (<>
        As you submit your FYP proposal, you'll have an opportunity to choose your desired supervisor. However, it's important to note that the final assignment of supervisors is done on a priority basis and is subject to the limit on the number of projects each supervisor can handle. Moreover, in each  {" "}
           <Link to="/fypcategories">FYP Categories</Link> , the list of supervisors will give you an idea of potential supervisors in the area related to your FYP.
         </>) },
      { id: "2.9", question: "Can I modify my FYP proposal after the submission?", answer: "Typically, once submitted, proposals are considered final. However, minor adjustments might be made in consultation with your assigned supervisor." },
      { id: "2.10", question: "What are the key deadlines for FYP submission process?", answer: (<>
      Key deadlines for proposal submissions, monthly reports, internal/external assessments, and final thesis submissions are outlined in the FYP timeline. You can find all relevant dates on  {" "}
           <Link to="/home">Home Page</Link> 
         </>) }
    ]
  },

  {
    id: 3,
    title: "FYP Proposal Submission & Review",
    questions: [
      { id: "3.1", question: "What is the process for submitting FYP proposal and accompnaying the certificates ?", answer: (<>
     You can submit your FYP proposal and certificates through the online {" "}
             <Link to="">Proposal Form</Link> 
           </>) },
      { id: "3.2", question: "Which file format can I use for proposal submission?", answer: "You can submit your proposal in either PDF or MS Word document formats (.doc or .docx)." },
      { id: "3.3", question: "What's the sagnificance of my email?", answer: "It's important to provide valid email addresses for all members. This is how you'll receive important notifications about your FYPs. Additionally, accounts will be set up using these email addresses, allowing you to log in to view your marks and use other online services." },
      { id: "3.4", question: "Which file format can I use for certificate submission?", answer: "You can submit your certificate in PDF format only." },
      { id: "3.5", question: "How can I submit multiple Coursera certificates when only one file upload is allowed?",answer: (<>
        For Coursera certificates, only one file can be uploaded. To submit multiple certificates, first merge them into a single file. There are many online tools available for this purpose. For instance, you can use{" "}
                <Link to="https://smallpdf.com/merge-pdf">https://smallpdf.com/merge-pdf</Link> to merge your certificates and create one PDF file.

              </>)  },
      { id: "3.6", question: "What should i expect after submitting my FYP proposal?", answer: "Once you successfully upload your FYP proposal, every group member will receive an automatically generated email by the system. This email will contain important details about your online accounts, so its important for all group members to provide accurate email addresses." },
      { id: "3.7", question: "Does recieving the email confirm the acceptance of my FYP proposal and group members?", answer: "No, the email simply confirms that your details and files have been successfully uploaded to the system. I will personally review each submission, validate your details and certificates, and assign supervisors based on criteria like the supervisor's expertise in your proposal's category and whether they haven't exceeded their FYP groups supervision limit." },
      { id: "3.8", question: "A member is providing the coursera certificates.Ewhat happens if he/she hasn't submitted the mandatory 8 certificates?", answer: "If, during my review, I discover that any group member hasn't met the requirement of submitting 8 Coursera certificates, that member will be disqualified and removed from the group. Additionally, I've implemented a verification step in the proposal form to ensure all requirements are met before submission. If discrepancies are found later, the group will be held accountable for overlooking this verification, leading to the member's elimination." },
      { id: "3.9", question: "What are the consequences for a student get disqualified and remmoved from a group ?", answer: "In addition to the deletion of their online account, which was automatically created upon proposal submission, the student will be ineligible to participate in this year's FYP session." },
      { id: "3.10", question: "What mistakes might i make when I submit my proposal?", answer: "If a student has already signed up and has a profile, trying to submit their details again will cause an error. Other problems can happen if there's no internet connection or if the system takes too long to respond." },
      { id: "3.11", question: "After seeing 'proposal submitted successfully's' message, what should I do?", answer: "You'll get an email confirming the system has received your proposal. This email will also have a link to reset your account password. Once done, you can log in to see your marks and other information." },



    ]
  }
];

export default Accordion;
