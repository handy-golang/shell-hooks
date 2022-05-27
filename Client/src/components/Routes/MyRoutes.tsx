import React from 'react';
import { message } from 'antd';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/utils';

// https://juejin.cn/post/7033313711947251743

const Home = React.lazy(() => import('@/pages/Home'));

const Demo = React.lazy(() => import('@/pages/Demo'));
const Login = React.lazy(() => import('@/pages/Login'));
const EditPassword = React.lazy(() => import('@/pages/EditPassword'));
const EditUserInfo = React.lazy(() => import('@/pages/EditUserInfo'));
const Hunter = React.lazy(() => import('@/pages/Hunter'));

const NotFund = React.lazy(() => import('@/pages/NotFund'));
const Personal = React.lazy(() => import('@/pages/Personal'));

// Hunter
const HunterList = React.lazy(() => import('@/pages/Hunter/List'));
const CreateOkxKey = React.lazy(() => import('@/pages/Hunter/CreateOkxKey'));
const CreateServer = React.lazy(() => import('@/pages/Hunter/CreateServer'));
const ServerInfo = React.lazy(() => import('@/pages/Hunter/ServerInfoView'));

// About
const About = React.lazy(() => import('@/pages/About'));
const AboutList = React.lazy(() => import('@/pages/About/List'));
const AboutPwa = React.lazy(() => import('@/pages/About/PWA'));
const ReleaseNotes = React.lazy(() => import('@/pages/About/ReleaseNotes'));
const AboutOkxKey = React.lazy(() => import('@/pages/About/OkxKey'));
const AboutHunterServer = React.lazy(() => import('@/pages/About/HunterServer'));
const AboutDuty = React.lazy(() => import('@/pages/About/Duty'));

const logins = ['/edit_user_info', '/hunter', '/personal'];
function MyRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = getToken();

    if (!token) {
      if (logins.indexOf(pathname) > -1) {
        message.warning('需要登录');
        setTimeout(() => {
          navigate(`/login`, { replace: true });
        }, 300);
      }
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/login" element={<Login type="Login" />} />
      <Route path="/edit_password" element={<EditPassword />} />
      <Route path="/edit_user_info" element={<EditUserInfo />} />
      <Route path="/register" element={<Login type="Register" />} />

      <Route path="/about" element={<About />}>
        <Route index element={<AboutList />} />
        <Route path="/about/pwa" element={<AboutPwa />} />
        <Route path="/about/release_notes" element={<ReleaseNotes />} />
        <Route path="/about/okxkey" element={<AboutOkxKey />} />
        <Route path="/about/hunter_server" element={<AboutHunterServer />} />
        <Route path="/about/duty" element={<AboutDuty />} />
      </Route>

      <Route path="/hunter" element={<Hunter />}>
        <Route index element={<HunterList />} />
        <Route path="/hunter/create_okx_keys" element={<CreateOkxKey />} />
        <Route path="/hunter/create_server" element={<CreateServer />} />
        <Route path="/hunter/info/:id" element={<ServerInfo />} />
      </Route>

      <Route path="*" element={<NotFund />} />
    </Routes>
  );
}

export default MyRoutes;
