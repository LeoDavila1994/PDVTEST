import Tippy from '@tippyjs/react';
import { useMenu } from '../hooks/useMenu';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useEffect, useState } from 'react';
import { useEndWork } from '../hooks/useLoginPin';
import { queryClient } from '../utilities/queryClient';
import { toast } from 'react-toastify';
import arrowBack from '../assets/icon-regresar@3x.png'

const getEmail = async () => {
  const email = decrypt('user-email');
  const userName = decrypt('user-name');
  const idBranch = decrypt('branch-id');
  return { email, userName, idBranch };
};

const UserMenu = () => {
  const [email, setEmail] = useState('');

  const [idBranch, setIdBranch] = useState('');

  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const { mutate } = useEndWork();

  const logout = () => {
    let numTables = sessionStorage.getItem('numTables');
    let numMOst = sessionStorage.getItem('numMost');
    let numDelivery = sessionStorage.getItem('numDelivery');
    if (numTables && numMOst && numDelivery) {
      if (parseInt(numTables) !== 0 || parseInt(numMOst) !== 0 || parseInt(numDelivery) !== 0) {
        toast.error('Tienes cuentas abiertas!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          delay: 1,
        });
      } else {
        sessionStorage.removeItem('numTables');
        sessionStorage.removeItem('numMost');
        sessionStorage.removeItem('numDelivery');
        const datos = {
          strUserEmail: email,
          idBranch: idBranch,
        };
        mutate(datos, {
          onSuccess: (res) => {
            if (res.data.intResponse === 200) {
              queryClient.removeQueries(['userBranches']);
              sessionStorage.clear();
              navigate('/login');
            }
          },
        });
      }
    } else {
      const datos = {
        strUserEmail: email,
        idBranch: idBranch,
      };
      mutate(datos, {
        onSuccess: (res) => {
          if (res.data.intResponse === 200) {
            queryClient.removeQueries(['userBranches']);
            sessionStorage.clear();
            navigate('/login');
          }
        },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { email, userName, idBranch } = await getEmail();

      if (email && userName) {
        setEmail(email);
        setUserName(userName);
        if (idBranch) {
          setIdBranch(idBranch);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="custom-dropdown-menu">
        <div className="p-5">
          <label className='flex justify-center'>{userName}</label>
        </div>
        <hr />
        <div className="p-5">
          <button className="flex items-center text-normal hover:text-givvy_blue" onClick={logout}>
            <span className="la la-power-off text-2xl leading-none mr-2"></span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const getNames = async () => {
  const companyName = decrypt('company-name');
  const branchName = decrypt('branch-name');
  const UserIdPast = decrypt('user-idpast');
  const UserEmailPast = decrypt('user-emailpast');
  const UserNamePast = decrypt('user-namepast');
  const loginType = decrypt('user-logintype');
  return { companyName, branchName, UserIdPast, UserEmailPast, UserNamePast, loginType };
};

const Topbar = () => {
  const { toggleMenuBar } = useMenu();
  const location = useLocation();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [loginType, setLoginType] = useState('');
  const [UserEmailPast, setUserEmailPast] = useState('');
  const [userNamePast, setUserNamePast] = useState('');
  const [userIdPast, setUserIdPast] = useState('');

  const closeSession = () => {
    encrypt('user-idpast', '');
    encrypt('user-emailpast', '');
    encrypt('user-namepast','');
    encrypt('user-id', userIdPast);
    encrypt('user-email', UserEmailPast);
    encrypt('user-name', userNamePast)
    
    sessionStorage.removeItem('user-logintype');
    sessionStorage.setItem('boolLoginType', 'false');
    navigate('/FastLogin');
  };

  useEffect(() => {
    async function fetchData() {
      const { companyName, branchName, loginType, UserEmailPast, UserNamePast, UserIdPast } = await getNames();

      if (companyName && branchName) {
        setCompanyName(companyName);
        setBranchName(branchName);
        if (loginType && UserEmailPast && UserNamePast && UserIdPast) {
          setLoginType(loginType);
          setUserEmailPast(UserEmailPast);
          setUserIdPast(UserIdPast);
          setUserNamePast(UserNamePast);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <header className="top-bar">
        {location.pathname === '/' ||
        location.pathname === '/QuickStart' ||
        location.pathname === '/FastLogin' ||
        location.pathname === '/NotBranches' ? null : (
          <button type="button" className="menu-toggler la la-bars" onClick={toggleMenuBar}></button>
        )}
        {location.pathname === '/FastLogin'?
        <button onClick={()=>navigate('/QuickStart')}><img className='scale-75' src={arrowBack}/></button>:null}
        <img className="object-scale-down w-32" src={logo} alt="" />
        <div className="flex items-center ml-auto">
          {location.pathname === '/' || location.pathname === '/NotBranches' ? null : (
            <div className="w-32 sm:flex sm:w-96 sm:justify-end">
              <h5 className="brand h-10 overflow-hidden whitespace-normal overflow-ellipsis py-2">{companyName}</h5>
              <h1 className="px-2">({branchName})</h1>
            </div>
          )}

          {loginType ? (
            <div className="flex items-center">
              <div
                className="px-4 py-2 font-extrabold border border-danger rounded-xl text-danger hover:cursor-pointer "
                onClick={closeSession}
              >
                SALIR
              </div>
              <Tippy
                interactive={true}
                arrow={true}
                theme="light-border"
                placement="bottom-end"
                trigger="click"
                content={<UserMenu />}
              >
                <div className="flex justify-center items-center ml-4 border rounded-full w-8 h-8 bg-givvy_blue cursor-pointer">
                  <i className="las la-user text-white text-base"></i>
                </div>
              </Tippy>
            </div>
          ) : (
            <Tippy
              interactive={true}
              arrow={true}
              theme="light-border"
              placement="bottom-end"
              trigger="click"
              content={<UserMenu />}
            >
              <div className="flex justify-center items-center ml-4 border rounded-full w-8 h-8 bg-givvy_blue cursor-pointer">
                <i className="las la-user text-white text-base"></i>
              </div>
            </Tippy>
          )}
        </div>
      </header>
    </>
  );
};

export default Topbar;
