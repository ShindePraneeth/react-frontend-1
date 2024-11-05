import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginBackground from '../styles/1.webp'; // Adjust the path as necessary

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userType', data.userType);
                localStorage.setItem('username', formData.username);
                setMessage('Login successful! Redirecting...');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('Server error. Please try again.');
        }
    };

    return (
        <div className="login-container">
            {/* Left section with background image */}
            <div 
                className="login-illustration" 
                style={{
                    backgroundImage: `url(${loginBackground})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center'
                }}
            ></div>
            
            {/* Right section with form */}
            <div className="login-form">
                <h2 className="form-welcome">Welcome back</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="switch-form">
                    <a href="/register">Create Account</a> | <a href="#">Forgot Password?</a>
                </p>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
