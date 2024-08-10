import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { routes } from "./Routes";
import Register from "./auth/Register";
import Login from "./auth/Login";
import AdminPanel from "./Components/AdminPanel";

function App() {
  const nonNavbarRoutes = ["/adminpanel"];
  const location = useLocation();
  const isHide = nonNavbarRoutes.includes(location.pathname);

  return (
    <main>
      {!isHide && <Navbar />}

      <Routes>
        {routes.map(({ path, Element }, i) => {
          return <Route key={i} path={path} element={<Element />} />;
        })}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="adminpanel" element={<AdminPanel />} />
      </Routes>
    </main>
  );
}

export default App;
