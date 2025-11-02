export default function SerifTemplate({ data }) {
  return (
    <div className="serif-resume">
      <table className="serif-table">
        <tbody>
          <tr className="serif-header-row">
            <td className="serif-header-left">
              <h1 className="serif-name">
                {data.firstname} {data.lastname}
              </h1>
              <p className="serif-tagline">{data.tagline}</p>
            </td>
            <td className="serif-header-right">
              <p className="serif-contact">{data.street}</p>
              <p className="serif-contact">
                {data.city}, {data.province} {data.postalcode}
              </p>
              <p className="serif-contact serif-phone">{data.phone}</p>
              <p className="serif-contact serif-email">{data.email}</p>
            </td>
          </tr>
          <tr className="serif-content-row">
            <td className="serif-content-left">
              <h1 className="serif-section-title">EXPERIENCE</h1>
              {data.experience.map((exp, i) => (
                <div key={i} className="serif-experience">
                  <h2 className="serif-company">
                    {exp.company}, {exp.location} — {exp.role}
                  </h2>
                  <h3 className="serif-date">
                    {exp.start} - {exp.end}
                  </h3>
                  <p className="serif-description">{exp.duties}</p>
                </div>
              ))}

              <h1 className="serif-section-title">EDUCATION</h1>
              {data.education.map((edu, i) => (
                <div key={i} className="serif-education">
                  <h2 className="serif-school">
                    {edu.school}, {edu.location} — {edu.degree}
                  </h2>
                  <h3 className="serif-date">
                    {edu.start} - {edu.end}
                  </h3>
                  <p className="serif-description">{edu.description}</p>
                </div>
              ))}

              {data.projects && (
                <>
                  <h1 className="serif-section-title">PROJECTS</h1>
                  {data.projects?.map((project, i) => (
                    <div key={i} className="serif-project">
                      <h2 className="serif-project-name">
                        {project.name} — {project.detail}
                      </h2>
                      <p className="serif-description">{project.description}</p>
                    </div>
                  ))}
                </>
              )}
            </td>
            <td className="serif-content-right">
              <h1 className="serif-section-title">SKILLS</h1>
              <ul className="serif-skills">
                {data.skills.split(', ').map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>

              <h1 className="serif-section-title">AWARDS</h1>
              <div className="serif-awards">
                {data.awards.map((award, i) => (
                  <p key={i} className="serif-award">
                    {award}
                  </p>
                ))}
              </div>
              {data.languages && (
                <>
                  <h1 className="serif-section-title">LANGUAGES</h1>
                  <p className="serif-languages">{data.languages}</p>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}