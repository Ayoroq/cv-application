export default function ExperienceForm({ data, onChange }) {
  const addExperience = () => {
    const newExperience = {
      id: crypto.randomUUID(),
      company: "",
      location: "",
      role: "",
      start: "",
      end: "",
      duties: [],
    };

    onChange({
      ...data,
      experience: [...data.experience, newExperience],
    });
  };

  const removeExperience = (id) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (id, field, value) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const updateDuties = (id, duties) => {
    const dutiesArray = duties.split("\n").filter((duty) => duty.trim() !== "");
    updateExperience(id, "duties", dutiesArray);
  };

  return (
    <>
      <form className="experience-form form">
        {data.experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <p className="form-field">
              <label htmlFor={`company-${exp.id}`}>Company</label>
              <input
                id={`company-${exp.id}`}
                name={`company-${exp.id}`}
                type="text"
                placeholder="Company Name"
                value={exp.company || ""}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`location-${exp.id}`}>Location</label>
              <input
                id={`location-${exp.id}`}
                name={`location-${exp.id}`}
                type="text"
                placeholder="Location"
                value={exp.location || ""}
                onChange={(e) =>
                  updateExperience(exp.id, "location", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`role-${exp.id}`}>Role</label>
              <input
                id={`role-${exp.id}`}
                name={`role-${exp.id}`}
                type="text"
                placeholder="Job Title"
                value={exp.role || ""}
                onChange={(e) =>
                  updateExperience(exp.id, "role", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`start-${exp.id}`}>Start Date</label>
              <input
                id={`start-${exp.id}`}
                name={`start-${exp.id}`}
                type="date"
                placeholder="Start Date"
                value={exp.start || ""}
                onChange={(e) =>
                  updateExperience(exp.id, "start", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`end-${exp.id}`}>End Date</label>
              <input
                id={`end-${exp.id}`}
                name={`end-${exp.id}`}
                type="date"
                placeholder="End Date"
                value={exp.end || ""}
                onChange={(e) =>
                  updateExperience(exp.id, "end", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`duties-${exp.id}`}>Duties</label>
              <textarea
                id={`duties-${exp.id}`}
                name={`duties-${exp.id}`}
                placeholder="Enter each duty on a new line"
                value={exp.duties?.join("\n") || ""}
                onChange={(e) => updateDuties(exp.id, e.target.value)}
                rows={4}
              />
            </p>

            <button type="button" onClick={() => removeExperience(exp.id)}>
              Remove Experience
            </button>
          </div>
        ))}
      </form>
      <button type="button" onClick={addExperience}>
        Add Experience
      </button>
    </>
  );
}
