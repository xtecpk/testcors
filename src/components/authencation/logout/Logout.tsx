interface LogoutProps {
  logout: () => void; // Function to log the user out
  closeModal: () => void; // Function to close the logout modal
  viewProfile: () => void; // Function to view the profile
}

const Logout: React.FC<LogoutProps> = ({ logout, closeModal, viewProfile }) => {
  return (
    <div className="border rounded shadow-lg bg-white w-72 p-2">
      <div className="d-flex justify-content-between align-items-start">
        <strong className="px-2">Account Options</strong>
      </div>
      <p className="mb-0 text-muted m-2">What would you like to do?</p>
      <div className="d-flex flex-column">
        <button
          onClick={() => {
            closeModal();
            viewProfile();
          }}
          className="green w-64 p-2 px-40 rounded-lg text-white font-semibold inter my-3 mx-2"
        >
          View Profile
        </button>
        <button
          onClick={() => {
            logout();
            closeModal();
          }}
          className="btn btn-danger text-white px-4 my-2 mx-2"
        >
          Yes, log out
        </button>
      </div>
    </div>
  );
};

export default Logout;
