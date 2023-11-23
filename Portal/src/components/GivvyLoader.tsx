import { useEffect, useState } from 'react';
import imageLoginGivvy from '../assets/logo.svg';

const GivvyLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaderId = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearInterval(loaderId);
    };
  }, []);

  return (
    <div
      className={`w-full h-screen absolute top-0 left-0 bg-givvy_blue z-50 flex justify-center items-center ${
        isLoading ? '' : 'hidden'
      }`}
    >
      <div className="w-60 h-40 animate-bounce">
        <img src={imageLoginGivvy} alt="logo_givvy" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default GivvyLoader;
