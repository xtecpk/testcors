import { Oval } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Bootstrap spinner */}

        {/* The Oval spinner will show while loading */}
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
