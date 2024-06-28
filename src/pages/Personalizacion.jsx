// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../key/firebase";
import Stepper from "../components/Stepper";
import { Minus, Plus } from "phosphor-react";
import { Label, NumberInput, Spinner } from "keep-react";
import ParametersContext from '../ParametersContext';

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="info" size="lg" />
    </div>
  );
}

function Personalizacion() {
  const { parameters, setParameters } = useContext(ParametersContext);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isImageUploaded = localStorage.getItem('isImageUploaded') === 'true';
    if (isImageUploaded) {
      fetchImageURL();
    } else {
      setImageURL(""); 
      setLoading(false);
    }
  }, []);

  const fetchImageURL = async () => {
    setLoading(true); 
    const q = query(
      collection(db, "images"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const url = doc.data().url;
        console.log("URL Imagen:", url); // Agrega este console.log para verificar la URL de la imagen
        setImageURL(url);
      });
    } else {
      setImageURL(""); 
    }
    setLoading(false);
  };

  const updateParameters = (field, value) => {
    setParameters((prev) => ({ ...prev, [field]: value }));
    console.log("Parámetro actualizado:", field, value);
  };

  const isImageUploaded = !loading && imageURL !== "";

  return (
    <div className="container mx-auto">
      <Stepper isImageUploaded={isImageUploaded} />
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4 mt-6 ml-24">
          <fieldset className="space-y-1">
            <Label>Habitación</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.bedroom === 1}
                onClick={() => updateParameters('bedroom', parameters.bedroom - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={1}
                max={3}
                value={parameters.bedroom}
                onChange={(e) => updateParameters('bedroom', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.bedroom === 3}
                onClick={() => updateParameters('bedroom', parameters.bedroom + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Baño</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.bathroom === 1}
                onClick={() => updateParameters('bathroom', parameters.bathroom - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={1}
                max={3}
                value={parameters.bathroom}
                onChange={(e) => updateParameters('bathroom', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.bathroom === 3}
                onClick={() => updateParameters('bathroom', parameters.bathroom + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Cocina</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.kitchen === 1}
                onClick={() => updateParameters('kitchen', parameters.kitchen - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={1}
                max={3}
                value={parameters.kitchen}
                onChange={(e) => updateParameters('kitchen', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.kitchen === 3}
                onClick={() => updateParameters('kitchen', parameters.kitchen + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Sala</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.living_room === 0}
                onClick={() => updateParameters('living_room', parameters.living_room - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={3}
                value={parameters.living_room}
                onChange={(e) => updateParameters('living_room', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.living_room === 3}
                onClick={() => updateParameters('living_room', parameters.living_room + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Comedor</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.dining_room === 0}
                onClick={() => updateParameters('dining_room', parameters.dining_room - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={3}
                value={parameters.dining_room}
                onChange={(e) => updateParameters('dining_room', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.dining_room === 3}
                onClick={() => updateParameters('dining_room', parameters.dining_room + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Garaje</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={parameters.garage === 0}
                onClick={() => updateParameters('garage', parameters.garage - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={2}
                value={parameters.garage}
                onChange={(e) => updateParameters('garage', +e.target.value)}
              />
              <NumberInput.Button
                disabled={parameters.garage === 2}
                onClick={() => updateParameters('garage', parameters.garage + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
        </div>
        <div className="flex flex-col items-center justify-center h-72 mt-10">
          {loading ? (
            <SpinnerComponent />
          ) : (
            isImageUploaded ? (
              <img
                src={imageURL}
                alt="Vista previa de la imagen"
                className="w-96 h-96 object-contain"
              />
            ) : (
              <p>No se ha subido una imagen</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Personalizacion;
