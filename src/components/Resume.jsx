export default function ResumeRender({ resumes }) {
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
              <p className="resume-name">{resume.name}</p>
              <p className="resume-date">{resume.lastModified}</p>
              <img src={resume.thumbnail} alt="" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}