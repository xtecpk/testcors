import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dummy login check (replace with real API check later)
    if (email === 'test@example.com' && password === 'password') {
      setAuth(true); // Set authentication to true
      navigate('/NIEUDASH'); // Redirect to dashboard
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-[#f1f1f1]">
      <div className="row shadow-gray-500  w-75 h-75 rounded-xl " id="login-card">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center blue text-white p-4 rounded-start shadow-2xl shadow-gray-500">
          <div className="logo mb-4">
            <img src="./logo.png" alt="App Logo" className="w-80"  />
          </div>
        </div>
        <div className="col-md-6 p-5 d-flex flex-column align-items-center justify-content-center bg-white rounded-e-xl shadow-2xl ">
          <div className="text-center mb-4">
            <h4 className="mb-3 text-2xl font-bold text-black">Login</h4>
            <p className="text-black text-lg font-semibold">Access your dashboard with your credentials.</p>
          </div>
          <form className="w-96"  onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email Address"
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
