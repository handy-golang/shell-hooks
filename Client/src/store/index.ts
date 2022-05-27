import React from 'react';

import { getLocalUserInfo, mStorage } from '@/utils/utils';

export interface UserInfoType {
  Avatar: string;
  CreateTime: string;
  Email: string;
  NickName: string;
  UserID: string;
  UpdateTime: string;
  Token: string;
}

interface initialStateType {
  count: number;
  UserInfo: UserInfoType;
  IsRoot: boolean;
  Loading: boolean;
  PingData: {
    ResParam: {
      [key: string]: string;
    };
    ClientVersion: string;
    ClientApi: string;
    Request: {
      [key: string]: any;
      Header: {
        [key: string]: Array<string>;
      };
      URL: {
        [key: string]: string;
      };
    };
    Token?: string;
  };
  TopBarVisible: boolean;
}
export const initialState: initialStateType = {
  count: 0,
  UserInfo: {
    Avatar: '',
    CreateTime: '',
    Email: '',
    NickName: '',
    UserID: '',
    UpdateTime: '',
    Token: '',
  },
  IsRoot: false,
  Loading: false,
  PingData: {
    ResParam: {},
    ClientVersion: '',
    ClientApi: '',
    Request: {
      Header: {},
      URL: {},
    },
  },
  TopBarVisible: false,
};

interface actionType {
  type: 'CountAdd' | 'UserInfoUpdate' | 'LoadOpen' | 'LoadClose' | 'PingData' | 'TopBarShow' | 'TopBarHide';
}

export function reducer(state: any, action: actionType) {
  if (action.type === 'CountAdd') {
    return {
      ...state,
      count: state.count + 1,
    };
  }

  if (action.type === 'LoadOpen') {
    return {
      ...state,
      Loading: true,
    };
  }
  if (action.type === 'LoadClose') {
    return {
      ...state,
      Loading: false,
    };
  }

  if (action.type === 'TopBarShow') {
    mStorage.set('TopBarVisible', true);
    return {
      ...state,
      TopBarVisible: true,
    };
  }
  if (action.type === 'TopBarHide') {
    mStorage.set('TopBarVisible', false);
    return {
      ...state,
      TopBarVisible: false,
    };
  }

  if (action.type === 'PingData') {
    const PingData = mStorage.get('ping');
    return {
      ...state,
      PingData,
    };
  }

  if (action.type === 'UserInfoUpdate') {
    const localUserInfo = getLocalUserInfo();

    let IsRoot = false;
    if (localUserInfo.Email === '670188307@qq.com') {
      IsRoot = true;
    }

    return {
      ...state,
      IsRoot,
      UserInfo: localUserInfo,
    };
  }

  return state;
}

export const StoreContext = React.createContext(initialState);
export const StoreUpdate = React.createContext((state: actionType) => {});
