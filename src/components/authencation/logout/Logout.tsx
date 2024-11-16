interface LogoutProps {
  logout: () => void; // Function to log the user out
  closeModal: () => void; // Function to close the logout modal
}

interface LogoutProps {
    logout: () => void; // Function to log the user out
  }
  
  const Logout: React.FC<LogoutProps> = ({ logout }) => {
    return (
      <div className="border rounded shadow-lg bg-white w-72 p-2">
        <div className="d-flex justify-content-between align-items-start">
          <strong className="px-2">Logout</strong>
        </div>
        <p className="mb-0 text-muted m-2">Are you sure you want to log out?</p>
        <button 
          onClick={logout} 
          className="btn blue text-white px-4 my-2 mx-2"
        >
          Yes, log out
        </button>
      </div>
    );
  };
  
  export default Logout;
  

