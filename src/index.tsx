import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <PrivateRoute component={HomePage} path='/' />
        <LoginPage path='/login' />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
