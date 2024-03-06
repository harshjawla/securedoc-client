import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState(false);
  const [redirect, setRedirect] = useState(true);

  useEffect(() => {
    async function authChecker() {
      try {
        const response = await fetch("https://securedoc-server.onrender.com/authenticate", {
          credentials: "include",
        });

        if (response.ok) {
          setRedirect(false);
        } else {
          console.error("Authentication failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
      setDone(true);
    }

    authChecker();
  }, []);

  useEffect(() => {
    if (done && !redirect) {
      setLoading(true);
      navigate("/user");
    }
  }, [done, redirect, navigate]);

  if (!done) {
    return <div>Loading...</div>;
  }

  // if (!redirect) {
  //   return (
  //     navigate("/user")
  //   );
  // }

  async function handleClick() {
    if (!username || !password) {
      setFormError(true);
      return;
    }
  
    try {
      setLoading(true);
  
      const data = {
        username,
        password,
      };
  
      const response = await fetch("https://securedoc-server.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      if (response.ok) {
        // Check if the response headers include the 'Set-Cookie' header
        if (response.headers.has('Set-Cookie')) {
          // Extract the cookie string from the 'Set-Cookie' header
          const cookieString = response.headers.get('Set-Cookie');
    
          // Parse the cookie string to extract individual cookies
          const cookies = cookieString.split('; ');
    
          // Check if the JWT token cookie is present among the cookies
          const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
    
          if (jwtCookie) {
            console.log('JWT token cookie received:', jwtCookie);
          } else {
            console.log('JWT token cookie not found in the response');
          }
        } else {
          console.log('No Set-Cookie header found in the response');
        }
        
        navigate("/user");
      } else if (response.status === 401) {
        setLoading(false);
        navigate("/login", {
          state: {
            message: "Combination of email and password doesn't match",
            color: "red",
          },
        });
      } else if (response.status === 400) {
        navigate("/register", {
          state: {
            message: "User not registered, please register",
            color: "red",
          },
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  
  

  return (
    <>
      {state && (
        <div
          className={`bg-${state.color}-500 py-2 px-4 rounded-md text-white text-center fixed top-4 right-4 flex gap-4`}
        >
          <p>{state.message}</p>
          <span className="cursor-pointer font-bold"></span>
        </div>
      )}
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or{" "}
            <Link
              to={"/register"}
              className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              create a new acccount
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              {formError && (
                <div className="mt-2 text-red-500 text-xs">
                  Please fill in both fields
                </div>
              )}

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  {!loading ? (
                    <button
                      type="button"
                      onClick={handleClick}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign in
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      loading
                    </button>
                  )}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
