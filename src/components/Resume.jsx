export default function ResumeRender(props) {
  return (
    <div className="resume-container">
      <h2>Recent Resume</h2>
      {!props.resume && (
        <div className="no-resume">
          <p className="no-resume-text">You currently do not have any resume.</p>
        </div>
      )}
    </div>
  );
}
