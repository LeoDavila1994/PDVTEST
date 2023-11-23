import React, { useContext, createContext, useState, useEffect } from 'react';

import useWindowSize from '../hooks/useWindowSize';

interface MenuContextInterface {
  isMenuBarOpened: boolean;
  selectedMenuBarOption: string;
  setMenuBarOption: (option?: string) => void;
  toggleMenuBar: () => void;
  hasSidebar: boolean;
  addSidebar: (add: boolean) => void;
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
}

const MediumSizeScreen = 768;

const useMenuProvider = (): MenuContextInterface => {
  const windowSize = useWindowSize();

  const [isMenuBarOpened, setIsMenuBarOpened] = useState(true);

  const [selectedMenuBarOption, setSelectedMenuBarOption] = useState('');

  const [largeScreenMenuStatus, setLargeScreenMenuStatus] = useState(true);

  const setMenuBarOption = (option?: string) => {
    setSelectedMenuBarOption(option || '');
  };

  const toggleMenuBar = () => {
    if (windowSize.width >= MediumSizeScreen) {
      setLargeScreenMenuStatus(!isMenuBarOpened);
    }
    setIsMenuBarOpened(!isMenuBarOpened);
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
      setIsMenuBarOpened(false);
    } else if (windowSize.width >= MediumSizeScreen) {
      setIsMenuBarOpened(largeScreenMenuStatus);
    }
  }, [windowSize.width, largeScreenMenuStatus]);

  return {
    isMenuBarOpened,
    selectedMenuBarOption,
    setMenuBarOption,
    toggleMenuBar,
    hasSidebar,
    addSidebar,
    isSidebarOpened,
    toggleSidebar,
  };
};

const MenuContext = createContext<MenuContextInterface>({} as MenuContextInterface);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const menu = useMenuProvider();

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  return useContext(MenuContext);
};
