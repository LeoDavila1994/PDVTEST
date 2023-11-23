import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import { toast, Zoom } from 'react-toastify';

import BasicLayout from './BasicLayout';
import Loading from './Loading';
import PrivateRoutePin from './PrivateRoutePin';
import PrivateRoute from './PrivateRoute';
import {
  Forbidden,
  Login,
  NotFound,
  ForgotPassword,
  ProductsMenu,
  Branches,
  OpenTable,
  NotBranches,
  QuickStart,
  FastLogin,
  TicketsSummary,
} from '../pages';
import Invoice from '../pages/Invoice';

const Routing = () => {
  const [isChangingRoute, setIsChangingRoute] = useState(false);

  const [previousLocation, setPreviousLocation] = useState({});

  const isFetching = useIsFetching();

  const location = useLocation();

  useEffect(() => {
    setPreviousLocation(location);
    setIsChangingRoute(true);
  }, [location]);

  useEffect(() => {
    setIsChangingRoute(false);
  }, [previousLocation]);

  useEffect(() => {
    if (isFetching > 0) {
      toast.loading(`Loading ...`, {
        toastId: 'toastFetchingData',
        position: 'top-center',
        transition: Zoom,
      });
    } else {
      toast.dismiss('toastFetchingData');
    }
  }, [isFetching]);

  if (isChangingRoute) {
    return (
      <BasicLayout>
        <Loading />
      </BasicLayout>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Branches />} />
          <Route path="/QuickStart" element={<QuickStart />} />
          <Route path="/FastLogin" element={<FastLogin />} />
          <Route path="/" element={<PrivateRoutePin />}>
            <Route path="/OpenBill" element={<OpenTable />} />
            <Route path="/productslist" element={<ProductsMenu />} />
            <Route path="/ticketsummary" element={<TicketsSummary />} />
            <Route path="/ticketsummary/invoice" element={<Invoice />} />
          </Route>
          <Route path="/forbidden" element={<Forbidden />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/NotBranches" element={<NotBranches />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routing;
