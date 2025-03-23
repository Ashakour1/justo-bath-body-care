import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  username: String;
  password: String;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormProps>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "justo-bath-body-care-siem.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure correct headers
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      login(data.username, data.password, data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/login-image.jpg"
              alt="Logo"
              className="rounded-full w-16 h-16"
            />
            <h1 className="text-xl font-bold">Login</h1>
            <p className="text-lg text-center text-muted-foreground">
              Welcome back! Please login to your account to access the dashboard
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className="w-full h-11"
                id="username"
                type="text"
                placeholder="John"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="w-full h-11"
                id="password"
                type="password"
                placeholder="********"
                required
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full h-11">
              Login
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        <p className="text-sm font-semibold">
          Don't Login yet? <a href="/register">Contact Our Team</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
