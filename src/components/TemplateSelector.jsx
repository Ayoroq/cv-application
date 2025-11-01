import coralTemplateImage from "../templates/previews/coral.png";
import modernTemplateImage from "../templates/previews/modern.png";
import serifTemplateImage from "../templates/previews/serif.png";
import swissTemplateImage from "../templates/previews/swiss.png";
import spearmintTemplateImage from "../templates/previews/spearmint.png";

export default function TemplateSelection() {
  const templates = [
    { name: "Coral", image: coralTemplateImage },
    { name: "Modern", image: modernTemplateImage },
    { name: "Serif", image: serifTemplateImage },
    { name: "Swiss", image: swissTemplateImage },
    { name: "Spearmint", image: spearmintTemplateImage },
  ];

  return (
    <div className="template-selection-container">
      <div className="template-word">
        <h1>Choose a Template</h1>
        <p>Choose from one of the templates below to get started.</p>
      </div>

      <div className="template-selection">
        {templates.map((template) => (
          <div key={template.name} className="template-image-container">
            <img
              src={template.image}
              alt={`${template.name} Template`}
              className="template-image"
            />
            <div className="template-image-details">
              <p className="template-name">{template.name}</p>
              <button
                type="button"
                className="preview-image"
                aria-label={`Preview ${template.name} template`}
              >
                &#x1F50D;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}