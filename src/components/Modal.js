import { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function Modal({ onClose }) {
  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    if (!name) {
      setFormError("Please fill above field");
      return;
    } else {
      setFormError(false);
    }
    setLoading(true);

    try {
      const data = {
        name : name,
      }
      const response = await fetch("https://securedoc-server.vercel.app/create", {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if(response.ok){
        setLoading(false);
        const receivedData = await response.json();
        return navigate("/editor", {state: {data: receivedData}});
      } else{
        setLoading(false);
        setFormError("Filename must be unique");
        const receivedData = await response.json();
        console.log(receivedData);
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      <div
        id="login-popup"
        tabIndex="-1"
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="fixed inset-0" onClick={onClose}></div>
        {loading && <Loading />}
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5">
              <p className="mb-4 text-sm font-normal text-gray-800"></p>

              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Create New Document
                </p>
                <p className="mt-2 text-sm leading-4 text-slate-600">
                  You have to provide the document name
                </p>
              </div>

              <form className="w-full">
                <label htmlFor="email" className="sr-only">
                  Name of the Document
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-5 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Example Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formError && (
                  <div className="mt-2 text-red-500 text-xs">
                    {formError}
                  </div>
                )}
                <button
                  type="submit"
                  onClick={handleClick}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
