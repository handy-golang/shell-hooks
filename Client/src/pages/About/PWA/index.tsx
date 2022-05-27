import React from 'react';
const BackPage = React.lazy(() => import('@/components/BackPage'));
function AboutPwa() {
  return (
    <div className="AboutPwa">
      <BackPage>Back</BackPage>
      <h3>PWA 应用安装指南</h3>
    </div>
  );
}

export default AboutPwa;
