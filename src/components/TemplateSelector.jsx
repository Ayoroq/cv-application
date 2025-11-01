import coralTemplateImage from "../templates/previews/coral.png";
import modernTemplateImage from "../templates/previews/modern.png";
import serifTemplateImage from "../templates/previews/serif.png";
import swissTemplateImage from "../templates/previews/swiss.png";
import spearmintTemplateImage from "../templates/previews/spearmint.png";

export default function TemplateSelection() {
  return (
    <div className="template-selection-container">
      <div className="template-word">
        <h1>Choose a Template</h1>
        <p>
          Choose from one of the templates below to get started.
        </p>
      </div>
      <div className="template-selection">
        <img src={coralTemplateImage} alt="Coral Template" className="template-image"/>
        <img src={modernTemplateImage} alt="Modern Template" className="template-image" />
        <img src={serifTemplateImage} alt="Serif Template" className="template-image"/>
        <img src={swissTemplateImage} alt="Swiss Template" className="template-image" />
        <img src={spearmintTemplateImage} alt="Spearmint Template" className="template-image" />
      </div>
    </div>
  );
}