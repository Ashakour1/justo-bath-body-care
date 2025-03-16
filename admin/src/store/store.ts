import { create } from "zustand";

interface AuthState {
  username: string | null;
  password: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Retrieve authentication data from localStorage on initialization
  const storedAuth = JSON.parse(localStorage.getItem("auth") || "null");

  return {
    username: storedAuth?.username || null,
    password: storedAuth?.password || null,
    token: storedAuth?.token || null,
    isAuthenticated: storedAuth?.isAuthenticated || false,

    login: (username, password, token) => {
      const authData = { username, password, token, isAuthenticated: true };
      localStorage.setItem("auth", JSON.stringify(authData));
      set(authData);
    },

    logout: () => {
      localStorage.removeItem("auth");
      set({
        username: null,
        password: null,
        token: null,
        isAuthenticated: false,
      });
    },
  };
});
