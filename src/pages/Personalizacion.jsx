// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../key/firebase";
import Stepper from "../components/Stepper";
import { Minus, Plus } from "phosphor-react";
import { Label, NumberInput, Spinner } from "keep-react";

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="info" size="lg" />
    </div>
  );
}

function Personalizacion() {
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageURL = async () => {
      const q = query(
        collection(db, "images"),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const url = doc.data().url;
        console.log("URL Imagen:", url); // Agrega este console.log para verificar la URL de la imagen
        setImageURL(url);
      });
      setLoading(false);
    };

    fetchImageURL();
  }, []);

  const isImageUploaded = !loading && imageURL !== "";

  const [dormitorio, setDormitorio] = useState(0);
  const [bano, setBano] = useState(0);
  const [cocina, setCocina] = useState(0);
  const [sala, setSala] = useState(0);
  const [comedor, setComedor] = useState(0);
  const [cochera, setCochera] = useState(0);

  return (
    <div className="container mx-auto">
      <Stepper isImageUploaded={isImageUploaded} />
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4 mt-10 ml-24">
          <fieldset className="space-y-1">
            <Label>Dormitorio</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={dormitorio === 0}
                onClick={() => setDormitorio((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={dormitorio}
                onChange={(e) => setDormitorio(+e.target.value)}
              />
              <NumberInput.Button
                disabled={dormitorio === 100}
                onClick={() => setDormitorio((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Baño</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={bano === 0}
                onClick={() => setBano((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={bano}
                onChange={(e) => setBano(+e.target.value)}
              />
              <NumberInput.Button
                disabled={bano === 100}
                onClick={() => setBano((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Cocina</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={cocina === 0}
                onClick={() => setCocina((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={cocina}
                onChange={(e) => setCocina(+e.target.value)}
              />
              <NumberInput.Button
                disabled={cocina === 100}
                onClick={() => setCocina((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Sala de estar</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={sala === 0}
                onClick={() => setSala((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={sala}
                onChange={(e) => setSala(+e.target.value)}
              />
              <NumberInput.Button
                disabled={sala === 100}
                onClick={() => setSala((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Comedor</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={comedor === 0}
                onClick={() => setComedor((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={comedor}
                onChange={(e) => setComedor(+e.target.value)}
              />
              <NumberInput.Button
                disabled={comedor === 100}
                onClick={() => setComedor((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
          <fieldset className="space-y-1">
            <Label>Cochera</Label>
            <NumberInput>
              <NumberInput.Button
                disabled={cochera === 0}
                onClick={() => setCochera((prev) => prev - 1)}
              >
                <Minus size={18} color="#455468" />
              </NumberInput.Button>
              <NumberInput.Input
                min={0}
                max={100}
                value={cochera}
                onChange={(e) => setCochera(+e.target.value)}
              />
              <NumberInput.Button
                disabled={cochera === 100}
                onClick={() => setCochera((prev) => prev + 1)}
              >
                <Plus size={16} color="#455468" />
              </NumberInput.Button>
            </NumberInput>
          </fieldset>
        </div>
        <div className="flex flex-col items-center justify-center h-72">
          {loading ? (
            <SpinnerComponent />
          ) : (
            <img
              src={imageURL}
              alt="Vista previa de la imagen"
              className="w-96 h-96 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Personalizacion;
