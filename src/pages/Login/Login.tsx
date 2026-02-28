import { useState } from "react";
import { useAuth } from "../../platform/AuthContext"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const success = await login(email, password);

    if (!success) {
      setError("Invalid email or password");
      return;
    }

    // redirect to home after login
    navigate("/");
  }

  return (
    <div className="login-page">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}


      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>



  );
}