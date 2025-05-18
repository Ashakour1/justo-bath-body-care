import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">
      <h1 className="text-red-600">404 | Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Go back to the{" "}
        <Link to="/" className="underline">
          homepage
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
