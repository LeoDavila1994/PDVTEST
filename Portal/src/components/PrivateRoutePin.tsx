import { Navigate, Outlet } from 'react-router-dom';
import { decrypt } from '../utilities/cryptoJs';

const PrivateRoute = () => {
  const token = decrypt('token-api');
  const loginType = decrypt('user-logintype');
  const boolLoginType = sessionStorage.getItem('boolLoginType');

  if (token){
    if (loginType && location.pathname === '/FastLogin' && boolLoginType === 'true')
    {return <Outlet />}else{
      return <Outlet />
    }
  }
  
  return <Navigate to="/QuickStart" />;
};

export default PrivateRoute;