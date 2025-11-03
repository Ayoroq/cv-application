export default function ResumeRender({ resumes, onInput, onDelete }) {
  
  function handleDelete(id) {
    onDelete(id);
  }

  function handleInputChange(resume,value){
    onInput({...resume, name: value})
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
          <h1>There is resume here</h1>
          {resumes.map((resume) => (
            <div key={resume.id} className="resume-card">
              <p 
                className="resume-name" 
                contentEditable="true"
                onInput={(e) => handleInputChange(resume, e.target.textContent)}
                suppressContentEditableWarning={true}
              >
                {resume.name}
              </p>
              <img className="resume-thumbnail-image" src={resume.thumbnail} alt=""/>
            </div>
          ))}
        </>
      )}
    </div>
  );
}