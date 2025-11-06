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

  function dragStart(e, index) {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("dragging");
    e.target.id = "dragged-entry";
  }

  function dragOver(e) {
    const draggedElement = document.getElementById("dragged-entry");
    if (draggedElement && draggedElement.classList.contains("entry-summary")) {
      e.preventDefault();
      movePlaceholder(e);
    }
  }

  function dragLeave(e) {
    const container = e.currentTarget;
    if (container.contains(e.relatedTarget)) return;
    const placeholder = container.querySelector(".placeholder");
    placeholder?.remove();
  }

  function drop(e) {
    e.preventDefault();
    const draggedEntry = document.getElementById("dragged-entry");
    const placeholder = e.currentTarget.querySelector(".placeholder");
    if (!placeholder || !draggedEntry) return;
    
    const draggedIndex = parseInt(e.dataTransfer.getData("index"));
    const placeholderIndex = Array.from(e.currentTarget.children).indexOf(placeholder);
    
    const newExperience = [...data.experience];
    const [movedItem] = newExperience.splice(draggedIndex, 1);
    newExperience.splice(placeholderIndex, 0, movedItem);
    
    onChange({ ...data, experience: newExperience });
    placeholder.remove();
  }

  function dragEnd(e) {
    e.preventDefault();
    setIsEditing(false);
    e.target.removeAttribute("id");
    e.target.classList.remove("dragging");
  }

  function makePlaceholder(draggedEntry) {
    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");
    placeholder.style.height = `${draggedEntry.offsetHeight}px`;
    return placeholder;
  }

  function movePlaceholder(event) {
    const draggedEntry = document.getElementById("dragged-entry");
    const existingPlaceholder = document.querySelector(".placeholder");
    const container = document.querySelector(".entry-summary-container");

    if (existingPlaceholder) {
      const placeholderRect = existingPlaceholder.getBoundingClientRect();
      if (
        placeholderRect.top <= event.clientY &&
        placeholderRect.bottom >= event.clientY
      ) {
        return;
      }
    }

    for(const summary of container.children){
      if (summary === draggedEntry) continue;
      const summaryRect = summary.getBoundingClientRect();
      if (summaryRect.bottom >= event.clientY) {
        existingPlaceholder?.remove();
        const placeholder = makePlaceholder(draggedEntry);
        container.insertBefore(placeholder, summary);
        return;
      }
    }
    
    existingPlaceholder?.remove();
    container.appendChild(makePlaceholder(draggedEntry));
  }

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
          <ul className="entry-summary-container" onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
            {data.experience.map((item, index) => (
              <li
                key={item.id}
                className="entry-summary"
                onClick={() => editExperience(item.id)}
                draggable={true}
                data-index={index}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnd={dragEnd}
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
              </li>
            ))}
          </ul>
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
