import React, { useEffect, useState } from "react";
import newDoc from "../logos/plus.svg";
import Doc from "../logos/docIcon.svg";
import Modal from "./Modal";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import deleteButton from "../logos/cross.svg";
import DeleteModal from "./DeleteModal";

const Document = () => {
  // Array of example image URLs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dlt, setDlt] = useState("");
  const [files, setFiles] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  function handleModal() {
    setIsModalOpen(true);
  }

  function handleDltOpen(name) {
    setDlt(name);
  }

  function handleDltClose() {
    setDlt("");
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function changeRoute(file) {
    return navigate("/editor", { state: { data: file } });
  }

  useEffect(() => {
    async function fileParser() {
      const response = await fetch("https://securedoc-server.vercel.app/userfiles", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const receivedData = await response.json();
        setFiles(receivedData);
      }
    }

    fileParser();
  }, []);

  useEffect(() => {
    if (files) {
      setLoader(false);
    }
  }, [files]);

  return (
    <>
      {dlt && <DeleteModal name={"Are you sure you want to delete " + dlt} onClose={handleDltClose} />}
      {loader && <Loading />}
      <div className="mt-10 mb-5 w-3/4 mx-auto">
        <div className="grid grid-cols-5 gap-4">
          <div
            id="open-modal"
            onClick={handleModal}
            className="relative group cursor-pointer"
          >
            <div className="w-full h-40 bg-gray-200 rounded-md flex justify-center items-center overflow-hidden transition duration-300 transform hover:scale-105">
              <img
                src={newDoc}
                alt="createNewDocument"
                className="w-1/2 h-auto object-cover"
              />
            </div>
            <p className="text-center mt-2">Create new Doc</p>
          </div>
          {files &&
            files.map((file, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="w-full h-40 bg-gray-200 rounded-md flex justify-center items-center overflow-hidden transition duration-300 transform hover:scale-105">
                  <img
                    src={Doc}
                    alt={`${index}`}
                    onClick={() => changeRoute(file)}
                    className="w-1/2 h-auto object-cover"
                  />
                </div>
                <p className="text-center mt-2">{file.name}</p>
                <img
                  className="h-5 w-5 mt-2 hover:bg-gray-400 rounded-xl"
                  src={deleteButton}
                  alt="delete button"
                  onClick={() =>handleDltOpen(file.name)}
                />
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleClose} />}
    </>
  );
};

export default Document;
