import React, { useState } from 'react';

const Auth = () => {
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
    await fetch(`http://localhost:5000/todos/${endpoint}`);
  };

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLoggedIn ? 'Please Login' : 'Please Sign Up'}</h2>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          {!isLoggedIn && <input type='password' placeholder='confirm password' />}
          <input
            type='submit'
            value='Submit'
            className='create'
            onClick={(e) => handleSubmit(e, isLoggedIn ? 'login' : 'sign up')}
          />
          {error && <p>{error}</p>}
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
