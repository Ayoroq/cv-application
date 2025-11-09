import { useState, useEffect } from "react";
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
import TemplateSelection from "./TemplateSelector";
import ResumeRender from "./Resume.jsx";
import ResumeChoice from "./ResumeStartChoice.jsx";
import { PreviewResumeButton } from "./ReusableComponents.jsx";
import EditNav, {
  MobileEditNav,
  TemplateSelectionNav,
  MainNav,
} from "./Nav.jsx";
import LandingPage from "./LandingPage.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { addResume, getAllResumes, deleteResume } from "../utils/database.js";

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

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

export default function App() {
  const [templateSelected, setTemplateSelected] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [resumeChoice, setResumeChoice] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = useWindowWidth();

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

  function handleLogoClick(){
    if(isStarted){
      setIsStarted(false);
    }
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
      try {
        const existingResumes = await getAllResumes();
        setResumes(existingResumes);
      } catch (error) {
        console.error("Error loading resumes:", error);
        setResumes([]);
      } finally {
        // Minimum loading time for better UX
        setTimeout(() => setIsLoading(false), 3000);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      {!isStarted && (
        <>
          <MainNav
            onClick={handleLogoClick}
          />
          <LandingPage
            onCtaClick={() => {
              setIsStarted(true);
            }}
          />
        </>
      )}

      {isStarted && !templateSelected && resumes.length === 0 && (
        <div className="selection-homepage">
          <TemplateSelectionNav
            onClick={handleLogoClick}

          />
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

      {isStarted && !templateSelected && resumes.length > 0 && (
        <div className="selection-homepage">
          <TemplateSelectionNav
            onClick={handleLogoClick}
          />
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
          {windowWidth > 530 ? (
            <EditNav
              resumeData={resumeData}
              isSaving={isSaving}
              templateSelected={templateSelected}
              onBack={() => {
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
              onResumeNameChange={(value) =>
                handleUpdateResumeText({
                  ...resumeData,
                  name: value,
                  lastModified: Date.now(),
                })
              }
              onTemplateChange={(e) => handleTemplateChange(e.target.value)}
              onShare={handleShare}
              onDownload={handleDownload}
            />
          ) : (
            <MobileEditNav
              resumeData={resumeData}
              isSaving={isSaving}
              templateSelected={templateSelected}
              onBack={() => {
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
              onResumeNameChange={(value) =>
                handleUpdateResumeText({
                  ...resumeData,
                  name: value,
                  lastModified: Date.now(),
                })
              }
              onTemplateChange={(e) => handleTemplateChange(e.target.value)}
              onShare={handleShare}
              onDownload={handleDownload}
            />
          )}
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
 * TODO:
 * Multiple export options
 */
