import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Document from "./Document";

export default function UserPage() {
  const [redirect, setRedirect] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function authChecker() {
      try {
        const response = await fetch(
          "https://securedoc-server.vercel.app/authenticate",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          setRedirect(1);
        } else {
          setRedirect(2);
          console.error("Authentication failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    authChecker()
  }, []);

  useEffect(() => {
    if (redirect === 2) {
      navigate("/login", {
        state: {
          message: "You are not logged in, please login",
          color: "blue",
        },
      });
    }
  }, [redirect, navigate]);

  return (
    <>
      <Navbar />
      <Document />
    </>
  );
}
