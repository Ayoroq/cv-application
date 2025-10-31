export default function PersonalInfoForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form className="personal-form form">
      <p className="form-field">
        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          placeholder="First Name"
          value={data.firstname || ""}
          onChange={(e) => handleChange("firstname", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Last Name"
          value={data.lastname || ""}
          onChange={(e) => handleChange("lastname", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="street">Street Address</label>
        <input
          id="street"
          name="street"
          type="text"
          placeholder="Street Address"
          value={data.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="City"
          value={data.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="province">Province</label>
        <input
          id="province"
          name="province"
          type="text"
          placeholder="Province"
          value={data.province || ""}
          onChange={(e) => handleChange("province", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="postalcode">Postal Code</label>
        <input
          id="postalcode"
          name="postalcode"
          type="text"
          placeholder="Postal Code"
          value={data.postalcode || ""}
          onChange={(e) => handleChange("postalcode", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone"
          value={data.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </p>
      
      <p className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </p>
    </form>
  );
}