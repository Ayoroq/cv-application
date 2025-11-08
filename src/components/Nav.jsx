import { TemplateSelectionDropdown } from "./TemplateSelector";
import EditableText from "./ReusableComponents.jsx";
import back from "../assets/back.svg";
import rotate from "../assets/rotate.svg";
import saved from "../assets/saved.svg";
import share from "../assets/export.svg";
import download from "../assets/download.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

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
}) {
  function showSidebar() {
    document.querySelector(".sidebar").classList.add("show-sidebar");
  }

  function hideSidebar() {
    document.querySelector(".sidebar").classList.remove("show-sidebar");
  }

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
        </div>
      </div>
      <div className="right-nav">
        <div className="menu" onClick={showSidebar}>
          <p className="menu-text">Menu</p>
          <img src={menu} alt="Menu" className="menu-image" />
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="close-button-container">
            <button className="close-button nav-button" onClick={hideSidebar}>
              <img src={close} alt="Close" className="close-image" />
            </button>
          </div>
          <div className="template-dropdown">
            <TemplateSelectionDropdown
              onChangeTemplate={onTemplateChange}
              selectedTemplate={templateSelected}
            />
          </div>
          <div className="sidebar-buttons-container">
            <button className="nav-button sidebar-button" onClick={onShare}>
              <img src={share} alt="Share Resume" />
              <p>Share</p>
            </button>
            <button className="nav-button sidebar-button" onClick={onDownload}>
              <img src={download} alt="Download PDF" />
              <p>Download</p>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MainNav({handleLogoClick}){
  return(
    <nav className="main-nav">
      <div className="left-nav">
        <p className="logo" onClick={handleLogoClick}>Vitae</p>
      </div>
      <div className="right-nav"> 
        <p className="about">About</p>
        <div className="buttons-container">
          <button className="nav-button">Log In</button>
          <button className="nav-button">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

function TemplateSelectionNav({handleLogoClick}){
  return(
    <nav className="template-selection-nav">
      <div className="left-nav">
        <p className="logo" onClick={handleLogoClick}>Vitae</p>
      </div>
      <div className="right-nav">
        <button className="my-account">
          <img src="" alt="" />
        </button>
        <button className="log-out">Log Out</button>
      </div>
    </nav>
  );
}

export { MobileEditNav, MainNav, TemplateSelectionNav };
