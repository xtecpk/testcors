import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for type checking
import axiosInstance from '../../../axiosInstance'; // Adjust the path as needed

interface LoginProps {
  onAuthenticate: (authenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticate }) => {
  const [employeeid, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signin', { employeeid, password });
      localStorage.setItem('token', response.data.token);
      onAuthenticate(true); 
      navigate('/NIEUDASH'); 
    } catch (error) {
      console.error('Error signing in:', error);

      // Check if error is an AxiosError
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-[#f1f1f1]">
      <div className="row shadow-gray-500 w-75 h-75 rounded-xl" id="login-card">
        {/* Left Section */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center blue text-white p-4 rounded-start shadow-2xl">
          <div className="logo mb-4">
            <img src="./logo.png" alt="App Logo" className="w-80" />
          </div>
        </div>
        {/* Right Section */}
        <div className="col-md-6 p-5 d-flex flex-column align-items-center justify-content-center bg-white rounded-end-xl shadow-2xl">
          <div className="text-center mb-4">
            <h4 className="mb-3 text-2xl font-bold text-black">Login</h4>
            <p className="text-black text-lg font-semibold">
              Access your dashboard with your credentials.
            </p>
          </div>
          <form className="w-96" onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="employeeid" className="form-label fw-bold">
                Employee ID:
              </label>
              <input
                type="text"
                id="employeeid"
                className="form-control"
                placeholder="Enter your employee ID"
                value={employeeid}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                aria-label="Employee ID"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn blue w-100 text-white inter">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
