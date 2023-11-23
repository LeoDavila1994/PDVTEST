import { useEffect, useState } from 'react';
import { decrypt, encrypt } from '../utilities/cryptoJs';
import { useLoginPin } from '../hooks/useLoginPin';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const getIds = async () => {
  const idBranch = await decrypt('branch-id');
  const userId =await decrypt('user-id');
  const email = await decrypt('user-email');
  const userName = await decrypt('user-name');
  return { idBranch, userId, email, userName };
};

const FastLoginForm = () => {
  const [loginForm, setLoginForm] = useState<boolean>(false);
  const [strUserPin, setStrUserPin] = useState<string>('');
  const [idBranch, setIdBranch] = useState('');
  const [pastUserName, setPastUserName] = useState('');
  const [pastUserEmail, setPastUserEmail] = useState('');
  const [pastUserId, setPastUserId] = useState('');
  
  const { mutate } = useLoginPin();
  const navigate = useNavigate();

  const handleChangeUserPin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 4) {
      setStrUserPin(inputValue);
    }
  };

  const handleSubmitPin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = {
      strUserPin: strUserPin,
      idBranch: idBranch,
    };
    mutate(datos, {
      onSuccess: (res) => {
        switch (res.data.intResponse) {
          case 200:
            encrypt('user-idpast', pastUserId);
            encrypt('user-emailpast', pastUserEmail);
            encrypt('user-namepast', pastUserName);
            encrypt('user-id', res.data.idUser);
            encrypt('user-email', res.data.strUserEmail);
            encrypt('user-name', res.data.strUserName)
            encrypt('user-logintype', 'FastLogin');
            sessionStorage.setItem('boolLoginType', 'true')
            navigate('/OpenBill')
            break;
          case 421:
            encrypt('user-Pin', datos.strUserPin);
            setLoginForm(true);
            break;
          case 422:
            toast.error('Pin incorrecto!', {
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
            break;
        }
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      const ids = await getIds();
      const { idBranch, userId, email, userName } = ids;

      if (idBranch && userId && email && userName) {
        setIdBranch(idBranch);
        setPastUserEmail(email);
        setPastUserId(userId);
        setPastUserName(userName);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {!loginForm ? (
        <form className="w-72 sm:w-96 h-72 rounded-lg flex align-center flex-col gap-4" onSubmit={handleSubmitPin}>
          <label className='text-white font-semibold text-sm'>Ingresar PIN:</label>
          <input className="form-control" name="strUserPin" value={strUserPin} onChange={handleChangeUserPin} required/>
          <div className="w-full flex justify-end align-center items-center">
            <button
              className="flex bg-white w-28 h-8 items-center justify-center text-givvy_blue text-xs font-bold rounded"
            >
              INGRESAR
            </button>
          </div>
        </form>
      ) : (
        <LoginForm />
      )}
      <ToastContainer />
    </div>
  );
};

export default FastLoginForm;
