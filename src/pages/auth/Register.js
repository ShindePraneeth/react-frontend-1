import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import loginBackground from '../styles/1.webp'; // Adjust the path as necessary

const Register = () => {
    const navigate = useNavigate();
   
    // Define the same cities as in backend for consistency
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
 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        userType: 'donor',
        organization: '',
        area: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error messages when user starts typing
        setError('');
        setMessage('');
    };
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
 
        // Validate area for NGOs
        if (formData.userType === 'ngo' && !Object.keys(INDIAN_CAPITAL_CITIES).includes(formData.area)) {
            setError('Please select a valid service area from the dropdown');
            return;
        }
 
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
 
            const data = await response.json();
           
            if (data.success) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Server error. Please try again.');
        }
    };
 
    return (
        <div 
            className="register-container" 
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        <div className="container1">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="form-input"
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="form-input"
                />
                <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="form-select"
                >
                    <option value="donor">Donor</option>
                    <option value="ngo">NGO</option>
                </select>
 
                {formData.userType === 'ngo' && (
                    <>
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Organization Name"
                            required
                            className="form-input"
                        />
                        <select
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select Service Area</option>
                            {Object.keys(INDIAN_CAPITAL_CITIES).map(city => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </>
                )}
 
                <button type="submit" className="submit-button">Register</button>
            </form>
            <p className="switch-form">
                Already have an account? <a href="/login">Login</a>
            </p>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </div>
        </div>
    );
};
 
export default Register;