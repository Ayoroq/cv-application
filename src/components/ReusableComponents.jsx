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

export {AddButton, SaveButton}