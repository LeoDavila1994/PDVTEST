import BasicLayout from '../components/BasicLayout';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <>
      <BasicLayout>
        <div className="w-full h-screen p-5 md:p-10 flex flex-col items-center justify-center bg-givvy_blue">
          <div className="lg:w-[35rem] md:p-10">
            <div className="px-5">
              <h2 className="font-extrabold tracking-wider text-white text-xl">RECUPERAR CONTRASEÑA</h2>
              <p className="traking-wider text-white font-semibold">RECIBIRAS UN EMAIL</p>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default ForgotPassword;
