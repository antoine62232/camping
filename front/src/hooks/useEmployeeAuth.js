import { useContext } from "react";
import EmployeeAuthContext from "../context/EmployeeAuthContext";

export const useEmployeeAuth = () => useContext(EmployeeAuthContext);
