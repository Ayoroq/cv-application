export default function EducationForm({ data, onChange }) {
  const addEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      school: "",
      location: "",
      degree: "",
      start: "",
      end: "",
      description: "",
    };

    onChange({
      ...data,
      education: [...data.education, newEducation],
    });
  };

  const removeEducation = (id) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id, field, value) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  return (
    <div>
      <h3>Education</h3>
      {data.education.map((edu) => (
        <div key={edu.id} className="education-item">
          <label htmlFor={`school-${edu.id}`}>School</label>
          <input
            id={`school-${edu.id}`}
            name={`school-${edu.id}`}
            type="text"
            placeholder="School Name"
            value={edu.school || ""}
            onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
          />

          <label htmlFor={`location-${edu.id}`}>Location</label>
          <input
            id={`location-${edu.id}`}
            name={`location-${edu.id}`}
            type="text"
            placeholder="Location"
            value={edu.location || ""}
            onChange={(e) =>
              updateEducation(edu.id, "location", e.target.value)
            }
          />

          <label htmlFor={`degree-${edu.id}`}>Degree</label>
          <input
            id={`degree-${edu.id}`}
            name={`degree-${edu.id}`}
            type="text"
            placeholder="Degree"
            value={edu.degree || ""}
            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
          />

          <label htmlFor={`start-${edu.id}`}>Start Date</label>
          <input
            id={`start-${edu.id}`}
            name={`start-${edu.id}`}
            type="text"
            placeholder="Start Date"
            value={edu.start || ""}
            onChange={(e) => updateEducation(edu.id, "start", e.target.value)}
          />

          <label htmlFor={`end-${edu.id}`}>End Date</label>
          <input
            id={`end-${edu.id}`}
            name={`end-${edu.id}`}
            type="text"
            placeholder="End Date"
            value={edu.end || ""}
            onChange={(e) => updateEducation(edu.id, "end", e.target.value)}
          />

          <label htmlFor={`description-${edu.id}`}>Description</label>
          <textarea
            id={`description-${edu.id}`}
            name={`description-${edu.id}`}
            placeholder="Description"
            value={edu.description || ""}
            onChange={(e) =>
              updateEducation(edu.id, "description", e.target.value)
            }
          />

          <button type="button" onClick={() => removeEducation(edu.id)}>
            Remove Education
          </button>
        </div>
      ))}

      <button type="button" onClick={addEducation}>
        Add Education
      </button>
    </div>
  );
}