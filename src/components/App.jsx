import { useState } from "react";
import CoralTemplate from "../templates/CoralTemplate.jsx";
import "../templates/CoralTemplate.css";
import ResumeForm from "./ResumeForms";
import "./App.css";

const sampleData = {
  firstname: "John",
  lastname: "Doe",
  street: "123 Main Street",
  city: "New York",
  province: "NY",
  postalcode: "10001",
  phone: "(555) 123-4567",
  email: "john.doe@email.com",
  skills: "React, JavaScript, CSS, HTML, Node.js, MongoDB",
  experience: [
    {
      company: "Tech Corp",
      location: "New York",
      role: "Frontend Developer",
      start: "Jan 2022",
      end: "Present",
      duties: [
        "Developed responsive web applications using React",
        "Collaborated with design team to implement UI/UX",
        "Optimized application performance and accessibility",
      ],
    },
  ],
  education: [
    {
      school: "University of Technology",
      location: "Boston",
      degree: "Computer Science",
      start: "2018",
      end: "2022",
      description:
        "Bachelor's degree with focus on web development and software engineering",
    },
  ],
  awards: "Dean's List 2020-2022, Outstanding Student Award",
};

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <ResumeForm />
      </div>
      <div className="template-container" onClick={toggleExpand}>
        <CoralTemplate data={sampleData} isExpanded={isExpanded} />
      </div>
      <dialog 
        open={isExpanded}
        closedby="any"
        className="expanded-template"
        onClick={toggleExpand}
      >
        <CoralTemplate data={sampleData} isExpanded={isExpanded} />
      </dialog>
    </div>
  );
}