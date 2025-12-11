import { Navigate } from "react-router-dom";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

function ProtectedRoute({ allowedRoles, children }) {
  const { employee } = useEmployeeAuth();

  if (!employee) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(employee.roleId)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
