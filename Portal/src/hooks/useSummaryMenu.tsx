import React, { useContext, createContext, useState, useEffect } from 'react';
import { useFindTicket } from './useTicket';
import { queryClient } from '../utilities/queryClient';

interface MenuContextInterface {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  getTicket: (idTicket: string) => void;
  features: any;
  isFetched: boolean;
  cleanFeatures: () => void;
}

const useSummaryProvider = (): MenuContextInterface => {
  const [ticket, setTicket] = useState('');

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const [features, setFeatures] = useState<any>({});

  const { data, refetch, isFetched } = useFindTicket(ticket);

  const getTicket = (idTicket: string) => {    
    setTicket(idTicket);
  };

  const toggleSidebar = () => {
    if (isSidebarOpened) {
      setTicket('');
      queryClient.removeQueries(['findTicket']);
      setIsSidebarOpened(false);
    } else {
      setIsSidebarOpened(true);
    }
  };

  const cleanFeatures = () => {
    setFeatures({});
  }

  useEffect(() => {
    if (ticket) {
      refetch();
    } else {
      queryClient.removeQueries(['findTicket'])
    }
  }, [ticket]);

  useEffect(() => {
    if (isFetched) {
      setFeatures(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (features._id) {
      setIsSidebarOpened(true);
    }
  }, [features]);
  
  return {
    isSidebarOpened,
    toggleSidebar,
    getTicket,
    features,
    isFetched,
    cleanFeatures,
  };
};

const MenuContext = createContext<MenuContextInterface>({} as MenuContextInterface);

export const SummaryProvider = ({ children }: { children: React.ReactNode }) => {
  const menu = useSummaryProvider();

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
};

export const useSummary = () => {
  return useContext(MenuContext);
};
