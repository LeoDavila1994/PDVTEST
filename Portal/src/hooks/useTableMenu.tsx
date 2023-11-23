import React, { useContext, createContext, useState, useEffect } from 'react';

import useWindowSize from '../hooks/useWindowSize';

interface MenuContextInterface {
  isMenuTableOpened: boolean;
  toggleMenuTable: () => void;
  hasSidebar: boolean;
  addSidebar: (add: boolean) => void;
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
}

const MediumSizeScreen = 768;

const useTableProvider = (): MenuContextInterface => {
  const windowSize = useWindowSize();

  const [isMenuTableOpened, setIsMenuTableOpened] = useState(true);

  const [largeScreenMenuStatus, setLargeScreenMenuStatus] = useState(true);

  const toggleMenuTable = () => {
    if (windowSize.width >= MediumSizeScreen) {
      setLargeScreenMenuStatus(!isMenuTableOpened);
    }
    setIsMenuTableOpened(!isMenuTableOpened);
  };

  const [hasSidebar, setHasSidebar] = useState(false);

  const addSidebar = (add: boolean) => {
    setHasSidebar(add);
  };

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  useEffect(() => {
    if (windowSize.width < MediumSizeScreen) {
      setIsMenuTableOpened(false);
    } else if (windowSize.width >= MediumSizeScreen) {
      setIsMenuTableOpened(largeScreenMenuStatus);
    }
  }, [windowSize.width, largeScreenMenuStatus]);

  return {
    isMenuTableOpened: isMenuTableOpened,
    toggleMenuTable: toggleMenuTable,
    hasSidebar,
    addSidebar,
    isSidebarOpened,
    toggleSidebar,
  };
};

const MenuContext = createContext<MenuContextInterface>({} as MenuContextInterface);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const menu = useTableProvider();

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
};

export const useTable = () => {
  return useContext(MenuContext);
};
