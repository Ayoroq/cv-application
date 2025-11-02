import { useState, useEffect } from "react";
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
import database, {
  addResume,
  getAllResumes,
  getResume,
  deleteResume,
} from "../utils/database.js";

const templates = {
  Coral: CoralTemplate,
  Modern: ModernTemplate,
  Serif: SerifTemplate,
  Swiss: SwissTemplate,
  Spearmint: SpearmintTemplate,
};

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
  languages: "",
};

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [resumeChoice, setResumeChoice] = useState(null);
  const [resumes, setResumes] = useState([]);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  // Once a template has been selected,this creates a new resume object and stores that in the db
  async function handleTemplateSelection(templateName) {
    setTemplateSelected(templateName);
    const newResume = {
      id: crypto.randomUUID(),
      createdTime: Date.now(),
      lastModified: Date.now(),
      name: `New Resume`,
      template: templateName,
      data: { ...sampleData },
    };
    await addResume(newResume);
    setResumeData(newResume);
  }

  function handleResumeChoice(choice) {
    setResumeChoice(choice);
  }

  function renderTemplate() {
    const TemplateComponent = templates[templateSelected];
    return <TemplateComponent data={resumeData?.data || sampleData} isExpanded={isExpanded} />;
  }
  
  // This runs immediately on start-up to see if the user had any previous resumes 
  useEffect(() => {
    const initializeResumes = async () => {
      const existingResumes = await getAllResumes();
      if (existingResumes.length === 0) {
       setResumes([]);
      } else {
        setResumes(existingResumes);
      }
    };
    initializeResumes();
  }, []);

  return (
    <div className="app-container">
      {!templateSelected && (
        <div className="selection-homepage">
          <TemplateSelection onSelectTemplate={handleTemplateSelection} />
          <ResumeRender resumes={resumes}/>
        </div>
      )}

      {templateSelected && !resumeChoice && (
        <ResumeChoice onSelectChoice={handleResumeChoice} />
      )}

      {templateSelected && resumeChoice === "new" && (
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
