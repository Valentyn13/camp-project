import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePageContainer from '../home/home.container';
import LoginPageContainer from '../login/login.container';
import RegisterPageContainer from '../register/register.container';
import { APP_KEYS } from '../common/consts';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<HomePageContainer />} path={`${APP_KEYS.ROUTER_KEYS.ROOT}`} />
      <Route element={<LoginPageContainer />} path={`${APP_KEYS.ROUTER_KEYS.LOGIN}`} />
      <Route
        element={<RegisterPageContainer />}
        path={`${APP_KEYS.ROUTER_KEYS.REGISTERSTRATION}`}
      />
    </Routes>
  </BrowserRouter>
);
