import lineImg from './images/swiss-resume-image1.png';

export default function SwissTemplate({ data }) {
  return (
    <div className="swiss-resume">
      <table className="swiss-table">
        <tbody>
          <tr className="swiss-header-row">
            <td className="swiss-header-left">
              <h1 className="swiss-name">{data.firstname} {data.lastname}</h1>
              <p className="swiss-title">{data.title}</p>
            </td>
            <td className="swiss-header-right">
              <img src={lineImg} alt="line" className="swiss-divider" />
              <h1 className="swiss-contact-name">{data.firstname} {data.lastname}</h1>
              <p className="swiss-contact">{data.street}</p>
              <p className="swiss-contact">{data.city}, {data.province} {data.postalcode}</p>
              <p className="swiss-phone">{data.phone}</p>
              <p className="swiss-email">{data.email}</p>
            </td>
          </tr>

          <tr className="swiss-skills-row">
            <td className="swiss-section-left">
              <p className="swiss-icon">◉</p>
              <h1 className="swiss-section-title">Skills</h1>
            </td>
            <td className="swiss-section-right">
              <img src={lineImg} alt="line" className="swiss-divider" />
              <p className="swiss-skills">{data.skills}</p>
            </td>
          </tr>

          <tr className="swiss-experience-row">
            <td className="swiss-section-left">
              <p className="swiss-icon">◉</p>
              <h1 className="swiss-section-title">Experience</h1>
            </td>
            <td className="swiss-section-right">
              <img src={lineImg} alt="line" className="swiss-divider" />
              {data.experience.map((exp, i) => (
                <div key={i} className="swiss-experience">
                  <h2 className="swiss-company">{exp.company} / {exp.role}</h2>
                  <h3 className="swiss-date">{exp.start} - {exp.end}, {exp.location}</h3>
                  <p className="swiss-description">{exp.duties}</p>
                </div>
              ))}
            </td>
          </tr>

          <tr className="swiss-education-row">
            <td className="swiss-section-left">
              <p className="swiss-icon">◉</p>
              <h1 className="swiss-section-title">Education</h1>
            </td>
            <td className="swiss-section-right">
              <img src={lineImg} alt="line" className="swiss-divider" />
              {data.education.map((edu, i) => (
                <div key={i} className="swiss-education">
                  <h2 className="swiss-school">{edu.school} / {edu.degree}</h2>
                  <h3 className="swiss-date">{edu.start} - {edu.end}, {edu.location}</h3>
                  <p className="swiss-description">{edu.description}</p>
                </div>
              ))}
            </td>
          </tr>

          <tr className="swiss-awards-row">
            <td className="swiss-section-left">
              <p className="swiss-icon">◉</p>
              <h1 className="swiss-section-title">Awards</h1>
            </td>
            <td className="swiss-section-right">
              <img src={lineImg} alt="line" className="swiss-divider" />
              <p className="swiss-awards">{data.awards}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}