import AuthLayout from '../components/AuthLayout';

const NotBranches = () => {
  return (
    <AuthLayout menuOption="NotBranches">
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <div className=" w-full text-center flex flex-col gap-3">
          <h2 className="text-primary font-semibold text-2xl">SUCURSALES NO ENCONTRADAS</h2>
          <p className="font-semibold">NO TIENES ACCESO A LA COMANDA DE GIVVY</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default NotBranches;
