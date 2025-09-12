import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setMsg("✅ Login successful");
    } catch {
      setMsg("❌ Invalid credentials");
    }
  }

  return (
    <div className="login-page">   {/* ✅ CSS apply hoga */}
      <h2>Login</h2>
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="login-message">{msg}</p>
    </div>
  );
}