import { createContext, useState } from "react";
import { loginEmployee, logoutEmployee } from "../services/employeesService";

const EmployeeAuthContext = createContext(null);

export function EmployeeAuthProvider({ children }) {
  const [employee, setEmployee] = useState(() => {
    const stored = localStorage.getItem("employee");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (credentials) => {
    const data = await loginEmployee(credentials);
    setEmployee(data.employee);
  };

  const logout = () => {
    logoutEmployee();
    setEmployee(null);
  };

  return (
    <EmployeeAuthContext.Provider value={{ employee, login, logout }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export default EmployeeAuthContext;
