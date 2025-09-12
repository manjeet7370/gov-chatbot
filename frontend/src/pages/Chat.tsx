import { useState } from "react";
import axios from "axios";
import "./Chat.css";   // ✅ apna CSS file

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    if (!input.trim()) return;

    // User ka message add karo
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Backend ko request bhejo
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message: input,
        lang: "en",
      });

      const botMsg: Message = { sender: "bot", text: res.data.bot };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: Message = { sender: "bot", text: "⚠️ Server not responding" };
      setMessages((prev) => [...prev, botMsg]);
    }

    setInput(""); // clear input
  }

  return (
    <div className="chat-page">
      <h2>Health ChatBot</h2>

      {/* Messages area */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-placeholder">🤖 Welcome! Ask me anything about health.</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        <input
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}