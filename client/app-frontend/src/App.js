import React, { useState } from "react";
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Usuarios from "./pages/Usuarios"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
