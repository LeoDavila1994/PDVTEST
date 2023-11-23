import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useForgotPassword } from '../hooks/useUser';
import imgArrow from '../assets/arrow-circle-left.svg';
import circle from '../assets/Vector.svg';
import circle1 from '../assets/Vector1.svg';
import circle2 from '../assets/Vector 2.svg';

const ForgotPasswordForm = () => {
  const [emailValue, setemailValue] = useState<string>('');

  const navigate = useNavigate();
  const { mutate } = useForgotPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemailValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (emailValue !== '') {
      e.preventDefault();
      mutate(emailValue, {
        onSuccess: async (res) => {
          switch (res.data.intResponse) {
            case 200:
              toast.success('Correo Enviado!', {
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
              toast.error('Correo Invalido!', {
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

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} className="relative flex justify-center align-center flex-col p-5 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white font-semibold text-sm">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="strUserEmail"
            required
            value={emailValue}
            onChange={handleChange}
            placeholder="email@example.com"
          />
          <img src={circle} className="absolute left-4 -bottom-40 sm:-left-32 lg:-left-28" />
          <img src={circle1} className="absolute right-4 -top-36 sm:left-96 lg:left-full" />
          <img src={circle2} className="absolute left-4 -top-32 sm:-left-28 lg:-left-20" />
        </div>
        <div className="w-full flex justify-between items-center">
          <img
            src={imgArrow}
            className="las la-chevron-circle-left text-givvy_blue text-4xl pl-1 cursor-pointer hover:text-givvy_blue_strong"
            onClick={handleReturn}
          ></img>
          <button className="flex bg-white w-28 h-8 items-center justify-center text-givvy_blue text-xs font-bold rounded">
            Recuperar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordForm;
