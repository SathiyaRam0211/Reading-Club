import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext";

const AppRoutes = () => {
  const { session } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {session !== "" && <Route path="/admin" element={<Admin />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
