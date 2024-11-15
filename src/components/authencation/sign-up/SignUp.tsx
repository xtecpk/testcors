import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Reset error message if no errors
    setErrorMessage("");
    setSuccessMessage("");

    // Simulate saving the user data locally (no API)
    const savedUser = { email, password }; // Save to local storage or local state

    // You can store the user data in localStorage or just use it within the app for now.
    localStorage.setItem("user", JSON.stringify(savedUser));

    // Display success message
    setSuccessMessage("Account created successfully! Please login.");
    
    // Clear form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light blue">
      <div className="row shadow-lg w-75 h-75 rounded-md" id="signup-card">
        
        {/* Left Panel */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center bg-[#f1f1f1] text-white p-4 rounded-start">
          <div className="logo mb-4">
            <img src="./logo.svg" alt="Coaching Hub Logo" className="w-72" />
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="col-md-6 p-5 d-flex flex-column align-items-center justify-content-center bg-white rounded-e-md">
          <div className="text-center mb-4">
            <h4 className="mb-3 text-2xl font-bold text-black">Sign Up</h4>
            <p className="text-black text-lg font-semibold">Create an account to access the dashboard</p>
          </div>
          <form className="w-80" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="inter fw-bold pt-2 pb-2">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="inter fw-bold pt-2 pb-2">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="inter fw-bold pt-2 pb-2">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Error or Success Messages */}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">{successMessage}</div>}

            <button type="submit" className="btn blue w-100 text-white inter">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account? <Link to="/login" className="text-primary">Sign In</Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;
