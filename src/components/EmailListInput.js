import React, { useState } from "react";
import cross from "../logos/cross.svg";
import ShareModal from "./ShareModal";

const EmailListInput = ({ onClose, docName }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [share, setShare] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleClick() {
    setShare(true);
  }

  function closeModal() {
    setShare(false);
  }

  const handleAddEmail = () => {
    if (email.trim() !== "") {
      setEmails([...emails, email.trim().toLowerCase()]);
      setEmail("");
    }
  };

  return (
    <>
      <div
        id="modelConfirm"
        className="fixed block z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
      >
        {share && (
          <ShareModal
            onClose={closeModal}
            name={
              !emails.length
                ? "You sure, you want to share with all ?"
                : "You sure, you want to share with entered emails ?"
            }

            emails={emails}
            docName={docName}
          />
        )}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 shadow-lg w-96">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
          <h2 className="text-2xl font-semibold mb-4">Enter Email</h2>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Leave it empty, to share with all"
              value={email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 flex-grow mr-2"
            />
            <button
              onClick={handleAddEmail}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            >
              +
            </button>
          </div>
          <div className="overflow-y-auto max-h-40">
            {emails.map((email, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{email}</span>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {
                    setEmails(emails.filter((e, i) => i !== index));
                  }}
                >
                  <img
                    src={cross}
                    alt="cross"
                    className="h-5 w-5 hover:bg-gray-400 border rounded-xl"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded">
              Emails ({emails.length})
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleClick}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailListInput;
