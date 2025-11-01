import coralTemplateImage from '../templates/previews/coral.png'
import modernTemplateImage from '../templates/previews/modern.png'
import serifTemplateImage from '../templates/previews/serif.png';
import swissTemplateImage from '../templates/previews/swiss.png'
import spearmintTemplateImage from '../templates/previews/spearmint.png';


export default function TemplateSelection() {
    return (
        <div className="template-selection">
            <img src={coralTemplateImage} alt="Coral Template" />
            <img src={modernTemplateImage} alt="Modern Template" />
            <img src={serifTemplateImage} alt="Serif Template" />
            <img src={swissTemplateImage} alt="Swiss Template" />
            <img src={spearmintTemplateImage} alt="Spearmint Template" />
        </div>
    )
}