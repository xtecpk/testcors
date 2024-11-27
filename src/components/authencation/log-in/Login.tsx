import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance'; // Import axios instance
import { AxiosError } from 'axios';
import Loader from '../../Loader';

const Login: React.FC = () => {
  const [employeeid, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for handling the loader visibility
  const navigate = useNavigate();

  // Redirect user to the dashboard if already logged in
  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      navigate('/NIEUDASH');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true); // Show loader when login is in progress
  
    if (!employeeid.trim() || !password.trim()) {
      setErrorMessage('Please provide both Employee ID and Password.');
      setLoading(false); // Hide loader if form is incomplete
      return;
    }
  
    console.log('Attempting login with:', { employeeid, password });
  
    try {
      const response = await axiosInstance.post('auth/login', {
        employeeid,
        password,
      });
  
      console.log('Server Response:', response);
  
      if (response.status === 200 && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful. Token:', response.data.token);
        navigate('/NIEUDASH');
      } else {
        setErrorMessage(response.data?.message || 'Login failed.');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('AxiosError:', error.response);
        setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      } else if (error instanceof Error) {
        console.error('Error:', error);
        setErrorMessage(error.message);
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Hide loader after login attempt
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-[#f1f1f1]">
      {loading ? (
        // Show the loader while loading
        <Loader />
      ) : (
        // Show the login form if not loading
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
            <form className="w-96" onSubmit={handleLogin}>
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
              <p>Forgotten </p>
              <p className="mt-10">Version 1.0.8</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
