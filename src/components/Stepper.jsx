// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import { Steps, Button } from "keep-react";
import { UploadSimple, MagicWand, ImageSquare, DownloadSimple } from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function Stepper({ isImageUploaded, result, selectedProposal }) {
  const [isImageValid, setIsImageValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const stepPaths = ["/cargaplano", "/personalizacion", "/propuestas", "/exportacion"];
  const currentStepIndex = stepPaths.indexOf(location.pathname);

  useEffect(() => {
    if (result) {
      const isValid = validateImage(result);
      setIsImageValid(isValid);
    }
  }, [result]);

  const handleNext = () => {
    if (currentStepIndex < stepPaths.length - 1) {
      navigate(stepPaths[currentStepIndex + 1]);
    } else {
      navigate("/inicio");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(stepPaths[currentStepIndex - 1]);
    }
  };

  const validateImage = (result) => {
    if (result.predicted_class === "planos" && result.confidence >= 80) {
      return true;
    }
    return false;
  };

  const isNextDisabled = (currentStepIndex === 0 && (!isImageUploaded || !isImageValid)) ||
                         (currentStepIndex === 1 && !isImageUploaded) ||
                         (currentStepIndex === 2 && selectedProposal === null);

  return (
    <div className="flex justify-center items-center">
      <Steps stepType="icon" className="space-x-4">
        <Steps.Item
          active={currentStepIndex === 0}
          completed={currentStepIndex > 0}
          icon={<UploadSimple size={20} />}
          title="Carga de planos"
          className="w-48"
        />
        <Steps.Item
          active={currentStepIndex === 1}
          completed={currentStepIndex > 1}
          icon={<MagicWand size={20} />}
          title="Personalización"
          className="w-48"
        />
        <Steps.Item
          active={currentStepIndex === 2}
          completed={currentStepIndex > 2}
          icon={<ImageSquare size={20} />}
          title="Propuestas"
          className="w-48"
        />
        <Steps.Item
          active={currentStepIndex === 3}
          completed={currentStepIndex > 3}
          icon={<DownloadSimple size={20} />}
          title="Exportación"
          className="w-48"
        />
      </Steps>

      <div className="fixed bottom-4 left-10 flex items-center justify-end">
        {currentStepIndex !== 0 && currentStepIndex !== stepPaths.length - 1 && (
          <Button size="sm" onClick={handleBack}>
            Atrás
          </Button>
        )}
      </div>
      <div className={`fixed bottom-4 ${currentStepIndex === 0 || currentStepIndex === stepPaths.length - 1 ? 'left-1/2 transform -translate-x-1/2' : 'right-10'} flex items-center justify-end`}>
        <Button
          size="sm"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          {currentStepIndex >= 3 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}

Stepper.propTypes = {
  isImageUploaded: PropTypes.bool.isRequired,
  result: PropTypes.object,
  selectedProposal: PropTypes.number, // Añadido prop para manejar la propuesta seleccionada
};

export default Stepper;
