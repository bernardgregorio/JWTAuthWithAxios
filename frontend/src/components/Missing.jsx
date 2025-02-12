import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center">
        <span className="text-9xl text-red-700 text italic">404</span> Not Found
      </h1>
      <p className="text-2xl text-center my-10">
        The page you are looking for does not exist.
      </p>
      <p className="text-2xl text-center">
        <Link to="/" className="text-blue-500">
          Go back to the dashboard page.
        </Link>
      </p>
    </main>
  );
};

export default Missing;
