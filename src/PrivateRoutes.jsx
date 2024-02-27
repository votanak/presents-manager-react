import { Navigate, Outlet } from 'react-router-dom';
export const PrivateRoutes = ({ auth }) => {
  return !!auth.token ? <Outlet /> : <Navigate to="/login" />;
};
