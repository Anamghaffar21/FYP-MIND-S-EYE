import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import { register, setAuthToken } from '../../api';
import './signup.css';



const SignupForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register(name, email, password);
      setAuthToken(data.token);
      setUser({ id: data.user.id, username: name, email: email });
      localStorage.setItem('token', data.token);
      onClose(); // Close the signup form after successful signup
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.msg || 'An error occurred during signup');
    }
  };

  return (
    <div className="signup-form">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;