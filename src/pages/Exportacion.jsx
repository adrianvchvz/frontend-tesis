// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Stepper from "../components/Stepper";
import { Button } from "keep-react";

function Exportacion() {
  const selectedProposalImage = localStorage.getItem("selectedProposalImage");
  const [format, setFormat] = useState("png"); // Estado para el formato de la imagen

  const handleDownload = () => {
    if (!selectedProposalImage) return;

    const link = document.createElement("a");
    link.href = `data:image/${format};base64,${selectedProposalImage}`;
    link.download = `plano_remodelado.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <Stepper />
      <div className="grid grid-cols-2 gap-24 mt-10">
        {selectedProposalImage ? (
          <>
            <div className="flex justify-end items-center">
              <img
                src={`data:image/png;base64,${selectedProposalImage}`}
                alt="Imagen seleccionada"
                className="w-72 h-72 object-contain"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-lg font-semibold mb-4">
                ESPECIFICACIONES DE DESCARGA
              </h2>
              <div className="mt-4 flex flex-col items-start">
                <div className="flex items-center mb-6">
                  <label htmlFor="format" className="mr-2">
                    Formato:
                  </label>
                  <select
                    id="format"
                    value={format}
                    onChange={handleFormatChange}
                    className="mr-4 p-2 border rounded"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPG</option>
                  </select>
                </div>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="mt-2 py-1 h-8 flex items-center justify-center"
                >
                  Descargar Plano
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center col-span-2">
            No se ha seleccionado ninguna imagen.
          </p>
        )}
      </div>
    </div>
  );
}

export default Exportacion;
