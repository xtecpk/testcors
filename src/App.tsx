import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authencation/log-in/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/protected/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
