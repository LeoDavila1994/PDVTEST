import CryptoJS from 'crypto-js';

export const encrypt = (key: string, value: string): void => {
  const signature = import.meta.env.VITE_SECRET_SIGNATURE;

  const bytes = CryptoJS.AES.encrypt(value, signature).toString();

  sessionStorage.setItem(key, bytes);
};

export const decrypt = (key: string): string | null => {
  const hased = sessionStorage.getItem(key);

  const signature = import.meta.env.VITE_SECRET_SIGNATURE;

  if (hased) {
    const bytes = CryptoJS.AES.decrypt(hased, signature);

    const decryptValue = bytes.toString(CryptoJS.enc.Utf8);

    return decryptValue;
  }

  return null;
};
