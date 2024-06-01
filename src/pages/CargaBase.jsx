// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Stepper from "../components/Stepper";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../key/firebase";
import { Spinner } from "keep-react";
import techoPropio from "../assets/techopropio.png";
import { Checkbox, Label } from "keep-react";

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner color="info" size="lg" />
    </div>
  );
};

const CargaBase = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "planobase/planobase.jpg");
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error al obtener la imagen: ", error);
      }
      setLoading(false);
    };

    fetchImage();
  }, []);

  return (
    <div className="container mx-auto">
      <Stepper />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center h-72 relative ml-14">
          {loading ? (
            <SpinnerComponent />
          ) : (
            <img
              src={imageUrl}
              alt="Plano base"
              className="w-72 h-96 object-contain mt-20"
              style={{ visibility: loading ? "hidden" : "visible" }}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-center mr-14">
          <img
            src={techoPropio}
            className="w-28 h-28 object-contain mt-4 ml-4"
            alt="Techo Propio"
          />
          <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-300 dark:bg-gray-200">
            <p className=" font-serif text-lg">
              Este plano representa la base de la estructura proporcionada por
              el programa Techo Propio. Se muestra el diseño inicial que sirve
              como punto de partida para futuras modificaciones y
              personalizaciones según sus necesidades.
            </p>
          </blockquote>

          <fieldset className="flex items-center gap-2 mt-2">
            <Checkbox id="checkbox" className="border border-gray-700" />
            <Label htmlFor="checkbox" className="text-xs text-color-black">
              Estoy de acuerdo con el plano proporcionado y deseo continuar con
              el proceso de personalización.
            </Label>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default CargaBase;
