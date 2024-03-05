import { useState } from "react";

export default function CopyComponent({ onClose, link }) {
    
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(link);
      setCopied(true);
  
      // Reset the "copied" state after a short delay
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

  return (
    <>
      <div
        id="modelConfirm"
        className="fixed block z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
      >
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
          <h2 className="text-2xl font-semibold mb-4">Your Shareable Link</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              onChange={(e)=> console.log(e.target.value)}
              value={link}
              spellCheck="false"
              className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 flex-grow mr-2"
            />
            <button
                onClick={handleCopy}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
