import FastLoginForm from '../components/FastLoginForm';
import LoginPinLayout from '../components/LoginPinLayout';
import imageLoginGivvy from '../assets/logo.svg';
import imageLogin from '../assets/IMAGEN LOGIN.png';
import { useEffect } from 'react';

const FastLogin = () => {

  useEffect(()=>{
    sessionStorage.removeItem('boolLoginType');
  },[]);

  return (
    <>
      <LoginPinLayout menuOption="FastLogin">
        <div className="flex flex-col w-full bg-givvy_blue">
          <div className="lg:flex h-screen">
            <div className="flex h-1/3 lg:w-2/5 lg:h-screen bg-black">
              <img className="relative w-full lg:w-full lg:h-full object-cover opacity-50" src={imageLogin} />
              <div className="">
                <div className="absolute flex items-center justify-center h-1/3 lg:h-screen lg:w-1/3 inset-0">
                  <img src={imageLoginGivvy} />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-full lg:flex">
              <div className="flex flex-col w-full bg-givvy_blue items-center lg:justify-center py-10 lg:mt-28">
                <div className="w-72 sm:w-96 pb-3">
                  <h2 className="uppercase font-bold text-white sm:w-2/3 lg:w-2/3 text-xl">
                    GIVVY COMANDA
                  </h2>
                </div>
                <FastLoginForm />
              </div>
            </div>
          </div>
        </div>
      </LoginPinLayout>
    </>
  );
};

export default FastLogin;
