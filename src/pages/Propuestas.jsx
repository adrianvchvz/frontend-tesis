// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext, useCallback } from "react";
import Stepper from "../components/Stepper";
import { Spinner } from "keep-react";
import ParametersContext from "../ParametersContext";
import { Button } from "keep-react";
import { IoReload } from "react-icons/io5";

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

  const fetchImages = useCallback(() => {
    setLoadingImages([true, true]);
    fetch("https://da3d-104-198-132-25.ngrok-free.app/generate_plans", {
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
          setLoadingImages([false, false]);
        }
      })
      .catch((error) => {
        setError(error.toString());
        setLoadingImages([false, false]);
      });
  }, [parameters]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleCheckboxChange = (index) => {
    setSelectedProposal(index);
    localStorage.setItem("selectedProposalImage", images[index]);
  };

  return (
    <div className="container mx-auto">
      <Stepper selectedProposal={selectedProposal} />
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center h-72 w-72 justify-center">
              {loadingImages[0] ? (
                <SpinnerComponent />
              ) : (
                images[0] && (
                  <img
                    src={`data:image/png;base64,${images[0]}`}
                    alt="Propuesta 1"
                    className="w-72 h-72 object-contain"
                  />
                )
              )}
            </div>
            <div className="mt-8 flex items-center">
              <h2 className="text-sm font-semibold">PROPUESTA 1</h2>
              <input
                type="checkbox"
                checked={selectedProposal === 0}
                onChange={() => handleCheckboxChange(0)}
                className="ml-2"
              />
            </div>
          </div>
          <div className="flex flex-col items-center mx-24">
            <Button
              size="sm"
              onClick={fetchImages}
              className="py-1 h-8 flex items-center justify-center mb-16"
            >
              <IoReload />
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center h-72 w-72 justify-center">
              {loadingImages[1] ? (
                <SpinnerComponent />
              ) : (
                images[1] && (
                  <img
                    src={`data:image/png;base64,${images[1]}`}
                    alt="Propuesta 2"
                    className="w-72 h-72 object-contain"
                  />
                )
              )}
            </div>
            <div className="mt-8 flex items-center">
              <h2 className="text-sm font-semibold">PROPUESTA 2</h2>
              <input
                type="checkbox"
                checked={selectedProposal === 1}
                onChange={() => handleCheckboxChange(1)}
                className="ml-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Propuestas;
