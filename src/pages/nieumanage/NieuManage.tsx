import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axiosInstance from "../../axiosInstance";
import ViewManageModal from "./modal/ViewManageModal";
import AddManage from "./modal/AddMAnage";

interface User {
  employeeid: string | null;
  avatar: string | null;
  name: string | null;
  personalemail: string | null;
  role: string | null;
  phone: string | null;
  workemail: string | null;
  status: string | null;
}

interface CategoryData {
  no: number;
  employeeID: string;
  avatar: string;
  userName: string;
  personalEmail: string;
  role: string;
  phoneNo: string;
  email: string;
  status: string;
  view?: string;
}

interface DashboardStats {
  total: number;
  active: number;
  inactive: number;
  superAdmin: number;
}

function NieuManage() {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [superAdminCount, setSuperAdminCount] = useState<number>(0);

  const columnDefs: ColDef<CategoryData>[] = [
    { field: "no", flex: 1, headerName: "No.", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "employeeID", flex: 1, headerName: "Employee ID", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    {
      field: "avatar",
      flex: 1,
      headerName: "Avatar",
      editable: false,
      cellRenderer: (params: ICellRendererParams<CategoryData>) => {
        const imageUrl = params.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            style={{ width: "35px", height: "35px", objectFit: "cover", borderRadius: "50%" }}
            crossOrigin="anonymous"
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    { field: "userName", flex: 1, headerName: "User Name", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "personalEmail", flex: 1, headerName: "Personal Email", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "role", flex: 1, headerName: "Role", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "phoneNo", flex: 1, headerName: "Phone No", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "email", flex: 1, headerName: "Email", filter: "agTextColumnFilter", floatingFilter: true },
    {
      headerName: "Action",
      field: "view",
      cellRenderer: (params: ICellRendererParams<CategoryData>) => (
        <button
          className="btn "
          onClick={() => handleViewClick(params.data)}
        >
          View
        </button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<{ allUsers: User[] }>("user/getallusers");
      const users = response.data.allUsers.map((user, index) => ({
        no: index + 1,
        employeeID: user.employeeid || "N/A",
        avatar: user.avatar
          ? `https://nieucore.com/backend/${user.avatar}`
          : "https://nieucore.com/backend/uploads/public/images/default-avatar.png",
        userName: user.name || "N/A",
        personalEmail: user.personalemail || "N/A",
        role: user.role || "N/A",
        phoneNo: user.phone || "N/A",
        email: user.workemail || "N/A",
        status: user.status || "N/A",
      }));
      setRowData(users);
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (user: CategoryData | undefined) => {
    if (user) {
      // Assuming user is of type CategoryData when passed from cellRenderer
      const fullUser: User = {
        employeeid: user.employeeID,
        avatar: user.avatar,
        name: user.userName,
        personalemail: user.personalEmail,
        role: user.role,
        phone: user.phoneNo,
        workemail: user.email,
        status: user.status,
      };
      setSelectedUser(fullUser);
      setShowViewModal(true);
    }
  };
  const fetchCardData = async () => {
    try {
      const response = await axiosInstance.get<DashboardStats>("/dashboard/stats");
      const { total, active, inactive, superAdmin } = response.data;

      setTotalUsers(total);
      setActiveUsers(active);
      setInactiveUsers(inactive);
      setSuperAdminCount(superAdmin);
    } catch (error) {
      console.error("Failed to fetch card data:", error);
    }
  };

  const handleModalClose = () => {
    setShowDetails(false);
    setShowViewModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchData();
    fetchCardData();
  }, []);
  return (
    <>
      <div className="container-fluid min-vh-100">
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUMANAGE</h3>
        <div className="container-fluid">
        <div className="row">
        {[
          { label: "Total", count: totalUsers },
          { label: "Active", count: activeUsers },
          { label: "Inactive", count: inactiveUsers },
          { label: "Super Admin", count: superAdminCount },
        ].map(({ label, count }, index) => (
          <div className="col" key={index}>
            <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
              {label} <br />
              <strong className="mt-1">{count}</strong>
            </div>
          </div>
        ))}
      </div>
          <div className="d-flex justify-content-end m-3 align-items-center">
            <button
              className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
              onClick={() => setShowDetails(true)}
            >
              Add & Manage
              <img src="./add.png" alt="add.png" />
            </button>
          </div>
          <div className="ag-theme-quartz mt-3" style={{ height: "600px", width: "100%" }}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                getRowHeight={() => 50}
                pagination
                paginationPageSize={15}
                onGridReady={(params) => params.api.sizeColumnsToFit()}
              />
            )}
          </div>
        </div>
      </div>
      <AddManage show={showDetails} onHide={handleModalClose} />
      <ViewManageModal show={showViewModal} onHide={handleModalClose} user={selectedUser} /> 
    </>
  );
}

export default NieuManage;
