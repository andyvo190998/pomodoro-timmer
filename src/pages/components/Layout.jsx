import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Menu } from '@headlessui/react';

const Layout = ({ title, children }) => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className='flex flex-col justify-center w-max'>
      <header className='flex justify-center my-5'>
        <title>{title}</title>
        <nav className='flex h-12 justify-between shadow-md items-center w-full px-2'>
          <Link href='/'>
            <p className='text-lg font-bold text-white'>Pomodoro Timer</p>
          </Link>
          <div className='flex space-x-3'>
            <p>Setting</p>
            {session ? (
              <Menu as='div' className='relative inline-block'>
                <Menu.Button className='text-white'>
                  {status === 'loading' ? 'Loading' : session.session.user.name}
                </Menu.Button>
                <Menu.Items className='absolute bg-white right-0 w-28 origin-top-right shadow-lg'>
                  <Menu.Item>
                    <Link className='dropdown-link' href='/asd'>
                      Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link className='dropdown-link' href='/asd'>
                      Subscription
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      onClick={logoutHandler}
                      href='#'
                      className='dropdown-link'
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href='/login'>
                <p>Login</p>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className='container flex flex-col justify-center w-full'>
        {children}
      </main>
      {/* <footer className='flex justify-center items-center shadow-inner'>
        <span className='text-center text-white'>Copyright @ 2023 Andy</span>
      </footer> */}
    </div>
  );
};

export default Layout;
