import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <Link to="#">
          <div className=" rounded-full w-44 h-20 flex items-center justify-center">
            <img className=" w-28 text-primary" src="/logo-2.png" />
          </div>
        </Link>
      </div>
      <div className="mx-auto max-w-md text-center flex flex-col">
        <h1 className="mt-4 text-xl tracking-tight text-gray-500 sm:text-xl">
          Offline for maintenance.
        </h1>
        <p className="mt-4 text-muted-foreground">
          This app is undergoing maintenance right now.
        </p>
        <p className="text-muted-foreground">
          We will be back shortly. Thank you for your patience.
        </p>
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-black h-2.5 rounded-full"
              style={{ width: "40%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">40% complete</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
