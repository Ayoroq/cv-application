import { useRef, useEffect } from "react";
import previewImage from "../assets/preview.svg"

export default function EditableText({ value, onChange, className = "resume-name" }) {
  const elementRef = useRef(null);
  const cursorPositionRef = useRef(0);

  useEffect(() => {
    if (elementRef.current && document.activeElement === elementRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      const textNode = elementRef.current.firstChild;
      
      if (textNode) {
        const position = Math.min(cursorPositionRef.current, textNode.textContent.length);
        range.setStart(textNode, position);
        range.setEnd(textNode, position);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [value]);

  return (
    <p
      ref={elementRef}
      className={className}
      contentEditable="true"
      onInput={(e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          cursorPositionRef.current = selection.getRangeAt(0).startOffset;
        }
        onChange(e.target.textContent);
      }}
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

function PreviewResumeButton({onClick}){
  return(
    <div className="preview-resume-button-container">
      <button className="preview-resume-button" onClick={onClick}>
        <img src={previewImage} alt="preview" className="preview-resume-button-image" />
      </button>
    </div>
  )
}

export {AddButton, SaveButton, PreviewResumeButton}