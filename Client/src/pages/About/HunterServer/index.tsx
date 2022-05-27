import React from 'react';
const BackPage = React.lazy(() => import('@/components/BackPage'));
function AboutHunterServer() {
  return (
    <div className="AboutHunterServer">
      <BackPage>Back</BackPage>
      <h3> Hunter 工作原理 </h3>
    </div>
  );
}

export default AboutHunterServer;
