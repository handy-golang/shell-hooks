import React from 'react';
const BackPage = React.lazy(() => import('@/components/BackPage'));
function AboutOkxKey() {
  return (
    <div className="AboutOkxKey">
      <BackPage>Back</BackPage>
      <h3> okx 密钥申请指南 </h3>
    </div>
  );
}

export default AboutOkxKey;
