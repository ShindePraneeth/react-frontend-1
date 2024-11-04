import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

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
        <div className="container1">
            <h1>Login</h1>
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
                Don't have an account? <a href="/register">Register</a>
            </p>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
