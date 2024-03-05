import { Link } from "react-router-dom";
import homepageImage from "../images/homepage.jpg";

export default function HomePage() {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <p className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
            <span className="hidden md:inline">Already registered</span>
            <Link
              to={"/login"}
              className="font-semibold text-lime-600"
            >
              <span className="absolute inset-0"></span> Log In <span>→</span>
            </Link>
          </p>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            SecureDoc Document Solution
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            SecureDoc is a secure document platform designed to provide a Google
            Docs-like experience with robust security features. Collaborate
            seamlessly, knowing your documents are protected with end-to-end
            encryption and advanced access controls.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/register"}
              className="rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
              Register Now
            </Link>
            <Link
              to={"/login"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              LogIn
              <span> →</span>
            </Link>
          </div>
        </div>
        <div className="mt-10 flow-root sm:mt-20">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              src={homepageImage}
              alt="docsimage"
              width="2432"
              height="1442"
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
