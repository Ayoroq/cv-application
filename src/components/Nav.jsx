import { TemplateSelectionDropdown } from "./TemplateSelector";
import EditableText from "./ReusableComponents.jsx";
import back from "../assets/back.svg";
import rotate from "../assets/rotate.svg";
import saved from "../assets/saved.svg";
import share from "../assets/export.svg";
import download from "../assets/download.svg";
import menu from "../assets/menu.svg";

export default function EditNav({
  resumeData,
  isSaving,
  templateSelected,
  onBack,
  onResumeNameChange,
  onTemplateChange,
  onShare,
  onDownload,
}) {
  return (
    <nav className="nav">
      <div className="left-nav">
        <div className="back-button-container">
          <button className="back-button nav-button" onClick={onBack}>
            <img src={back} alt="Back Button" />
          </button>
        </div>
        <div className="resume-name-container">
          <EditableText
            className="edit-page-resume-name"
            value={resumeData?.name || ""}
            onChange={onResumeNameChange}
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
            onChangeTemplate={onTemplateChange}
            selectedTemplate={templateSelected}
          />
        </div>
        <div className="share-container">
          <button className="nav-button" onClick={onShare}>
            <img src={share} alt="Share Resume" />
          </button>
        </div>
        <div className="download-container">
          <button className="nav-button" onClick={onDownload}>
            <img src={download} alt="Download PDF" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function MobileEditNav({
  resumeData,
  isSaving,
  templateSelected,
  onBack,
  onResumeNameChange,
  onTemplateChange,
  onShare,
  onDownload,
  onMenuClick,
}) {
  return (
    <nav className="mobile-nav">
      <div className="left-nav">
        <div className="back-button-container">
          <button className="back-button nav-button" onClick={onBack}>
            <img src={back} alt="Back Button" />
          </button>
        </div>
        <div className="resume-name-container">
          <EditableText
            className="edit-page-resume-name-mobile"
            value={resumeData?.name || ""}
            onChange={onResumeNameChange}
          />
        </div>
        <div className="saving-container">
          <img
            src={isSaving ? rotate : saved}
            alt={isSaving ? "Saving..." : "Saved"}
            className={`saving-icon ${isSaving ? "rotating" : ""}`}
          />
        </div>
      </div>
      <div className="right-nav">
        <div className="menu" onClick={onMenuClick}>
          <p className="menu-text">Menu</p>
          <img src={menu} alt="Menu" className="menu-image"/>
        </div>
      </div>
    </nav>
  );
}

export { MobileEditNav };