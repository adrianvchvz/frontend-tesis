// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import CargaPlano from "./pages/CargaPlano";
import CargaBase from "./pages/CargaBase";
import CargaNube from "./pages/CargaNube";
import Personalizacion from "./pages/Personalizacion";
import Propuestas from "./pages/Propuestas";
import Exportacion from "./pages/Exportacion";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="inicio" element={<Inicio />} />
                <Route path="cargaplano" element={<CargaPlano />} />
                <Route path="cargabase" element={<CargaBase />} />
                <Route path="carganube" element={<CargaNube />} />
                <Route path="personalizacion" element={<Personalizacion />} />
                <Route path="propuestas" element={<Propuestas />} />
                <Route path="exportacion" element={<Exportacion />} />
                <Route path="reportes" element={<Reportes />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
