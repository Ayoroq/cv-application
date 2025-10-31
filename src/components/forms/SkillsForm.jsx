export default function SkillsForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange({ ...data, skills: value });
  };

  return (
    <form className="skills-form form">
      <p className="form-field">
        <label htmlFor="skills">Skills</label>
        <textarea
          id="skills"
          name="skills"
          placeholder="List your skills here..."
          value={data.skills || ""}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
        />
        <small className="helper-text">
          Separate skills with commas (e.g., React, Node.js, AWS)
        </small>
      </p>
    </form>
  );
}
