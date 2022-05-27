import { HunterDataType } from '@/api/hunter';
import React from 'react';

export const HunterData_initial: HunterDataType = {
  Password: '',
  OkxKeyList: [],
  HunterServerList: [],
};

export const HunterContext = React.createContext<HunterDataType>(HunterData_initial);
export const UpdateHunter = React.createContext((data: HunterDataType) => {});
