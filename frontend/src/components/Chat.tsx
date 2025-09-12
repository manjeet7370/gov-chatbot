// src/components/Chat.tsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, authHeader } from "../config";
import "./chat.css";

// Government-style CSS

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    // Add user message
    const timestamp = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    setMessages(prev => [...prev, {
      sender: "user",
      text,
      timestamp
    }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/chat/`,
        { message: text },
        { headers: authHeader() }
      );

      setMessages(prev => [...prev, {
        sender: "bot",
        text: res.data.bot,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit"
        })
      }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("सर्वर से कनेक्ट नहीं हो पा रहा है / Server not reachable");
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "सर्वर से कनेक्ट नहीं हो पा रहा है / Server not reachable",
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit"
        })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const quickActions = [
    { label: "टीकाकरण शेड्यूल", msg: "vaccination schedule" },
    { label: "COVID-19 लक्षण", msg: "covid symptoms" },
    { label: "नज़दीकी अस्पताल", msg: "nearby hospital" },
    { label: "आपातकालीन सेवा", msg: "emergency" },
  ];

  return (
    <div className="chat-panel">
      {/* Government Header */}
      <div className="chat-header">
        <div className="chat-title">
          <img
            src="/assets/ashok2.png"
            alt="Emblem of India"
            className="chat-emblem"
          />
          <div>
            <h3>स्वास्थ्य सहायक</h3>
            <p className="sub">Ministry of Health & Family Welfare</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className={`qa-btn ${action.label === "आपातकालीन सेवा" ? "emergency" : ""}`}
            // onClick={() => sendMessage(action.msg)}
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972207.png"
              alt="Health Icon"
            />
            <p>नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आप मुझसे बीमारियों, टीकाकरण और स्वास्थ्य संबंधी जानकारी के बारे में पूछ सकते हैं।</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div className="msg-header">
                <span className="sender">
                  {msg.sender === "user" ? "आप" : "स्वास्थ्य सहायक"}
                </span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
              <div className="msg-text">{msg.text}</div>
            </div>
          ))
        )}

        {loading && (
          <div className="typing">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="अपना प्रश्न लिखें..."
          className="chat-input"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="send-btn"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "भेजें"}
        </button>
      </div>
    </div>
  );
}