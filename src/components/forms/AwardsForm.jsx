export default function AwardsForm({ data, onChange }) {
  const handleChange = (value) => {
    onChange({ ...data, awards: value });
  };

  return (
    <form>
      <label htmlFor="awards">Awards</label>
      <textarea
        id="awards"
        name="awards"
        placeholder="List your awards here..."
        value={data.awards || ""}
        onChange={(e) => handleChange(e.target.value)}
        rows={3}
      />
      <small className="helper-text">
        Separate awards with commas (e.g., Dean's List, Employee of the Month)
      </small>
    </form>
  );
}