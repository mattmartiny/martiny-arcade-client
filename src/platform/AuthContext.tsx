import React, { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
  userId: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // 🔹 Restore token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;

    setToken(savedToken);
    fetchUser(savedToken);
  }, []);

  async function fetchUser(jwt: string) {
    const res = await fetch("http://localhost:5189/api/auth/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      logout();
      return;
    }

    const data = await res.json();
    setUser(data);
  }

  async function login(email: string, password: string) {
    const res = await fetch("http://localhost:5189/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    localStorage.setItem("token", data.token);
    setToken(data.token);

    await fetchUser(data.token);

    return true;
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}