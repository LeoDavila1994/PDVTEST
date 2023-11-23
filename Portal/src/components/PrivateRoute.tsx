import { Navigate, Outlet } from 'react-router-dom';
import { decrypt } from '../utilities/cryptoJs';

const PrivateRoute = () => {
  const token = decrypt('token-api');

  if (token) return <Outlet />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
