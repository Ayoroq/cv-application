import lineImg from './images/modern-resume-image1.png';

export default function ModernTemplate({ data }) {
  return (
    <div className="modern-resume">
      <div className="modern-header">
        <p className="modern-address">{data.street}</p>
        <p className="modern-city">{data.city}, {data.province} {data.postalcode}</p>
        <p className="modern-phone">{data.phone}</p>
        <p className="modern-email">{data.email}</p>
        <h1 className="modern-name">{data.firstname} {data.lastname}</h1>
        <img src={lineImg} alt="divider" className="modern-divider" />
      </div>

      <h1 className="modern-section-title">SKILLS</h1>
      <p className="modern-skills">{data.skills}</p>

      <h1 className="modern-section-title">EXPERIENCE</h1>
      {data.experience.map((exp, i) => (
        <div key={i} className="modern-experience">
          <h2 className="modern-company">{exp.company}, {exp.location} — {exp.role}</h2>
          <p className="modern-date">{exp.start} - {exp.end}</p>
          <ul className="modern-duties">
            {exp.duties.map((duty, j) => (
              <li key={j}>{duty}</li>
            ))}
          </ul>
        </div>
      ))}

      <h1 className="modern-section-title">EDUCATION</h1>
      {data.education.map((edu, i) => (
        <div key={i} className="modern-education">
          <h2 className="modern-school">{edu.school}, {edu.location} — {edu.degree}</h2>
          <p className="modern-date">{edu.start} - {edu.end}, {edu.location}</p>
          <p className="modern-description">{edu.description}</p>
        </div>
      ))}

      <h1 className="modern-section-title">AWARDS</h1>
      {data.awards.split('.').map((award, i) => (
        <p key={i} className="modern-award">
          {award}
        </p>
      ))}
    </div>
  );
}