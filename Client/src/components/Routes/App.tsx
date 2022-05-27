import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { removeToken, setToken, mStorage } from '@/utils/utils';

import { StoreContext, StoreUpdate, reducer, initialState } from '@/store';

const MyRoutes = React.lazy(() => import('./MyRoutes'));
const TopBar = React.lazy(() => import('@/components/TopBar'));
const Loading = React.lazy(() => import('@/components/Loading'));

import { postPing } from '@/api/ping';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: 'UserInfoUpdate' });

    postPing().then((res) => {
      if (res.Code > 0) {
        const Token = res.Data.Token;
        if (Token) {
          setToken(Token).then(() => {
            dispatch({ type: 'UserInfoUpdate' });
          });
        }
        mStorage.set('ping', res.Data);
        dispatch({ type: 'PingData' });
      } else {
        removeToken();
      }

      const topBarIs = mStorage.get('TopBarVisible');
      if (topBarIs === false) {
        dispatch({ type: 'TopBarHide' });
      } else {
        dispatch({ type: 'TopBarShow' });
      }
    });
  }, []);

  return (
    <StoreContext.Provider value={state}>
      <StoreUpdate.Provider value={dispatch}>
        <Router>
          <Loading visible={state.Loading} />
          <TopBar />
          <MyRoutes />
        </Router>
      </StoreUpdate.Provider>
    </StoreContext.Provider>
  );
}

export default App;
