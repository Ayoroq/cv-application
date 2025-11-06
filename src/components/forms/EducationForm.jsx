import { useState } from "react";
import deleteImg from "../../assets/delete.svg";
import { AddButton, SaveButton } from "../ReusableComponents.jsx";
import { useDragAndDrop } from "../../utils/dragAndDrop.js";
export default function EducationForm({ data, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  let edu = data.education.find((item) => item.id === editItemId);

  const handleReorder = (draggedIndex, placeholderIndex) => {
    const newEducation = [...data.education];
    const [movedItem] = newEducation.splice(draggedIndex, 1);
    newEducation.splice(placeholderIndex, 0, movedItem);
    onChange({ ...data, education: newEducation });
  };

  const { dragStart, dragOver, dragLeave, drop, dragEnd } = useDragAndDrop(
    ".entry-summary-container",
    handleReorder
  );

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
    setIsEditing(true);
    setEditItemId(newEducation.id);
  };

  const saveEducation = () => {
    setIsEditing(false);
    setEditItemId(null);
  };

  function editEducation(id) {
    setIsEditing(true);
    setEditItemId(id);
  }

  const deleteEducation = (id) => {
    setIsEditing(false);
    setEditItemId(null);
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
        </div>
      ) : (
        !isEditing && (
          <ul className="entry-summary-container" onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
            {data.education.map((edu, index) => (
              <li
                key={edu.id}
                className="entry-summary"
                onClick={() => editEducation(edu.id)}
                draggable={true}
                data-index={index}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnd={dragEnd}
              >
                <h2 className="item">
                  {edu.degree || "New Entry"}
                  {edu.school && <span>, {edu.school}</span>}
                </h2>
                <button
                  type="button"
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEducation(edu.id, false);
                  }}
                >
                  <img
                    src={deleteImg}
                    alt="Delete Resume"
                    className="delete-resume-image"
                  />
                </button>
              </li>
            ))}
          </ul>
        )
      )}

      {isEditing && edu && (
        <form className="education-form form">
          <div key={edu.id} className="education-item">
            <p className="form-field">
              <label htmlFor={`degree-${edu.id}`}>Degree</label>
              <input
                id={`degree-${edu.id}`}
                name={`degree-${edu.id}`}
                type="text"
                placeholder="Degree"
                value={edu.degree || ""}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`school-${edu.id}`}>School</label>
              <input
                id={`school-${edu.id}`}
                name={`school-${edu.id}`}
                type="text"
                placeholder="School Name"
                value={edu.school || ""}
                onChange={(e) =>
                  updateEducation(edu.id, "school", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`start-${edu.id}`}>Start Date</label>
              <input
                id={`start-${edu.id}`}
                name={`start-${edu.id}`}
                type="date"
                placeholder="Start Date"
                value={edu.start || ""}
                onChange={(e) =>
                  updateEducation(edu.id, "start", e.target.value)
                }
              />
            </p>

            <p className="form-field">
              <label htmlFor={`end-${edu.id}`}>End Date</label>
              <input
                id={`end-${edu.id}`}
                name={`end-${edu.id}`}
                type="date"
                placeholder="End Date"
                value={edu.end || ""}
                onChange={(e) => updateEducation(edu.id, "end", e.target.value)}
              />
            </p>

            <p className="form-field">
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
            </p>

            <p className="form-field">
              <label htmlFor={`description-${edu.id}`}>Description</label>
              <textarea
                id={`description-${edu.id}`}
                name={`description-${edu.id}`}
                placeholder="Enter each description on a new line"
                value={edu.description || ""}
                onChange={(e) =>
                  updateEducation(edu.id, "description", e.target.value)
                }
                rows={3}
              />
            </p>

            <SaveButton onClick={saveEducation} word1="Close" word2="Save" />
          </div>
        </form>
      )}

      {!isEditing && <AddButton onClick={addEducation} word="Add Education" />}
    </>
  );
}
