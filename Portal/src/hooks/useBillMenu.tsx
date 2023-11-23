import React, { useContext, createContext, useState, useEffect } from 'react';

import useWindowSize from '../hooks/useWindowSize';

interface MenuContextInterface {
  isMenuBillOpened: boolean;
  toggleMenuBill: () => void;
  hasSidebar: boolean;
  addSidebar: (add: boolean) => void;
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
}

const MediumSizeScreen = 768;

const useBillProvider = (): MenuContextInterface => {
  const windowSize = useWindowSize();

  const [isMenuBillOpened, setIsMenuBillOpened] = useState(true);

  const [largeScreenMenuStatus, setLargeScreenMenuStatus] = useState(true);

  const toggleMenuBill = () => {
    if (windowSize.width >= MediumSizeScreen) {
      setLargeScreenMenuStatus(!isMenuBillOpened);
    }
    setIsMenuBillOpened(!isMenuBillOpened);
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
      setIsMenuBillOpened(false);
    } else if (windowSize.width >= MediumSizeScreen) {
      setIsMenuBillOpened(largeScreenMenuStatus);
    }
  }, [windowSize.width, largeScreenMenuStatus]);

  return {
    isMenuBillOpened,
    toggleMenuBill,
    hasSidebar,
    addSidebar,
    isSidebarOpened,
    toggleSidebar,
  };
};

const MenuContext = createContext<MenuContextInterface>({} as MenuContextInterface);

export const BillProvider = ({ children }: { children: React.ReactNode }) => {
  const menu = useBillProvider();

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
};

export const useBill = () => {
  return useContext(MenuContext);
};
