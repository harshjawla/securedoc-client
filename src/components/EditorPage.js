import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Navigate, useLocation } from "react-router-dom";
import Editor from "./Editor";

export default function EditorPage() {
  const location = useLocation();
  const state = location.state;
  const [redirect, setRedirect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function authChecker() {
      try {
        const response = await fetch("https://securedoc-server.onrender.com/authenticate", {
          credentials: "include",
        });

        if (response.ok) {
          if (!state) {
            setRedirect(2);
          } else {
            setRedirect(1);
          }
        } else {
          console.error("Authentication failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
      setDone(true);
    }

    authChecker();
  }, [state]);

  if (!done) {
    return <div>Loading...</div>;
  }

  if (redirect === 0) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You are not logged in, please login",
          color: "blue",
        }}
      />
    );
  }

  if (redirect === 2) {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <Navbar />
      <Editor data={state.data} />
    </>
  );
}
