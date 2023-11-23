import React from 'react';

interface Elements {
  children: React.ReactNode;
}

const BasicLayout: React.FunctionComponent<Elements> = ({ children }) => {
  return (
    <>
      <div className="main-body">{children}</div>
    </>
  );
};

export default BasicLayout;
