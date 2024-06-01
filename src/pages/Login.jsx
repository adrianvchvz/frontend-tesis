// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Imagen from "../assets/persona.png";
import ImageProfile from "../assets/logo.png";
import ImageRedesLogo from "../assets/redes-sociales.png";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        usuario: usuario,
        clave: clave,
      });

      console.log(response.data);
      navigate("/inicio");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="md:w-1/3 ml-12">
        <div className="p-4 shadow-lg mt-8 relative z-20 rounded-md border">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto mt-4 h-16 w-auto" src={ImageProfile} alt="Profile" />
              <h2 className="mt-8 text-center text-xl font-bold leading-9 tracking-tight font-outfit">
                INICIAR SESIÓN
              </h2>
            </div>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="mt-2 relative">
                    <FaRegUser
                      size={15}
                      color="#AFBACA"
                      className="absolute left-2.5 top-2.5"
                    />
                    <input
                      type="text"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                      placeholder="USUARIO"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2 relative">
                    <RiLockPasswordLine
                      size={15}
                      color="#AFBACA"
                      className="absolute left-2.5 top-2.5"
                    />
                    <input
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="CONTRASEÑA"
                      className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600"
                  >
                    INGRESAR
                  </button>
                  <img
                    src={ImageRedesLogo}
                    className="mx-auto mt-4 h-12 w-auto"
                    alt="Redes"
                  />
                </div>
              </form>
            </div>
          </div>
          <img src={Imagen} className="absolute top-0 right-20 h-full object-cover" alt="Imagen" />
        </div>
      </div>
    </>
  );
}
