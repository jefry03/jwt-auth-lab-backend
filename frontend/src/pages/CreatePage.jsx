import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { createEntry } from "../services/entriesService";
import { useNavigate } from "react-router";
function CreatePage() {
  const [formData, setFormData] = useState({ title: "", entryBody:"", isPublic: false });
  const navigate = useNavigate()
  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createEntry(formData)
    navigate('/my-entries')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label> title:</label>
        <input name="title"
         value={formData.title}
         id="title"
          onChange={handleChange}
           required />
     
      <label> Entry     </label>
        <input 
        name="entryBody"
         value={formData.entryBody} 
         onChange={handleChange}
         id="entryBody"

          required />

      <label>  Public:</label>
        <input
          type="checkbox"
          name="isPublic"
         id="isPublic"

          checked={formData.isPublic}
          onChange={handleChange}
        />

      <button type="submit">Create entry</button>
    </form>
  );
}
export default CreatePage