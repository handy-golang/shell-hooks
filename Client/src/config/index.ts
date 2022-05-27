import CryptoJS from 'crypto-js';

export const MD5 = (message: string): string => {
  return CryptoJS.MD5(message).toString();
};
export const Sha256 = (message: string, secretKey: string): string => {
  const strSha = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, secretKey));

  CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, secretKey));

  return strSha;
};

// Key
export const SecretKey = MD5('golang is good');

export const Encrypt = (msg: string): string => {
  return Sha256(`${msg}mo7`, SecretKey);
};
