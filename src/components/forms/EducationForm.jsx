import { useState } from "react";
export default function EducationForm({ data, onChange }) {
  const [isEditing, setIsEditing] = useState(true);

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

  const deleteEducation = (id) => {
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
    <>
      {data.education.length === 0 ? (
        <div className="no-value-container">
          <p className="no-value-text">
            You haven't added any education details yet.
            <br />
            <br />
            Click the button below to create your first entry and start building
            your academic history.
          </p>
          <button type="button" onClick={addEducation}>
            Add Education
          </button>
        </div>
      ) : (
        data.education.map((edu) => {
          return (
            <div key={edu.id} className="education-item">
              <h2>
                {edu.degree},<span>{edu.school}</span>
              </h2>
              <button type="button" onClick={() => deleteEducation(edu.id)}>
                Delete
              </button>
            </div>
          );
        })
      )}
    </>
  );
}
