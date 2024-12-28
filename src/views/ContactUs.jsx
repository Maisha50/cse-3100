import React from 'react';

function ContactUs() {
  // Initialize form data state
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to console
  };

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>
      <p>If you have any questions or need further information, please feel free to contact us using the form below. We are here to help you!</p>
      <form>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea className="form-control" name="message" value={formData.message} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;