// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const [showLetters, setShowLetters] = useState(false);
  const [mostrarTest, setMostrarTest] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setShowLetters(true);
  }, []);

  const handlePrimerTest = (respuesta) => {
    if (respuesta === "SI") {
      setMostrarTest(true);
    } else {
      navigate("/");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSiguiente = () => {
    if (selectedOption !== null) {
      switch (selectedOption) {
        case "opcion1":
          navigate("/cargabase");
          break;
        case "opcion2":
          navigate("/carganube");
          break;
        case "opcion3":
          navigate("/cargaplano");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {!mostrarTest ? (
        <div className="text-center mt-32 ">
          <h1 className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-black-600 md:text-4xl lg:text-5xl">
            <span
              className={`block transition-transform duration-500 ${
                showLetters ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              ¡Bienvenidos al sistema de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-400 ">
                House Capital!
              </span>
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">
            Cuéntanos... ¿Deseas remodelar el plano de tu casa?
          </p>
          <div className="mt-12">
            <button
              onClick={() => handlePrimerTest("SI")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                SI
              </span>
            </button>
            <button
              onClick={() => handlePrimerTest("NO")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                NO
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mt-12">
            <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Genial...
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">
              Para poder ayudarte necesitamos saber un poco más sobre tu
              predio..
            </p>
          </div>

          <div className="flex justify-between mt-12">
            <div className="flex flex-col">
              <p className="text-lg font-normal text-gray-500 lg:text-lg dark:text-black mb-4">
                Selecciona la opción que se ajuste mejor a tus necesidades.
              </p>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-2"
                  onChange={handleOptionChange}
                  value="opcion1"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Mi casa fue adquirida mediante el programa de Techo Propio y
                  cuenta con una estructura inicial proporcionada por el mismo
                  programa.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-2"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-2"
                  onChange={handleOptionChange}
                  value="opcion2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Adquirí mi casa como un terreno y no tengo acceso a un plano
                  de construcción.
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-3"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-2"
                  onChange={handleOptionChange}
                  value="opcion3"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Deseo remodelar mi casa y tengo el plano correspondiente
                  disponible.
                </label>
              </div>
              <div className="text-center mt-12">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
                  onClick={handleSiguiente}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                    SIGUIENTE
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
