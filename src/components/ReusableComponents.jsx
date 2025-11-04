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