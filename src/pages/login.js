import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [login, setLogin] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(username, password);
    if (!login) {
      console.log(username, password, repeatPassword);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {!login && (
          <div className='form-group'>
            <label htmlFor='password'>Repeat Password:</label>
            <input
              type='password'
              id='password'
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
          </div>
        )}
        <button type='submit' className='login-button'>
          {login ? 'Login' : 'Register'}
        </button>
      </form>
      {login ? (
        <div className='mb-4 mt-8'>
          Don&apos;t have an account? &nbsp;
          <button className='text-white' onClick={() => setLogin(false)}>
            Register here
          </button>
        </div>
      ) : (
        <div className='mb-4 mt-8'>
          You already have an account? &nbsp;
          <button className='text-white' onClick={() => setLogin(true)}>
            Login here
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
