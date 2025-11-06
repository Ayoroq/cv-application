import previewImage from "../assets/preview.svg"
export default function EditableText({ value, onChange, className = "resume-name" }) {
  return (
    <p
      className={className}
      contentEditable="true"
      onInput={(e) => onChange(e.target.textContent)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.target.blur();
        }
      }}
      suppressContentEditableWarning={true}
    >
      {value}
    </p>
  );
}


function AddButton({onClick, word}){
  return(
    <div className="add-container">
      <button className="add" type="button" onClick={onClick}>
        {word}
      </button>
      </div>
  )
}

function SaveButton({onClick, word1, word2}){
  return(
    <div className="save-container">
      <button className="save" type="button" onClick={onClick}>
        {word1}
      </button>
      <button className="save" type="button" onClick={onClick}>
        {word2}
      </button>
      </div>
  )
}

function PreviewResumeButton({onClick, word}){
  return(
    <div className="preview-resume-button-container">
      <button className="preview-resume-button" onClick={onClick}>
        <img src={previewImage} alt="preview" className="preview-resume-button-image" />
      </button>
      <p className="preview-resume-button-word">{word}</p>
    </div>
  )
}

export {AddButton, SaveButton, PreviewResumeButton}