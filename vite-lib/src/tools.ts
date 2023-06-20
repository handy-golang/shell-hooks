export const cloneDeep = (data: any): any => {
  return JSON.parse(JSON.stringify(data));
};

export const mo7Encrypt = (message: string): string => {
  return window.mo7Encrypt(message);
};
