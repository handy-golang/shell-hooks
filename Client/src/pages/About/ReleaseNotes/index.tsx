import React from 'react';
import { Avatar, Drawer, Button } from 'antd';
const BackPage = React.lazy(() => import('@/components/BackPage'));
function ReleaseNotes() {
  return (
    <div className="ReleaseNotes">
      <BackPage>Back</BackPage>
      <h3>版本说明</h3>
    </div>
  );
}

export default ReleaseNotes;
