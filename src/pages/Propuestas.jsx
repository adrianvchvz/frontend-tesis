// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import Stepper from "../components/Stepper";
import { Spinner } from "keep-react";
import ParametersContext from '../ParametersContext';

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="info" size="lg" />
    </div>
  );
};

function Propuestas() {
  const { parameters } = useContext(ParametersContext);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [loadingImages, setLoadingImages] = useState([true, true]); 

  useEffect(() => {
    fetch("https://9e23-35-201-212-32.ngrok-free.app/generate_plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setImages(data.generated_images);
          setLoadingImages([false, false]);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError(error.toString());
        setLoadingImages([false, false]);
      });
  }, [parameters]);

  const handleCheckboxChange = (index) => {
    setSelectedProposal(index);
    localStorage.setItem('selectedProposalImage', images[index]); // Guardar la imagen seleccionada en localStorage
  };

  return (
    <div className="container mx-auto">
      <Stepper selectedProposal={selectedProposal} />
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {loadingImages.map((loading, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center h-72 w-72 justify-center">
                {loading ? (
                  <SpinnerComponent />
                ) : (
                  images[index] && (
                    <img
                      src={`data:image/png;base64,${images[index]}`}
                      alt={`Propuesta ${index + 1}`}
                      className="w-72 h-72 object-contain"
                      onLoad={() => {
                        const newLoadingImages = [...loadingImages];
                        newLoadingImages[index] = false;
                        setLoadingImages(newLoadingImages);
                      }}
                    />
                  )
                )}
              </div>
              <div className="mt-8 flex items-center">
                <h2 className="text-sm font-semibold">PROPUESTA {index + 1}</h2>
                <input
                  type="checkbox"
                  checked={selectedProposal === index}
                  onChange={() => handleCheckboxChange(index)}
                  className="ml-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Propuestas;
