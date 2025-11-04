import { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
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
    return (
      <TemplateComponent data={resumeData?.data} isExpanded={isExpanded} />
    );
  }

  async function handleUpdateResume(updatedResume) {
    try {
      setResumeData(updatedResume);
      await addResume(updatedResume);

      // Debounce thumbnail generation
      clearTimeout(window.thumbnailTimeout);
      window.thumbnailTimeout = setTimeout(async () => {
        const thumbnail = await generateImage();
        if (thumbnail) {
          const resumeWithThumbnail = { ...updatedResume, thumbnail };
          await addResume(resumeWithThumbnail);
          setResumeData(resumeWithThumbnail);
          const updatedResumes = await getAllResumes();
          setResumes(updatedResumes);
        }
      }, 3000);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  }

  async function handleDeleteResume(id) {
    await deleteResume(id);
    const updatedResumes = await getAllResumes();
    setResumes(updatedResumes);
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

  async function generateImage() {
    const container = document.querySelector(".template-container");
    if (!container) {
      console.error("Template container not found");
      return null;
    }

    // Find the actual template content (first child of container)
    const page = container.firstElementChild;
    if (!page) {
      console.error("Template content not found");
      return null;
    }

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Try multiple methods with scaling
    const methods = [
      () => domtoimage.toPng(page, { 
        quality: 0.95, 
        bgcolor: '#ffffff',
      }),
      () => domtoimage.toJpeg(page, { 
        quality: 0.9, 
        bgcolor: '#ffffff',
      }),
      () => domtoimage.toPng(page, { 
        quality: 0.8, 
        bgcolor: '#ffffff',
        filter: (node) => node.tagName !== 'STYLE' 
      })
    ];

    for (const method of methods) {
      try {
        const dataUrl = await method();
        return dataUrl;
      } catch (error) {
        continue;
      }
    }
    return null;
  }

  return (
    <div className="app-container">
      {!templateSelected && resumes.length === 0 && (
        <div className="selection-homepage">
          <TemplateSelection onSelectTemplate={handleTemplateSelection} resumes={resumes} />
          <ResumeRender resumes={resumes} onDelete={handleDeleteResume} onInput={handleUpdateResume} />
        </div>
      )}

      {!templateSelected && resumes.length > 0 && (
        <div className="selection-homepage">
          <ResumeRender resumes={resumes} onDelete={handleDeleteResume} onInput={handleUpdateResume} />
          <TemplateSelection onSelectTemplate={handleTemplateSelection} resumes={resumes} />
        </div>
      )}

      {templateSelected && !resumeChoice && (
        <ResumeChoice onSelectChoice={handleResumeChoice} />
      )}

      {templateSelected && resumeChoice === "new" && (
        <>
          <div className="form-container">
            <ResumeForm resumeData={resumeData} onChange={handleUpdateResume} />
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