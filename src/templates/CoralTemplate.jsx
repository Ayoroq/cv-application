export default function CoralTemplate({ data }) {
  return (
    <div className="coral-resume">
      <div className="coral-header">
        <p className="coral-greeting">Hello</p>
        <p className="coral-name">I'm {data.name}</p>
        <p className="coral-address">{data.address}</p>
        <p className="coral-city">{data.city}</p>
        <p className="coral-phone">{data.phone}</p>
        <p className="coral-email">{data.email}</p>
      </div>

      <h1 className="coral-section-title">Skills</h1>
      <p className="coral-skills">{data.skills}</p>

      <h1 className="coral-section-title">Experience</h1>
      {data.experience.map((exp, i) => (
        <div key={i} className="coral-experience">
          <h2 className="coral-date">{exp.start} - {exp.end}</h2>
          <h3 className="coral-company">{exp.company}, {exp.location} - {exp.role}</h3>
          <ul className="coral-duties">
            {exp.duties.map((duty, j) => (
              <li key={j}>{duty}</li>
            ))}
          </ul>
        </div>
      ))}

      <h1 className="coral-section-title">Education</h1>
      {data.education.map((edu, i) => (
        <div key={i} className="coral-education">
          <h2 className="coral-date">{edu.start} - {edu.end}</h2>
          <h3 className="coral-school">{edu.school}, {edu.location} - {edu.degree}</h3>
          <p className="coral-description">{edu.description}</p>
        </div>
      ))}

      <h1 className="coral-section-title">Awards</h1>
      <p className="coral-awards">{data.awards}</p>
    </div>
  );
}