import { useState, useEffect } from "react";
import back from "../assets/back.svg";
import saved from "../assets/saved.svg";
import rotate from "../assets/rotate.svg";
import download from "../assets/download.svg";
import share from "../assets/export.svg";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
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
import TemplateSelection, {
  TemplateSelectionDropdown,
} from "./TemplateSelector";
import ResumeRender from "./Resume.jsx";
import ResumeChoice from "./ResumeStartChoice.jsx";
import EditableText, { PreviewResumeButton } from "./ReusableComponents.jsx";
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
  awards: "",
  projects: [],
  languages: "",
};

export default function App() {
  const [templateSelected, setTemplateSelected] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [resumeChoice, setResumeChoice] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  function toggleExpand() {
    const dialog = document.querySelector(".expanded-template");
    if (dialog) {
      dialog.showModal();
    }
  }

  function closeDialog(e) {
    e.currentTarget.close();
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

  function handleTemplateChange(templateName) {
    setTemplateSelected(templateName);
    const updatedResume = {
      ...resumeData,
      template: templateName,
      lastModified: Date.now(),
    };
    setResumeData(updatedResume);

    setTimeout(async () => {
      await addResume(updatedResume);
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
      }, 1000);
    }, 0);
  }

  function handleResumeChoice(choice) {
    setResumeChoice(choice);
  }

  function renderTemplate() {
    if (!resumeData) return null;
    const TemplateComponent = templates[templateSelected];
    return <TemplateComponent data={resumeData.data} />;
  }

  async function handleUpdateResume(updatedResume) {
    await saveResumeWithThumbnail(updatedResume);
  }

  async function handleUpdateResumeText(updatedResume) {
    clearTimeout(window.textSaveTimeout);
    window.textSaveTimeout = setTimeout(async () => {
      setIsSaving(true);
      setResumeData(updatedResume);
      await addResume(updatedResume);
      const updatedResumes = await getAllResumes();
      setResumes(updatedResumes);
      setIsSaving(false);
    }, 500);
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

  async function generateImage(highRes = false) {
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

    const scale = highRes ? 3 : 1;
    const options = {
      quality: 1.0,
      bgcolor: "#ffffff",
      width: page.offsetWidth * scale,
      height: page.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: page.offsetWidth + "px",
        height: page.offsetHeight + "px",
      },
    };

    // Try multiple methods with high quality settings
    const methods = [
      () => domtoimage.toPng(page, options),
      () => domtoimage.toJpeg(page, { ...options, quality: 0.95 }),
      () => domtoimage.toPng(page, { ...options, quality: 0.9 }),
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

  async function handleDownload() {
    const dataUrl = await generateImage(true);
    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate aspect ratio to maintain proportions
        const imgAspectRatio = img.width / img.height;
        const pdfAspectRatio = pdfWidth / pdfHeight;

        let finalWidth, finalHeight;
        if (imgAspectRatio > pdfAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / imgAspectRatio;
        } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * imgAspectRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(dataUrl, "PNG", x, y, finalWidth, finalHeight, "", "FAST");
        pdf.save(`${resumeData?.name || "resume"}.pdf`);
      };
      img.src = dataUrl;
    }
  }

  async function handleShare() {
    if (!resumeData) return;
    const shareUrl = `${window.location.origin}/resume/${resumeData.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: resumeData.name,
          text: `Check out my resume: ${resumeData.name}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Resume link copied to clipboard!");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Resume link copied to clipboard!");
      });
  }

  async function saveResumeWithThumbnail(updatedResume, delay = 5000) {
    try {
      setIsSaving(true);
      setResumeData(updatedResume);
      await addResume(updatedResume);
      setIsSaving(false);

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
      }, delay);
    } catch (error) {
      console.error("Error saving resume:", error);
      setIsSaving(false);
    }
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
            onInput={handleUpdateResumeText}
          />
        </div>
      )}

      {!templateSelected && resumes.length > 0 && (
        <div className="selection-homepage">
          <ResumeRender
            resumes={resumes}
            onDelete={handleDeleteResume}
            onInput={handleUpdateResumeText}
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
                  className="back-button nav-button"
                  onClick={() => {
                    // Generate thumbnail in background after navigation
                    if (resumeData) {
                      clearTimeout(window.thumbnailTimeout);
                      setTimeout(async () => {
                        const thumbnail = await generateImage();
                        if (thumbnail) {
                          const resumeWithThumbnail = {
                            ...resumeData,
                            thumbnail,
                          };
                          await addResume(resumeWithThumbnail);
                          const updatedResumes = await getAllResumes();
                          setResumes(updatedResumes);
                        }
                      }, 100);
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
                  className="edit-page-resume-name"
                  value={resumeData?.name || ""}
                  onChange={(value) =>
                    handleUpdateResumeText({
                      ...resumeData,
                      name: value,
                      lastModified: Date.now(),
                    })
                  }
                />
              </div>
              <div className="saving-container">
                <img
                  src={isSaving ? rotate : saved}
                  alt={isSaving ? "Saving..." : "Saved"}
                  className={`saving-icon ${isSaving ? "rotating" : ""}`}
                />
                <p>{isSaving ? "Saving..." : "Saved"}</p>
              </div>
            </div>
            <div className="right-nav">
              <div className="template-dropdown">
                <TemplateSelectionDropdown
                  onChangeTemplate={(e) => handleTemplateChange(e.target.value)}
                  selectedTemplate={templateSelected}
                />
              </div>
              <div className="share-container">
                <button className="nav-button" onClick={handleShare}>
                  <img src={share} alt="Share Resume" />
                </button>
              </div>
              <div className="download-container">
                <button className="nav-button" onClick={handleDownload}>
                  <img src={download} alt="Download PDF" />
                </button>
              </div>
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
            <PreviewResumeButton onClick={toggleExpand} word="Preview resume" />
            <dialog className="expanded-template" onClick={closeDialog}>
              {renderTemplate()}
            </dialog>
          </main>
        </div>
      )}
    </div>
  );
}

/*
 * TODO: Finish the resume preview styling - done
 * do the template preview - done
 * Add the button when screen size is small to preview the resume - done
 * Drag and drop to rearrange education and experience - done
 * Fix the issue with the name change when typing - done
 * Multiple export options 
 * Add Navbar to the home page/resume selection page
 * Add a main page
 * Mobile Responsiveness
 */