import { Route, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../hooks/useStateContext';

const PrivateRoute = () => {
  const { context } = useStateContext();
  const isAuthenticated = context.participantId === 0 ? false : true;

  return (
    isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute