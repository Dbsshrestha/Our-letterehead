// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = null; // determine if authorized, from context or however you're doing it
  return auth ? children : <Navigate to="/main" />;
}

export default PrivateRoute;
