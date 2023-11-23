import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataLogin } from '../utilities/types.d';
import { useLogin } from '../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import eye_slash from '../assets/eye-slash.svg';
import eye from '../assets/eye.svg';
import { encrypt, decrypt } from '../utilities/cryptoJs';

const getIds = async () => {
  const idBranch = await decrypt('branch-id');
  const userId = await decrypt('user-id');
  const email = await decrypt('user-email');
  const userName = await decrypt('user-name');
  const userPin = await decrypt('user-Pin');
  return { idBranch, userId, email, userName, userPin };
};

const LoginForm = () => {
  const [userValues, setUserValues] = useState<DataLogin>({
    strUserEmail: '',
    strUserPassword: '',
    idBranch: '',
    strUserPin: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [pastUserEmail, setPastUserEmail] = useState('');
  const [pastUserName, setPastUserName] = useState('');
  const [pastUserId, setPastUserId] = useState('');

  const navigate = useNavigate();
  const { mutate } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (userValues.strUserEmail !== '' && userValues.strUserPassword !== '') {
      e.preventDefault();
      mutate(userValues, {
        onSuccess: (res) => {
          switch (res.data.intResponse) {
            case 200:
              if (userValues.idBranch != '') {
                encrypt('user-idpast', pastUserId);
                encrypt('user-emailpast', pastUserEmail);
                encrypt('user-namepast', pastUserName);
                encrypt('user-id', res.data.idUser);
                encrypt('user-name', res.data.strUserName)
                encrypt('user-email', userValues.strUserEmail);
                encrypt('user-logintype', 'FastLogin');
                sessionStorage.setItem('boolLoginType', 'true');
                sessionStorage.removeItem('user-Pin');
                navigate('/OpenBill');
              } else {
                encrypt('user-id', res.data.idUser);
                encrypt('user-email', userValues.strUserEmail);
                encrypt('user-name',res.data.strUserName)
                encrypt('token-api', res.data.strTokenApi);
                if (sessionStorage.getItem('token-api')) {
                  navigate('/');
                }
              }
              break;
            case 490:
              toast.error('Contraseña Incorrecta!', {
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
            case 460:
              toast.error('Correo Incorrecto!', {
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
            case 401:
              encrypt('user-email', res.data.email);
              navigate('/NotBranches');
              break;
            case 423:
              toast.error('El correo no corresponde al pin!', {
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
    }
  };

  useEffect(() => {
    async function fetchData() {
      const ids = await getIds();
      const { idBranch, userId, email, userName, userPin } = ids;

      if (idBranch && email && userId && userPin && userName ) {
        setPastUserEmail(email);
        setPastUserId(userId);
        setPastUserName(userName);
        setUserValues({
          ...userValues,
          idBranch: idBranch,
          strUserPin: userPin
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-72 sm:w-96 h-72 rounded-lg flex align-center flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white font-semibold text-sm">
            E-mail:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="strUserEmail"
            required
            value={userValues.strUserEmail}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-white font-semibold text-sm">
            Contraseña:
          </label>
          <input
            className="form-control"
            type={`${isVisible ? 'text' : 'password'}`}
            id="password"
            name="strUserPassword"
            required
            value={userValues.strUserPassword}
            onChange={handleChange}
            placeholder="•••••"
          />
          <img
            src={`${isVisible ? eye : eye_slash}`}
            className={`cursor-pointer absolute bottom-2 right-2`}
            onClick={() => setIsVisible(!isVisible)}
          ></img>
        </div>
        <div className="w-full flex justify-between align-center items-center">
          <a style={{ color: 'white' }} href="/ForgotPassword">
            OLVIDASTE TU CONTRASEÑA?
          </a>
          <button className="flex bg-white w-28 h-8 items-center justify-center text-givvy_blue text-xs font-bold rounded">
            INICIAR SESION
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
