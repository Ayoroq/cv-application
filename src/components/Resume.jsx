export default function ResumeRender({ resumes, onInput, onDelete }) {
  function handleDelete(id) {
    onDelete(id);
  }

  function handleInputChange(resume, value) {
    onInput({ ...resume, name: value });
  }

  return (
    <div className="resume-container">
      <h2>Recent Resume</h2>
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
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <img
                  className="resume-thumbnail-image"
                  src={resume.thumbnail}
                  alt=""
                />
                <div className="resume-details">
                  <div className="resume-info">
                    <p
                      className="resume-name"
                      contentEditable="true"
                      onInput={(e) =>
                        handleInputChange(resume, e.target.textContent)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.target.blur();
                        }
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {resume.name}
                    </p>
                    <p className="resume-edit-date">
                      Last Modified: {resume.lastModified}
                    </p>
                  </div>
                  <div className="resume-actions">
                    <button className="delete-resume" type="button">
                      Delete
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
