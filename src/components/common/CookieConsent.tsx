import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  // Check if the user has already given consent when the component mounts
  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setShowConsent(true); // Show the consent banner if not accepted
    }
  }, []);

  const handleAccept = () => {
    // Store the cookie consent with 30 minutes expiry 
    Cookies.set('cookieConsent', 'true', { expires: 30 / 1440, path: '/' });
    setShowConsent(false); 
  };

  return (
    showConsent && (
      <div className="fixed-bottom bg-dark text-white py-3 text-center">
        <p className="mb-2">
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.
        </p>
        <button className="btn btn-success" onClick={handleAccept}>
          Accept All Cookies
        </button>
      </div>
    )
  );
};

export default CookieConsent;
