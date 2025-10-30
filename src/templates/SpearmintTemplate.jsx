import lineImg from './images/spearmint-resume-image1.png';

export default function SpearmintTemplate({ data }) {
  return (
    <div className="spearmint-resume">
      <div className="spearmint-header">
        <img src={lineImg} alt="divider" className="spearmint-divider" />
        <h1 className="spearmint-name">{data.firstname} {data.lastname}</h1>
        <p className="spearmint-title">{data.title}</p>
        <p className="spearmint-contact">{data.street}</p>
        <p className="spearmint-contact">{data.city}, {data.state} {data.postalcode}</p>
        <p className="spearmint-contact">{data.phone}</p>
        <p className="spearmint-contact">{data.email}</p>
      </div>

      <h1 className="spearmint-section-title">SKILLS</h1>
      <p className="spearmint-skills">{data.skills}</p>

      <h1 className="spearmint-section-title">EXPERIENCE</h1>
      {data.experience.map((exp, i) => (
        <div key={i} className="spearmint-experience">
          <h2 className="spearmint-company">{exp.company}, {exp.location} - {exp.role}</h2>
          <p className="spearmint-date">{exp.start} - {exp.end}</p>
          <ul className="spearmint-duties">
            {exp.duties.map((duty, j) => (
              <li key={j}>{duty}</li>
            ))}
          </ul>
        </div>
      ))}

      <h1 className="spearmint-section-title">EDUCATION</h1>
      {data.education.map((edu, i) => (
        <div key={i} className="spearmint-education">
          <h2 className="spearmint-school">{edu.school}, {edu.location} - {edu.degree}</h2>
          <p className="spearmint-date">{edu.start} - {edu.end}</p>
          <p className="spearmint-description">{edu.description}</p>
        </div>
      ))}

      <h1 className="spearmint-section-title">AWARDS</h1>
      <p className="spearmint-awards">{data.awards}</p>
    </div>
  );
}