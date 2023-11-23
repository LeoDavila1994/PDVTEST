import AuthLayout from '../components/AuthLayout';
import TopButtonsCommand from '../components/TopButtonsCommand';
import { useEffect, useState } from 'react';
import OptionDelivery from '../components/OptionDelivery';
import OptionMostrador from '../components/OptionMostrador';
import OptionMesas from '../components/OptionMesas';
import CloseTable from '../components/CloseTable';
import SideBarNewTable from '../components/SideBarNewTable';
import { TableProvider } from '../hooks/useTableMenu';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useGetTicket } from '../hooks/useTicket';
import GivvyLoader from '../components/GivvyLoader';
import { SummaryProvider, useSummary } from '../hooks/useSummaryMenu';

const role = true;

const getNames = async () => {
  const UserIdPast = decrypt('user-idpast');
  const UserEmailPast = decrypt('user-emailpast');
  const loginType = decrypt('user-logintype');
  const idBranch = await decrypt('branch-id');
  const idUser = await decrypt('user-id');
  const idTicket = await decrypt('ticket-id')
  const arrPermissions = await decrypt('arrPermissions')
  return { UserIdPast, UserEmailPast, loginType, idBranch, idUser, idTicket, arrPermissions };
};

const OpenTable = () => {
  const [closeTable, setCloseTable] = useState<boolean>(false);
  const [optionCommand, setOptionCommand] = useState<number>(1);
  const [strTableNumber, setStrTableNumber] = useState<string>('');
  const [strAreaName, setStrAreaName] = useState<string>('');
  const [openSideTable, setOpenSideTable] = useState<boolean>(false);
  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean | null>(null);
  const [loginType, setLoginType] = useState('');
  const [UserEmailPast, setUserEmailPast] = useState('');
  const [userIdPast, setUserIdPast] = useState('');
  const [idUser, setIdUser] = useState('');
  const [idBranch, setIdBranch] = useState('');
  const [idTicket, setIdTicket] = useState('');

  const { getTicket } = useSummary();
  const { data } = useGetTicket(idBranch, idUser);
  const navigate = useNavigate();

  const setArea = () => {
    if (data) {
      if (data?.arrAreas.length != 0) {
        const nameArea = data?.arrAreas[0].strNameArea;
        if (nameArea) {
          setStrAreaName(nameArea);
        }
      }
    }
  };

  const getSidebarStatus = (status: boolean): void => {
    setSidebarIsVisible(status);
  };

  const sendOptionCommand = (option: number) => {
    setOptionCommand(option);
  };

  const handleHideCloseTable = () => {
    setCloseTable(false);
  };

  const handleCloseTable = () => {
    setCloseTable(true);
  };

  const handleSetAreaName = (area: string) => {
    setStrAreaName(area);
  };

  const handleSetTableNumber = (num: string) => {
    setStrTableNumber(num);
  };

  const handleOpenSideTable = () => {
    setOpenSideTable(true);
  };

  const handleCloseSideTable = () => {
    setOpenSideTable(false);
  };

  useEffect(() => {
    if (data) {
      if (data?.arrAreas.length != 0) {
        const nameArea = data?.arrAreas[0].strNameArea;
        if (nameArea) {
          setStrAreaName(nameArea);
        }
      }
    }
    if (data) {
      sessionStorage.setItem('numTables', String(data?.arrTicketsMesa.length));
      sessionStorage.setItem('numMost', String(data?.arrTicketsMostrador.length));
      sessionStorage.setItem('numDelivery', String(data?.arrTicketsDelivery.length));
    }
    
    const optionCommand = sessionStorage.getItem('OptionCommand');
    const areaName = sessionStorage.getItem('AreaName');
    const tableNumber = sessionStorage.getItem('TableNumber');
    
    if(optionCommand && areaName && tableNumber){
      setOptionCommand(parseInt(optionCommand));
      setStrAreaName(areaName);
      setStrTableNumber(tableNumber);
    }
  }, [data]);

  useEffect(() => {
    const handlePopState = () => {
      window.history.go(1);
    };

    if (location.pathname === '/OpenBill' && loginType !== '') {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      if (location.pathname === '/OpenBill' && loginType !== '') {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, [location.pathname, loginType]);

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    async function fetchData() {
      const { loginType, UserEmailPast, UserIdPast, idBranch, idUser, idTicket, arrPermissions } = await getNames();
      
      if (loginType && UserEmailPast && UserIdPast && idBranch && idUser) {
        setIdBranch(idBranch);
        setIdUser(idUser);
        setLoginType(loginType);
        setUserEmailPast(UserEmailPast);
        setUserIdPast(UserIdPast);
      }
      if(idTicket){
        setIdTicket(idTicket);
      }
    }

    fetchData();

    const resetInactivity = () => {
      clearTimeout(inactivityTimeout);
      if (loginType != '') {
        inactivityTimeout = setTimeout(() => {
          encrypt('user-idpast', '');
          encrypt('user-emailpast', '');
          encrypt('user-id', userIdPast);
          encrypt('user-email', UserEmailPast);
          encrypt('user-logintype', '');
          toast.warning('Cerrando Sesión...', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          inactivityTimeout = setTimeout(() => navigate('/FastLogin'), 3000);
        }, 60000);
      }
    };

    const handleUserActivity = () => {
      resetInactivity();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    resetInactivity();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.addEventListener('scroll', handleUserActivity);
      clearTimeout(inactivityTimeout);
    };
  }, [UserEmailPast, userIdPast]);

  return (
    <>
      <GivvyLoader />
      <SummaryProvider>
        <TableProvider>
          <AuthLayout
            menuOption="OpenTable"
            sidebar={
              closeTable ? (
                <CloseTable
                  closeTable={handleHideCloseTable}
                  getSidebarStatus={getSidebarStatus}
                  setstrTableNumber={handleSetTableNumber}
                  optionCommand={optionCommand}
                  openSideTable={handleCloseSideTable}
                />
              ) : (
                <SideBarNewTable
                  getSidebarStatus={getSidebarStatus}
                  optionCommand={optionCommand}
                  openSideTable={openSideTable}
                  strAreaName={strAreaName}
                  closeSideTable={handleCloseSideTable}
                  strTableNumber={strTableNumber}
                  setstrTableNumber={handleSetTableNumber}
                  closeTable={closeTable}
                />
              )
            }
          >
            <main
              className={`transition-all duration-200 ease-linear ${sidebarIsVisible ? 'sidebar-opened' : 'w-full'}`}
            >
              <div className="flex items-end gap-2 pb-3">
                {role && (
                  <button className="btn btn_primary h-9 w-32 text-sm" onClick={() => navigate('/ticketsummary')}>
                    Administrar
                  </button>
                )}
                <TopButtonsCommand
                  sendOptionCommand={sendOptionCommand}
                  openSideTable={openSideTable}
                  openSideBar={closeTable}
                  setStrAreaName={handleSetAreaName}
                  setArea={setArea}
                />
              </div>
              <hr />
              <div className="pt-1">
                {optionCommand == 1 ? (
                  <OptionMesas
                    openSideTable={handleOpenSideTable}
                    setstrTableNumber={handleSetTableNumber}
                    strTableNumber={strTableNumber}
                    setstrAreaName={handleSetAreaName}
                    strAreaName={strAreaName}
                    openSide={openSideTable}
                    closeTable={handleCloseTable}
                    FcloseTable={handleHideCloseTable}
                    optionCommand={optionCommand}
                    openSideBar={closeTable}
                  />
                ) : null}
                {optionCommand == 2 ? (
                  <OptionMostrador
                    closeTable={handleCloseTable}
                    FcloseTable={handleHideCloseTable}
                    openSideBar={closeTable}
                  />
                ) : null}
                {optionCommand == 3 ? (
                  <OptionDelivery
                    closeTable={handleCloseTable}
                    FcloseTable={handleHideCloseTable}
                    openSideBar={closeTable}
                  />
                ) : null}
              </div>
            </main>
            <ToastContainer />
          </AuthLayout>
        </TableProvider>
      </SummaryProvider>
    </>
  );
};

export default OpenTable;
