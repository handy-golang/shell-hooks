import { Outlet } from 'react-router-dom';

import './index.less';

function About() {
  return (
    <div className="About">
      <Outlet />
    </div>
  );
}

export default About;
