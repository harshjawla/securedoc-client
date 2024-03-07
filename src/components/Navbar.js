import React, { useState } from "react";
import companyLogo from "../logos/companylogo.svg";
import { Link, Navigate, useLocation } from "react-router-dom";
import EmailListInput from "./EmailListInput";

const Navbar = () => {
  const [email, setEmail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const location = useLocation();
  const state = location.state;

  function handleEmail() {
    setEmail(true);
  }

  function handleCloseEmail() {
    setEmail(false);
  }

  async function handleClick() {
    const response = await fetch("https://securedoc-server.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      setLogout(true);
    } else {
      alert("Logout Failed, check your network");
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (logout) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {email && <EmailListInput onClose={handleCloseEmail} docName={state.data.name} />}
      <nav className="bg-white p-4 flex justify-between items-center shadow-md relative z-10">
        <div className="flex items-center">
          <img src={companyLogo} alt="Logo" className="h-10 w-10 mr-4" />
          <Link to={"/"} className="text-gray-800 font-bold text-lg">
            SecureDoc
          </Link>
        </div>
        {!state && (
          <div className="flex flex-grow justify-center space-x-4">
            <p className="text-gray-600 hover:text-gray-800">Your Documents</p>
          </div>
        )}
        {state && (
          <div className="flex flex-grow justify-center space-x-4">
            <p className="text-gray-600 hover:text-gray-800">
              {state.data.name}
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center space-x-4">
          {state && (
            <button onClick={handleEmail} className="bg-gray-500 hover:bg-black text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105">
              Share
            </button>
          )}
          <button
            type="button"
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:bg-gray-200 rounded-full p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-md z-20">
            <div className="p-4 flex flex-col items-center">
              {state && (
                <button onClick={handleEmail} className="bg-gray-500 hover:bg-black text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 mt-4">
                  Share
                </button>
              )}
              <button
                type="button"
                onClick={handleClick}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 mt-4"
              >
                Logout
              </button>
            </div>
            <button
              onClick={closeMenu}
              className="text-gray-800 absolute top-0 right-0 m-4"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
