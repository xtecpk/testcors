import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/neiudash/Dashboard';
import NieuStock from './pages/nieustock/NieuStock';
import NieuMatrix from './pages/nieumatrix/NieuMatrix';
import NieuSet from './pages/nieuset/NieuSet';
import NieuManage from './pages/nieumanage/NieuManage';
import NieuAdmin from './pages/nieuadmin/NieuAdmin';
import NieuComs from './pages/nieucoms/NieuComs';
import NieuGuard from './pages/nieuguard/NieuGuard';
import NieuWorkForce from './pages/nieuworkforce/NieuWorkForce';
import NeiuZone from './pages/nieuzone/NeiuZone';
import NieuZoneBasic from './pages/nieuzone-basic/NieuZoneBasic';
import NieuZoneIntermediate from './pages/nieuzone-intermediate/NieuZoneIntermediate';
import NieuZoneAdvance from './pages/nieuzone-advance/NieuZoneAdvance';
import NieuTemplate from './pages/nieutemplate/NieuTemplate';
import NieuCal from './pages/nieucal/NieuCal';
import NieuFinance from './pages/nieufinance/NieuFinance';
import Neiuprocure from './pages/neiuprocure/Nieuprocure';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <Router>
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
              <Route path="/" element={<Dashboard />} />
              <Route path="NIEUDASH" element={<Dashboard />} />
              <Route path="/NIEUPROCURE" element={<Neiuprocure />} />
              <Route path="/NIEUSTOCK" element={<NieuStock />} />
              <Route path="/NIEUMATRIX" element={<NieuMatrix />} />
              <Route path="/NIEUSET" element={<NieuSet />} />
              <Route path="/NIEUMANAGE" element={<NieuManage />} />
              <Route path="/NIEUADMIN" element={<NieuAdmin />} />
              <Route path="/NIEUCOMS" element={<NieuComs />} />
              <Route path="/NIEUGAURD" element={<NieuGuard />} />
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
    </Router>
  );
}

export default App;
