import { useSession } from 'next-auth/react';
import React from 'react';

const Layout = ({ children }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <header className='flex justify-center'>
        <nav className='flex h-12 justify-between shadow-md items-center px-4 w-3/5'>
          <p className='text-lg font-bold text-white'>Pomodoro Timer</p>
          <div className='flex space-x-3'>
            <p>Setting</p>
            <p>{session ? session.user.name : 'Login'}</p>
          </div>
        </nav>
      </header>
      <main className='container m-auto flex justify-center w-3/5'>
        {children}
      </main>
      {/* <footer className='flex justify-center items-center shadow-inner'>
        <span className='text-center text-white'>Copyright @ 2023 Andy</span>
      </footer> */}
    </>
  );
};

export default Layout;
