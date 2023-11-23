import { useNavigate } from 'react-router-dom';
import BasicLayout from '../components/BasicLayout';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/login');
    sessionStorage.clear();
  };

  return (
    <BasicLayout>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
        <h1 className="text-9xl font-black">403</h1>
        <div className="w-80 text-center flex flex-col gap-3">
          <h2 className="text-primary font-semibold text-2xl">SIN AUTORIZACION</h2>
          <p className="font-semibold">TU NO PUEDES INGRESAR A ESTA PAGINA</p>
        </div>
        <button className="btn btn_primary" onClick={handleReturn}>
          REGRESAR
        </button>
      </div>
    </BasicLayout>
  );
};

export default Forbidden;
