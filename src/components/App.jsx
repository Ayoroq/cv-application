import { useState } from "react";
import CoralTemplate from "../templates/CoralTemplate.jsx";
import ModernTemplate from "../templates/ModernTemplate.jsx";
import SerifTemplate from "../templates/SerifTemplate.jsx";
import SwissTemplate from "../templates/SwissTemplate.jsx";
import SpearmintTemplate from "../templates/SpearmintTemplate.jsx";
import "../templates/CoralTemplate.css";
import "../templates/ModernTemplate.css";
import "../templates/SerifTemplate.css";
import "../templates/SwissTemplate.css";
import "../templates/SpearmintTemplate.css";
import "./App.css";
import ResumeForm from "./ResumeForms";
import TemplateSelection from "./TemplateSelector";
import ResumeRender from "./Resume.jsx";
import ResumeChoice from "./ResumeStartChoice.jsx";

const templates = {
  Coral: CoralTemplate,
  Modern: ModernTemplate,
  Serif: SerifTemplate,
  Swiss: SwissTemplate,
  Spearmint: SpearmintTemplate,
};

/*
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
  */
  
  const sampleData = {
    firstname: "",
    lastname: "",
    title: "",
    street: "",
    city: "",
    province: "",
    postalcode: "",
    phone: "",
    email: "",
    skills: "",
    experience: [],
    education: [],
    awards: [],
    projects: [],
    languages: ""
  };

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(null);
  const [resumeChoice, setResumeChoice] = useState(null);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  function handleTemplateSelection(templateName) {
    setTemplateSelected(templateName);
  }

  function handleResumeChoice(choice) {
    setResumeChoice(choice);
  }

  function renderTemplate() {
    const TemplateComponent = templates[templateSelected];
    return <TemplateComponent data={sampleData} isExpanded={isExpanded} />;
  }

  return (
    <div className="app-container">
      {!templateSelected && (
        <div className="selection-homepage">
          <TemplateSelection onSelectTemplate={handleTemplateSelection} />
          <ResumeRender />
        </div>
      )}

      {templateSelected && !resumeChoice && (
        <ResumeChoice onSelectChoice={handleResumeChoice} />
      )}

      {templateSelected && resumeChoice === 'new' && (
        <>
          <div className="form-container">
            <ResumeForm />
          </div>
          <div className="template-container" onClick={toggleExpand}>
            {renderTemplate()}
          </div>
          <dialog
            open={isExpanded}
            closedby="any"
            className="expanded-template"
            onClick={toggleExpand}
          >
            {renderTemplate()}
          </dialog>
        </>
      )}
    </div>
  );
}