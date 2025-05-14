import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login-form";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
