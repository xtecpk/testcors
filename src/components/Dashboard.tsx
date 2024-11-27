import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard1 from '../pages/neiudash/Dash';
import Neiuprocure from '../pages/neiuprocure/Nieuprocure';
import NieuFinance from '../pages/nieufinance/NieuFinance';
import NieuCal from '../pages/nieucal/NieuCal';
import NieuTemplate from '../pages/nieutemplate/NieuTemplate';
import NieuZoneAdvance from '../pages/nieuzone-advance/NieuZoneAdvance';
import NieuZoneIntermediate from '../pages/nieuzone-intermediate/NieuZoneIntermediate';
import NieuZoneBasic from '../pages/nieuzone-basic/NieuZoneBasic';
import NeiuZone from '../pages/nieuzone/NeiuZone';
import NieuWorkForce from '../pages/nieuworkforce/NieuWorkForce';
import NieuComs from '../pages/nieucoms/NieuComs';
import NieuAdmin from '../pages/nieuadmin/NieuAdmin';
import NieuManage from '../pages/nieumanage/NieuManage';
import NieuSet from '../pages/nieuset/NieuSet';
import NieuMatrix from '../pages/nieumatrix/NieuMatrix';
import NieuStock from '../pages/nieustock/NieuStock'; // Import the ProtectedRoute
import NieuGuard1 from '../pages/nieuguard/NieuGuard1';
const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // For navigation after successful login

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  // Check if token exists when component is loaded
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <div className="d-flex bg-blue-500">
      <Sidebar onSidebarToggle={handleSidebarToggle} />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? '290px' : '70px',
          transition: 'margin-left 0.3s',
        }}
      >
        <Header />
        <div
          className="p-4"
          style={{
            backgroundColor: '#D9D9D9',
            transition: 'margin-left 0.3s',
          }}
        >
          <Routes>
            {/* Define all protected routes here */}
            <Route path="/NIEUDASH" element={<Dashboard1 />} />
            <Route path="/NIEUPROCURE" element={<Neiuprocure />} />
            <Route path="/NIEUSTOCK" element={<NieuStock />} />
            <Route path="/NIEUMATRIX" element={<NieuMatrix />} />
            <Route path="/NIEUSET" element={<NieuSet />} />
            <Route path="/NIEUMANAGE" element={<NieuManage />} />
            <Route path="/NIEUADMIN" element={<NieuAdmin />} />
            <Route path="/NIEUCOMS" element={<NieuComs />} />
            <Route path='/NIEUGUARD' element={< NieuGuard1 />} />
            <Route path="/NIEUWORKFORCE" element={<NieuWorkForce />} />
            <Route path="/NIEUZONE" element={<NeiuZone />} />
            <Route path="/NIEUZONE_BASIC" element={<NieuZoneBasic />} />
            <Route path="/NIEUZONE_INTERMEDIATE" element={<NieuZoneIntermediate />} />
            <Route path="/NIEUZONE_ADVANCE" element={<NieuZoneAdvance />} />
            <Route path="/NIEUTEMPLATE" element={<NieuTemplate />} />
            <Route path="/NIEUCAL" element={<NieuCal />} />
            <Route path="/NIEUFINANCE" element={<NieuFinance />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
