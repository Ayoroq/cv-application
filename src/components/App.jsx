import { useState, useEffect } from "react";
import back from "../assets/back.svg";
import saved from "../assets/saved.svg";
import rotate from "../assets/rotate.svg";
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
import EditableText from "./ReusableComponents.jsx";
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
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
      setResumeData(updatedResume);
      await addResume(updatedResume);
      setIsSaving(false);

      // Debounce thumbnail generation
      clearTimeout(window.thumbnailTimeout);
      window.thumbnailTimeout = setTimeout(async () => {
        setIsSaving(true);
        const thumbnail = await generateImage();
        if (thumbnail) {
          const resumeWithThumbnail = { ...updatedResume, thumbnail };
          await addResume(resumeWithThumbnail);
          setResumeData(resumeWithThumbnail);
          const updatedResumes = await getAllResumes();
          setResumes(updatedResumes);
        }
        setIsSaving(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating resume:", error);
      setIsSaving(false);
    }
  }

  async function handleEditResume(resume) {
    setTemplateSelected(resume.template);
    setResumeData(resume);
    setResumeChoice("new");
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Try multiple methods with scaling
    const methods = [
      () =>
        domtoimage.toPng(page, {
          quality: 0.95,
          bgcolor: "#ffffff",
        }),
      () =>
        domtoimage.toJpeg(page, {
          quality: 0.9,
          bgcolor: "#ffffff",
        }),
      () =>
        domtoimage.toPng(page, {
          quality: 0.8,
          bgcolor: "#ffffff",
          filter: (node) => node.tagName !== "STYLE",
        }),
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
          <TemplateSelection
            onSelectTemplate={handleTemplateSelection}
            resumes={resumes}
            onEdit={handleEditResume}
          />
          <ResumeRender
            resumes={resumes}
            onDelete={handleDeleteResume}
            onInput={handleUpdateResume}
          />
        </div>
      )}

      {!templateSelected && resumes.length > 0 && (
        <div className="selection-homepage">
          <ResumeRender
            resumes={resumes}
            onDelete={handleDeleteResume}
            onInput={handleUpdateResume}
            onEdit={handleEditResume}
          />
          <TemplateSelection
            onSelectTemplate={handleTemplateSelection}
            resumes={resumes}
          />
        </div>
      )}

      {templateSelected && !resumeChoice && (
        <ResumeChoice onSelectChoice={handleResumeChoice} />
      )}

      {templateSelected && resumeChoice === "new" && (
        <div className="editing-page">
          <nav className="nav">
            <div className="left-nav">
              <div className="back-button-container">
                <button
                  className="back-button"
                  onClick={async () => {
                    // Generate thumbnail before leaving
                    clearTimeout(window.thumbnailTimeout);
                    const thumbnail = await generateImage();
                    if (thumbnail && resumeData) {
                      const resumeWithThumbnail = { ...resumeData, thumbnail };
                      await addResume(resumeWithThumbnail);
                      const updatedResumes = await getAllResumes();
                      setResumes(updatedResumes);
                    }

                    setTemplateSelected(null);
                    setResumeChoice(null);
                    setResumeData(null);
                  }}
                >
                  <img src={back} alt="Back Button" />
                </button>
              </div>
              <div className="resume-name-container">
                <EditableText
                  value={resumeData.name}
                  onChange={(value) =>
                    handleUpdateResume({
                      ...resumeData,
                      name: value,
                    })
                  }
                />
              </div>
              <div className="saving-container">
                <img 
                  src={isSaving ? rotate : saved} 
                  alt={isSaving ? "Saving..." : "Saved"}
                  className={`saving-icon ${isSaving ? 'rotating' : ''}`}
                />
                <p>{isSaving ? "Saving..." : "Saved"}</p>
              </div>
            </div>
            <div className="right-nav">
              <div className="template-dropdown"></div>
              <div className="share-container"></div>
              <div className="download-container"></div>
            </div>
          </nav>
          <main className="main">
            <div className="form-container">
              <ResumeForm
                resumeData={resumeData}
                onChange={handleUpdateResume}
              />
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
          </main>
        </div>
      )}
    </div>
  );
}
