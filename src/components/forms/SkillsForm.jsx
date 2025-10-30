export default function SkillsForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange({ ...data, skills: value });
  };

  return (
    <form>
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
    </form>
  );
}
