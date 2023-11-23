import { useNavigate } from 'react-router-dom';
import BasicLayout from '../components/BasicLayout';

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  

  return (
    <BasicLayout>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
        <h1 className="text-9xl font-black">404</h1>
        <div className="w-80 text-center flex flex-col gap-3">
          <h2 className="text-primary font-semibold text-2xl">PAGINA NO ENCONTRADA</h2>
          <p className="font-semibold">LA PAGINA QUE ESTAS BUSNCADO NO SE ENCONTRO.</p>
        </div>
        <button className="btn btn_primary" onClick={handleReturn}>
          REGRESAR
        </button>
      </div>
    </BasicLayout>
  );
};

export default NotFound;
