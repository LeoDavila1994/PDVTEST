import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useMenu } from '../hooks/useMenu';
import BasicLayout from './BasicLayout';
import Topbar from './Topbar';
import Menubar from './Menubar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  menuOption: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

const AuthLayout = (props: AuthLayoutProps) => {
  const { menuOption, children, sidebar, className, hideFooter } = props;

  const { setMenuBarOption } = useMenu();

  const location = useLocation();

  const mainClasses = {
    'workspace_with-sidebar': !!sidebar,
    'overflow-hidden': !sidebar,
  };

  useEffect(() => {
    setMenuBarOption(menuOption);
  }, [menuOption, setMenuBarOption]);

  return (
    <>
      <ToastContainer autoClose={3000} pauseOnHover={true} />
      <BasicLayout>
        <Topbar />
        {location.pathname === '/' ||
        location.pathname === '/QuickStart' ||
        location.pathname === '/FastLogin' ||
        location.pathname === '/NotBranches' ? null : (
          <Menubar />
        )}
        <main className={classNames('workspace scrollbar-none', mainClasses, className)}>
          {children}
          {!hideFooter && <Footer />}
        </main>
        {sidebar}
      </BasicLayout>
    </>
  );
};

export default AuthLayout;
