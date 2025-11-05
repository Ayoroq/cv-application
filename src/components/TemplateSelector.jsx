import coralTemplateImage from "../templates/previews/coral.png";
import modernTemplateImage from "../templates/previews/modern.png";
import serifTemplateImage from "../templates/previews/serif.png";
import swissTemplateImage from "../templates/previews/swiss.png";
import spearmintTemplateImage from "../templates/previews/spearmint.png";


export default function TemplateSelection({onSelectTemplate, resumes}) {
  const templates = [
    { name: "Coral", image: coralTemplateImage },
    { name: "Modern", image: modernTemplateImage },
    { name: "Serif", image: serifTemplateImage },
    { name: "Swiss", image: swissTemplateImage },
    { name: "Spearmint", image: spearmintTemplateImage },
  ];

  function togglePreview(templateName) {
    const dialog = document.querySelector('.preview-template');
    const template = templates.find((t) => t.name === templateName);
    if (dialog && template) {
      dialog.innerHTML = `<img src="${template.image}" alt="${templateName} Template" />`;
      dialog.showModal();
    }
  }

  function closeDialog(e) {
    e.currentTarget.close();
  }

  return (
    <div className="template-selection-container">
      <div className="template-word">
        <h1>Select a Resume Template</h1>
        {resumes.length > 0 && <p>Or pick one of your previously created resumes above.</p>}
        {resumes.length === 0 && <p>Start by selecting one of the templates below to create your resume.</p>}
      </div>

      <div className="template-selection">
        {templates.map((template) => (
          <div key={template.name} className="template-image-container">
            <img
              src={template.image}
              alt={`${template.name} Template`}
              className="template-image"
              onClick={() => onSelectTemplate(template.name)}
            />
            <div className="template-image-details">
              <p className="template-name">{template.name}</p>
              <button
                type="button"
                className="preview-image"
                aria-label={`Preview ${template.name} template`}
                onClick={() => togglePreview(template.name)}
              >
                &#x1F50D;
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog className="preview-template" onClick={closeDialog}>

      </dialog>
    </div>
  );
}

function TemplateSelectionDropdown({onChangeTemplate, selectedTemplate}){
  const allTemplates = ["Coral", "Modern", "Serif", "Swiss", "Spearmint"];
  const otherTemplates = allTemplates.filter(template => template !== selectedTemplate);
  
  return (
    <div className="template-selection-dropdown">
      <p className="template-word">Change Template</p>
      <select onChange={onChangeTemplate} className="template-dropdown" aria-label="Select a template">
        <option value={selectedTemplate}>{selectedTemplate}</option>
        {otherTemplates.map(template => (
          <option key={template} value={template}>{template}</option>
        ))}
      </select>
    </div>
  );
}

export {TemplateSelectionDropdown};