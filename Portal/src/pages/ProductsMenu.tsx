import { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useGetAllCategorysProduct } from '../hooks/useProducts';
import ProductsInCategory from '../components/ProductsInCategory';
import { queryClient } from '../utilities/queryClient';
import ShoppingCart from '../components/ShoppingCart';
import { BillProvider } from '../hooks/useBillMenu';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import GivvyLoader from '../components/GivvyLoader';

const getIds = async () => {
  const idBranch = await decrypt('branch-id');
  const idCompany = await decrypt('company-id');
  const UserIdPast = decrypt('user-idpast');
  const UserEmailPast = decrypt('user-emailpast');
  const loginType = decrypt('user-logintype');

  return { idBranch, idCompany, UserIdPast, UserEmailPast, loginType };
};

const ProductsMenu = () => {
  const [idCompany, setIdCompany] = useState('');

  const [idBranch, setIdBranch] = useState('');

  const [loginType, setLoginType] = useState('');

  const [UserEmailPast, setUserEmailPast] = useState('');

  const [userIdPast, setUserIdPast] = useState('');

  const [categoryId, setCategoryId] = useState<string>('');

  const { data, isSuccess } = useGetAllCategorysProduct(idCompany, idBranch);

  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    queryClient.removeQueries(['productsInList']);

    setCategoryId(id);
  };

  useEffect(() => {
    async function fetchData() {
      const { idCompany, idBranch } = await getIds();

      if (idCompany && idBranch) {
        setIdCompany(idCompany);
        setIdBranch(idBranch);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    async function fetchData() {
      const { loginType, UserEmailPast, UserIdPast } = await getIds();
      if (loginType && UserEmailPast && UserIdPast) {
        setLoginType(loginType);
        setUserEmailPast(UserEmailPast);
        setUserIdPast(UserIdPast);
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
          toast.info('Cerrando Sesión...', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => navigate('/FastLogin'), 3000);
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

  useEffect(() => {
    if (isSuccess) {
      setCategoryId(data.arrList[0]?.idList);
    }
  }, [isSuccess]);

  return (
    <>
      <GivvyLoader />
      <BillProvider>
        <AuthLayout menuOption="Comanda" sidebar={<ShoppingCart />}>
          <main>
            <div className="w-full h-28 flex gap-5 overflow-x-scroll scrollbar-none">
              {isSuccess &&
                data?.arrList.map((item) => (
                  <div
                    key={item.idList}
                    className="min-w-[144px] flex flex-col gap-2 justify-start items-center text-sm text-givvy_blue"
                    onClick={() => handleClick(item.idList)}
                  >
                    <div
                      key={item.idList}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-givvy_blue"
                    >
                      <img src={item.strListImage} className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <p>{item.strListName}</p>
                  </div>
                ))}
            </div>
            {categoryId !== '' && isSuccess && (
              <ProductsInCategory idList={categoryId} idCompany={idCompany} idBranch={idBranch} />
            )}
          </main>
          <ToastContainer />
        </AuthLayout>
      </BillProvider>
    </>
  );
};

export default ProductsMenu;
