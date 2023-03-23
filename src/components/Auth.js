import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const KEY = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const viewLogin = (status) => {
    setError(null);
    setIsLoggedIn(status);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLoggedIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }
    const response = await fetch(`${KEY}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { email: email, hashed_password: password } }),
    });
    const data = await response.json();
    if (data.error) {
      setError(
        'It appears we are having trouble accessing your account. Please review your login info.'
      );
    } else {
      setCookie('Email', email);
      setCookie('AuthToken', data.token);
      window.location.reload();
    }
  };
  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLoggedIn ? 'Please Login' : 'Please Sign Up'}</h2>
          <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggedIn && (
            <input
              type='password'
              placeholder='confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type='submit'
            value='Submit'
            className='create'
            onClick={(e) => handleSubmit(e, isLoggedIn ? 'login' : 'signup')}
          />
          {error && <p className='error'>{error}</p>}
        </form>
        <div className='auth-options'>
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLoggedIn ? 'grey' : 'white' }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLoggedIn ? 'grey' : 'white' }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
