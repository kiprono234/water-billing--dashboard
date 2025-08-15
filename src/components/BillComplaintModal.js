import React, { useState } from "react";
import "./BillComplaintModal.scss";

export default function BillComplaintModal({ show, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    complaint: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!show) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email && form.complaint) {
      onSubmit(form);
      setSubmitted(true);
      setTimeout(onClose, 2000); // Auto close after submit
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Bill Complaint Form</h2>
        {submitted ? (
          <div className="modal-success">Complaint submitted! Thank you.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Complaint:
              <textarea name="complaint" value={form.complaint} onChange={handleChange} required />
            </label>
            <button type="submit" className="modal-submit">Submit Complaint</button>
          </form>
        )}
      </div>
    </div>
  );
}