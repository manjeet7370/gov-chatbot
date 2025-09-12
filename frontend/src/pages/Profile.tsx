import { useState } from "react";
import axios from "axios";
import "./Login.css";

interface UserProfile {
  username?: string;
  email?: string;
  message?: string;
  error?: string;
}

export default function Profile() {
  // 👇 data ho sakta hai UserProfile object ya null
  const [data, setData] = useState<UserProfile | null>(null);

  async function fetchProfile() {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get<UserProfile>("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch {
      setData({ error: "❌ Unauthorized" });
    }
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <button onClick={fetchProfile}>Load Profile</button>
      {/* Pretty print JSON response */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}