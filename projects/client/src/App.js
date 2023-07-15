import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./pages/Login";
import EmployeeLandingPage from "./pages/employee/EmployeeLandingPage";
import AdminLandingPage from "./pages/admin/AdminLandingPage";
import AttendanceHistory from "./pages/employee/AttendanceHistory";
import PayrollReports from "./pages/employee/PayrollReports";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedElement />}>
            <Route
              index
              element={
                <RoleGuard allowedRoles={["employee"]}>
                  <LandingPage />
                </RoleGuard>
              }
            />
            <Route
              path="history"
              element={
                <RoleGuard allowedRoles={["employee"]}>
                  <AttendanceHistory />
                </RoleGuard>
              }
            />
            <Route
              path="payroll"
              element={
                <RoleGuard allowedRoles={["employee"]}>
                  <PayrollReports />
                </RoleGuard>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const ProtectedElement = () => {
  const { user } = useAuth();
  // return user ? <Outlet /> : <Navigate to="/login" />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  // return user && allowedRoles.includes(user.role) ? (
  //   children
  // ) : (
  //   <Navigate to="/" />
  // );
  return children;
};

const LandingPage = () => {
  const { user } = useAuth();
  // return user.role === "admin" ? <AdminLandingPage /> : <EmployeeLandingPage />;
  return <EmployeeLandingPage />;
};

export default App;
