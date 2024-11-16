import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = (): boolean => {
  return !!Cookies.get('authToken'); // Check if the authToken cookie exists
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
