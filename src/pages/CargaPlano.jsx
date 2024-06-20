// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Upload } from "keep-react";
import Stepper from "../components/Stepper";
import { storage, db } from "../key/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function CargaPlano() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isPredictionComplete, setIsPredictionComplete] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    localStorage.removeItem('isImageUploaded'); // Remove flag on component mount
  }, []);

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      setImage(null); // Reset the image preview
      setErrorMessage('El archivo seleccionado no es válido.\nSolo se aceptan imágenes en formato PNG o JPG.');
      setUploadProgress(0); // Reset the upload progress bar
      setIsImageUploaded(false); // Disable the next button
      return;
    }

    setErrorMessage(null); // Clear any previous error messages
    setUploadProgress(0);
    setImage(URL.createObjectURL(file));
    setIsImageUploaded(false);
    setIsPredictionComplete(false);
    setShowProgressBar(true);

    // Enviar la imagen al backend para la predicción
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:5000/predict", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 50
          ); // Actualizamos hasta 50%
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        setResult(response.data);
        setIsPredictionComplete(true);
        uploadImageToFirebase(file);
      })
      .catch((error) => {
        console.error("Error al enviar la imagen:", error);
      });
  };

  const uploadImageToFirebase = (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 50 + 50
        ); // Continuamos desde el 50% hasta el 100%
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error al subir la imagen a Firebase:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveImageURLToFirestore(downloadURL);
          setIsImageUploaded(true);
          localStorage.setItem('isImageUploaded', 'true'); // Guardar bandera en localStorage
        });
      }
    );
  };

  const saveImageURLToFirestore = async (url) => {
    try {
      const docRef = await addDoc(collection(db, "images"), {
        url,
        createdAt: new Date(),
      });
      console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto">
      <Stepper isImageUploaded={isImageUploaded} result={result} />
      <div className="grid grid-cols-2 gap-4">
        <div
          className="border border-gray-300"
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col justify-center items-center mt-16 mb-16">
            <Upload.Icon>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="fileInput"
                className="rounded-xl cursor-pointer hover:bg-gray-300 focus:outline-none"
              >
                <img src="src/assets/folder.svg" alt="folder" />
              </label>
            </Upload.Icon>

            <p className="text-body-3 font-medium text-metal-600 mt-4">
              Arrastra y suelte una imagen o elige el archivo
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageDrop}
              className="hidden"
            />
            <p className="text-body-4 font-normal text-metal-400 mt-2">
              Solo se aceptan imágenes en formato PNG o JPG.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center border border-gray-300 h-72">
          <div className="items-center mt-4">
            <h1>Vista Previa de la Imagen</h1>
          </div>
          <div className="mt-6">
            {image && (
              <img
                src={image}
                alt="Vista previa de la imagen"
                className="w-48 h-48 object-contain"
              />
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-12 whitespace-pre-wrap">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-6">
        <div className="flex-grow">
          {showProgressBar && (
            <div className="w-full bg-gray-200 h-4 rounded-full relative">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-4 ml-2">
          {isImageUploaded && isPredictionComplete && result && (
            <div>
              {result.predicted_class === "planos" &&
              result.confidence >= 80 ? (
                <FontAwesomeIcon icon={faCheckCircle} color="green" />
              ) : result.predicted_class === "planos" &&
                result.confidence < 80 ? (
                <FontAwesomeIcon icon={faTimesCircle} color="red" />
              ) : result.predicted_class === "no_planos" ? (
                <FontAwesomeIcon icon={faTimesCircle} color="red" />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CargaPlano;
