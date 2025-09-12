import { useState } from "react";
import axios from "axios";
import "./Register.css";   // 👈 CSS import kiya

interface RegisterData {
  username: string;
  email: string;
  password: string;
  city: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    city: "",
  });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setMsg("✅ Registered as " + res.data.username);
    } catch (err: any) {
      setMsg("❌ " + (err.response?.data?.error || "Registration failed"));
    }
  }

  return (
    <div className="register-page">
      <h2>Register User</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      <p className="register-message">{msg}</p>
    </div>
  );
}