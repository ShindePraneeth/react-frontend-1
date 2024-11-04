import React, { useState } from 'react';
import Header from './Header';
import '../styles/contact.css';
 
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Get the authentication token from localStorage
    const token = localStorage.getItem('token');
   
    if (!token) {
      setStatus('Please log in to send a message.');
      return;
    }
 
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the authentication token
        },
        body: JSON.stringify(formData),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus(`Failed to send message: ${error.message}`);
    }
  };
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
    <div className="contact-page-wrapper">
      <Header />
      <div className="contact-main-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form-container">
          <div className="contact-form-group">
            <label className="contact-form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
         
          <div className="contact-form-group">
            <label className="contact-form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
         
          <div className="contact-form-group">
            <label className="contact-form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="contact-form-textarea"
              required
            />
          </div>
         
          <button type="submit" className="contact-submit-button">
            Send Message
          </button>
        </form>
       
        {status && (
          <div className={`contact-status-message ${
            status.includes('Failed') ? 'contact-status-error' : 'contact-status-success'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Contact;