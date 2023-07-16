import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import EmployeeLandingPage from "./pages/employee/EmployeeLandingPage";
import PayrollReports from "./pages/employee/PayrollReports";
import SetPasswordPage from "./pages/SetPassword";
import AttendanceHistory from "./pages/employee/AttendanceHistory";
import AdminLandingPage from "./pages/admin";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginGuard />} />
          <Route path="/setpassword" element={<SetPasswordPage />} />
          <Route path="/" element={<ProtectedElement />}>
            <Route index element={<LandingPage />} />
            <Route
              path="history"
              element={
                <RoleGuard allowedRoles={[2]}>
                  <AttendanceHistory />
                </RoleGuard>
              }
            />
            <Route
              path="payroll"
              element={
                <RoleGuard allowedRoles={[2]}>
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

const LoginGuard = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Login />;
};

const ProtectedElement = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

const LandingPage = () => {
  const { user } = useAuth();
  return user.role === 1 ? <AdminLandingPage /> : <EmployeeLandingPage />;
};

export default App;
