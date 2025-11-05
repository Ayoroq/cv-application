import deleteImg from "../assets/delete.svg";
import EditableText from "./ReusableComponents.jsx";

export default function ResumeRender({ resumes, onInput, onDelete, onEdit }) {
  function handleDelete(id) {
    onDelete(id);
  }

  function handleInputChange(resume, value) {
    onInput({ ...resume, name: value });
  }

  function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(diff / 2592000000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (months < 12) return `${months}mo ago`;
    return new Date(timestamp).toLocaleDateString();
  }

  return (
    <div className="resume-container">
      <h2>{resumes.length > 1 ? "Recent Resumes" : "Recent Resume"}</h2>
      {resumes.length === 0 && (
        <div className="no-resume">
          <p className="no-resume-text">
            You currently do not have any resume.
          </p>
        </div>
      )}
      {resumes.length > 0 && (
        <>
          <div className="resume-selection">
            {resumes.sort((a, b) => b.lastModified - a.lastModified).map((resume) => (
              <div key={resume.id} className="resume-card">
                <img
                  className="resume-thumbnail-image"
                  src={resume.thumbnail}
                  alt={`${resume.name} thumbnail`}
                  onClick={() => onEdit(resume)}
                />
                <div className="resume-details">
                  <div className="resume-info">
                    <EditableText
                      value={resume.name}
                      onChange={(value) => handleInputChange(resume, value)}
                    />
                    <p className="resume-edit-date">
                      Last Modified: {getRelativeTime(resume.lastModified)}
                    </p>
                  </div>
                  <div className="resume-actions">
                    <button className="delete-resume" type="button">
                      <img
                        src={deleteImg}
                        alt="Delete Resume"
                        className="delete-resume-image"
                        onClick={() => handleDelete(resume.id)}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/*
 * TODO: Finish the resume preview styling
 * do the template preview
 * Add the button when screen size is small to preview
 * Drag and drop to rearrange education and experience
 * Fix the issue with the name change when typing
 * Multiple export options
 * Add Navbar to the home page/resume selection page
 * Add a main page
 */