import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [login, setLogin] = useState(true);
  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    // Handle login logic here

    if (!login) {
      const URL = process.env.NEXTAUTH_URL;
      if (repeatPassword !== password) {
        alert('incorrect repeat password!');
        return;
      }
      if (password.length <= 5) {
        alert('Password should have more than 5 characters');
        return;
      }
      try {
        const newUser = {
          name: name,
          password: password,
          email: email,
          repeatPassword: repeatPassword,
        };
        const { data } = await axios.post(`${URL}/api/user`, newUser);
        console.log(data);
        alert('register success');
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });
      if (!result.error) {
        router.replace('/');
      } else {
        alert('fail to login');
      }
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        {!login && (
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div className='form-group'>
          <label htmlFor='username'>Email:</label>
          <input
            type='email'
            id='username'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
