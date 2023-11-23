import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useMenu } from '../hooks/useMenu';
import BasicLayout from './BasicLayout';
import Topbar from './Topbar';

interface AuthLayoutProps {
  menuOption: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

const LoginPinLayout = (props: AuthLayoutProps) => {
  const { menuOption, children, sidebar, className } = props;

  const { setMenuBarOption } = useMenu();

  useEffect(() => {
    setMenuBarOption(menuOption);
  }, [menuOption, setMenuBarOption]);

  const mainClasses = {
    'workspace_with-sidebar': !!sidebar,
    'overflow-hidden': !sidebar,
  };

  return (
    <>
      <ToastContainer autoClose={3000} pauseOnHover={true} />
      <BasicLayout>
        <Topbar />
        <main className={classNames('workspacePin', mainClasses, className)}>
          {children}
        </main>
      </BasicLayout>
    </>
  );
};

export default LoginPinLayout;
