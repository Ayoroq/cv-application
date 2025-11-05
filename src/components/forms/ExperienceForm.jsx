import { useState } from "react";
import deleteImg from "../../assets/delete.svg";
import { AddButton, SaveButton } from "../ReusableComponents.jsx";

export default function ExperienceForm({ data, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  let exp = data.experience.find((item) => item.id === editItemId);

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
    setIsEditing(true);
    setEditItemId(newExperience.id);
  };

  const saveExperience = () => {
    setIsEditing(false);
  };

  function editExperience(id) {
    setIsEditing(true);
    setEditItemId(id);
  }

  const deleteExperience = (id) => {
    setIsEditing(false);
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
    const dutiesArray = duties.split("\n");
    updateExperience(id, "duties", dutiesArray);
  };

  return (
    <>
      {data.experience.length === 0 ? (
        <div className="no-value-container">
          <p className="no-value-text">
            You haven't added any work experience yet.
            <br />
            <br />
            Click the button below to create your first entry and start building
            your professional history.
          </p>
        </div>
      ) : (
        !isEditing && (
          <div className="entry-summary-container">
            {data.experience.map((item) => (
              <div
                key={item.id}
                className="entry-summary"
                onClick={() => editExperience(item.id)}
              >
                <h2 className="item">
                  {item.role || "New Entry"}
                  {item.company && <span>, {item.company}</span>}
                </h2>
                <button
                  type="button"
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteExperience(item.id);
                  }}
                >
                  <img
                    src={deleteImg}
                    alt="Delete Resume"
                    className="delete-resume-image"
                  />
                </button>
              </div>
            ))}
          </div>
        )
      )}

      {isEditing && exp && (
        <form className="experience-form form">
          <div key={exp.id} className="experience-item">
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

            <SaveButton onClick={saveExperience} word1="Close" word2="Save" />
          </div>
        </form>
      )}

      {!isEditing && (
        <AddButton onClick={addExperience} word="Add Experience" />
      )}
    </>
  );
}
