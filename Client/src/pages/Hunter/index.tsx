/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './index.less';
import { Card } from 'antd';
import { getHunterInfo, HunterDataType, HunterParamType } from '@/api/hunter';
import { Outlet } from 'react-router-dom';

import { HunterData_initial, HunterContext, UpdateHunter } from './HunterContext';

import { cloneDeep } from '@/utils/utils';
import { StoreUpdate } from '@/store';

function Hunter() {
  const dispatch = React.useContext(StoreUpdate);

  const [hunterData, setHunterData] = React.useState<HunterDataType>(HunterData_initial);
  const fetchData = async (pwd = '') => {
    dispatch({ type: 'LoadOpen' });

    const res = await getHunterInfo({ Password: pwd });
    if (res.Code > 0) {
      const { HunterServerList, OkxKeyList } = res.Data;
      const resHunterData = cloneDeep(HunterData_initial) as HunterDataType;

      if (OkxKeyList && OkxKeyList.length > 0) {
        resHunterData.OkxKeyList = OkxKeyList;
      }
      if (HunterServerList && HunterServerList.length > 0) {
        resHunterData.HunterServerList = HunterServerList;
      }

      setHunterData(resHunterData);
    }
    dispatch({ type: 'LoadClose' });
  };

  React.useEffect(() => {
    fetchData(hunterData.Password);
  }, []);

  const handleUpdate = React.useCallback((data: HunterDataType) => {
    if (data.Password) {
      fetchData(data.Password);
    }
  }, []);

  return (
    <div className="Hunter">
      <HunterContext.Provider value={hunterData}>
        <UpdateHunter.Provider value={handleUpdate}>
          <Outlet />
        </UpdateHunter.Provider>
      </HunterContext.Provider>
    </div>
  );
}

export default Hunter;
