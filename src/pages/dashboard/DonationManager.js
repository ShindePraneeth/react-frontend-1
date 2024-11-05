import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Header from './Header';
import '../styles/donation-manager.css';
 
const DonationManager = () => {
  const [formData, setFormData] = useState({
    foodItem: '',
    quantity: '',
    location: '',
    expiryTime: '',
    contactPhone: '',
    servingSize: '',
    dietaryInfo: '',
    storageInstructions: '',
    area: ''
  });
  const [notification, setNotification] = useState(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const userType = localStorage.getItem('userType');
 
  // Define the Indian capital cities with their variants
  const INDIAN_CAPITAL_CITIES = {
    'New Delhi': ['Delhi', 'New Delhi', 'NCR'],
    'Mumbai': ['Mumbai', 'Bombay'],
    'Bangalore': ['Bangalore', 'Bengaluru'],
    'Chennai': ['Chennai', 'Madras'],
    'Hyderabad': ['Hyderabad', 'Secunderabad'],
    'Kolkata': ['Kolkata', 'Calcutta'],
    'Lucknow': ['Lucknow'],
    'Jaipur': ['Jaipur'],
    'Bhopal': ['Bhopal'],
    'Chandigarh': ['Chandigarh']
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleCitySelect = (city) => {
    setFormData((prev) => ({
      ...prev,
      area: city
    }));
    setShowCityDropdown(false);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification({
          type: 'error',
          message: 'Please login first'
        });
        return;
      }
 
      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          foodItem: formData.foodItem,
          quantity: formData.quantity,
          location: formData.location,
          expiryTime: formData.expiryTime,
          donorPhone: formData.contactPhone,
          servingSize: formData.servingSize,
          dietaryInfo: formData.dietaryInfo,
          storageInstructions: formData.storageInstructions,
          area: formData.area
        })
      });
 
      const result = await response.json();
     
      if (result.success) {
        setNotification({
          type: 'success',
          message: userType === 'ngo'
            ? 'Donation posted successfully! Other NGOs will be able to claim this donation.'
            : 'Donation posted successfully! NGOs in the area will be notified.'
        });
 
        setFormData({
          foodItem: '',
          quantity: '',
          location: '',
          expiryTime: '',
          contactPhone: '',
          servingSize: '',
          dietaryInfo: '',
          storageInstructions: '',
          area: ''
        });
      } else {
        throw new Error(result.message || 'Failed to post donation');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Failed to post donation. Please try again.'
      });
    }
  };
 
  return (
    <div className="donate-page-wrapper">
      <Header />
      <div className="donate-main-container">
        <div className="donate-header">
          <h1 className="donate-heading">
            {userType === 'ngo' ? 'Share Available Food' : 'Donate Food'}
          </h1>
          <p className="donate-subheading">
            {userType === 'ngo'
              ? 'Share excess food with other NGOs to maximize impact'
              : 'Help reduce food waste by donating excess food'
            }
          </p>
        </div>
 
        <form onSubmit={handleSubmit} className="donate-form-container">
          <div className="donate-form-grid">
            <div className="donate-form-group">
              <label className="donate-form-label">Food Item</label>
              <input
                type="text"
                name="foodItem"
                value={formData.foodItem}
                onChange={handleInputChange}
                placeholder="What food items are you sharing?"
                className="donate-form-input"
                required
              />
            </div>
 
            <div className="donate-form-group">
              <label className="donate-form-label">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="How many servings/portions?"
                className="donate-form-input"
                required
              />
            </div>
 
            <div className="donate-form-group">
              <label className="donate-form-label">City</label>
              <div className="donate-form-input-wrapper">
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  onFocus={() => setShowCityDropdown(true)}
                  placeholder="Select a city"
                  className="donate-form-input"
                  required
                />
                <Search className="donate-form-search-icon" size={20} />
               
                {showCityDropdown && (
                  <div className="donate-city-dropdown">
                    {Object.keys(INDIAN_CAPITAL_CITIES).map((city) => (
                      <div
                        key={city}
                        className="donate-city-option"
                        onClick={() => handleCitySelect(city)}
                      >
                        <div className="donate-city-name">{city}</div>
                        <div className="donate-city-variants">
                          {INDIAN_CAPITAL_CITIES[city].join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
 
            <div className="donate-form-group">
              <label className="donate-form-label">Pickup Area</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Address for pickup"
                className="donate-form-input"
                required
              />
            </div>
 
            <div className="donate-form-group">
              <label className="donate-form-label">Best Before Time</label>
              <input
                type="datetime-local"
                name="expiryTime"
                value={formData.expiryTime}
                onChange={handleInputChange}
                className="donate-form-input"
                required
              />
            </div>
 
            <div className="donate-form-group">
              <label className="donate-form-label">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="Your contact number"
                className="donate-form-input"
                required
              />
            </div>
          </div>
 
          <div className="donate-form-group">
            <label className="donate-form-label">Serving Size</label>
            <input
              type="text"
              name="servingSize"
              value={formData.servingSize}
              onChange={handleInputChange}
              placeholder="e.g., Serves 50 people"
              className="donate-form-input"
              required
            />
          </div>
 
          <div className="donate-form-group">
            <label className="donate-form-label">Storage Instructions</label>
            <textarea
              name="storageInstructions"
              value={formData.storageInstructions}
              onChange={handleInputChange}
              placeholder="Any special storage or handling instructions?"
              className="donate-form-textarea"
              rows="2"
            />
          </div>
 
          <div className="donate-form-group">
            <label className="donate-form-label">Dietary Information</label>
            <textarea
              name="dietaryInfo"
              value={formData.dietaryInfo}
              onChange={handleInputChange}
              placeholder="Any allergens or dietary information? (vegetarian, contains nuts, etc.)"
              className="donate-form-textarea"
              rows="2"
            />
          </div>
 
          <button type="submit" className="donate-submit-button">
            {userType === 'ngo' ? 'Share Food' : 'Post Donation'}
          </button>
        </form>
 
        {notification && (
          <div className={`donate-notification ${
            notification.type === 'error' ? 'donate-notification-error' : 'donate-notification-success'
          }`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default DonationManager;