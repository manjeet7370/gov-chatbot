// src/App.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { API_BASE_URL, authHeader } from "./config";
import "./App.css";
import "./components/Chat.css"
// Importing images
import polioImg from "./assets/polio.jpg";
import pmYojanaImg from "./assets/pmAyush.jpg";
import ncdcImg from "./assets/epidemic.jpg";
import maternalHealthImg from "./assets/maternalHealth.jpg";
import healthImg from "./assets/health.jpeg";
import yogaImg from "./assets/yoga.jpeg";
import ayurvedImg from "./assets/ayurved.jpeg";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

interface User {
  username: string;
  email: string;
  profile?: {
    full_name?: string;
    mobile_no?: string;
    address?: string;
    city?: string;
  };
}

function AppWrapper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"hi" | "en">("en");
  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/`, {
        headers: authHeader(),
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/token/refresh/`,
            { refresh: refreshToken }
          );
          localStorage.setItem("access_token", refreshResponse.data.access);
          fetchUserProfile(refreshResponse.data.access);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }
  };

  const handleLoginSuccess = (tokenData: {
    access: string;
    refresh: string;
  }) => {
    // Keep this as local handler (used if some child calls it)
    localStorage.setItem("access_token", tokenData.access);
    localStorage.setItem("refresh_token", tokenData.refresh);
    setIsLoggedIn(true);
    fetchUserProfile(tokenData.access);
    navigate("/chat");
  };

  const handleRegisterSuccess = (tokenData: {
    access: string;
    refresh: string;
  }) => {
    localStorage.setItem("access_token", tokenData.access);
    localStorage.setItem("refresh_token", tokenData.refresh);
    setIsLoggedIn(true);
    fetchUserProfile(tokenData.access);
    navigate("/chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");

  const translations = {
    hi: {
      welcome:
        "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आप मुझसे बीमारियों, टीकाकरण और स्वास्थ्य संबंधी जानकारी के बारे में पूछ सकते हैं।",
      placeholder: "अपना प्रश्न यहाँ लिखें...",
      send: "भेजें",
      you: "आप",
      bot: "स्वास्थ्य सहायक",
      quickActions: {
        title: "त्वरित सहायता",
        vaccination: "टीकाकरण शेड्यूल",
        symptoms: "COVID-19 लक्षण",
        nearbyHospital: "नज़दीकी अस्पताल",
        emergency: "आपातकालीन सेवा",
      },
      serverError: "⚠️ सर्वर से कनेक्ट नहीं हो पा रहा है",
    },
    en: {
      welcome:
        "Hello! I am your health assistant. I can provide information about diseases, vaccination schedules, and health-related queries.",
      placeholder: "Type your question here...",
      send: "Send",
      you: "You",
      bot: "Health Assistant",
      quickActions: {
        title: "Quick Help",
        vaccination: "Vaccination Schedule",
        symptoms: "COVID-19 Symptoms",
        nearbyHospital: "Nearby Hospitals",
        emergency: "Emergency Services",
      },
      serverError: "⚠️ Error connecting to server",
    },
  };

  const t = translations[language];

  const sendMessage = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString("hi-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { sender: t.you, text: textToSend, timestamp },
    ]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/chat/`,
        { message: textToSend, language: language },
        { headers: authHeader() }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: t.bot,
          text: res.data.bot,
          timestamp: new Date().toLocaleTimeString("hi-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: t.bot,
          text: t.serverError,
          timestamp: new Date().toLocaleTimeString("hi-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
    setInput("");
  };

  const quickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="app-container">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      <div className="chat-container">
        <div className="quick-actions">
          <h3>{t.quickActions.title}</h3>
          <div className="action-buttons">
            <button onClick={() => quickAction(t.quickActions.vaccination)}>
              💉 {t.quickActions.vaccination}
            </button>
            <button onClick={() => quickAction(t.quickActions.symptoms)}>
              🤒 {t.quickActions.symptoms}
            </button>
            <button onClick={() => quickAction(t.quickActions.nearbyHospital)}>
              🏥 {t.quickActions.nearbyHospital}
            </button>
            <button
              onClick={() => quickAction(t.quickActions.emergency)}
              className="emergency"
            >
              🚨 {t.quickActions.emergency}
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972207.png"
                alt="Health Icon"
              />
              <p>{t.welcome}</p>

              <div className="info-row">
                <a
                  href="https://www.mohfw.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card1"
                      style={{
                        backgroundImage: `url(${polioImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🩺 Polio Prevention
                    </div>
                    <div className="flip-card-back card1">
                      Learn how to prevent polio →
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.myscheme.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card1"
                      style={{
                        backgroundImage: `url(${pmYojanaImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🩺 Ayushman Bharat Yojna
                    </div>
                    <div className="flip-card-back card1">
                      Explore PM Schemes →
                    </div>
                  </div>
                </a>

                <a
                  href="https://ncdc.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card1"
                      style={{
                        backgroundImage: `url(${ncdcImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🦠 Epidemic Control
                    </div>
                    <div className="flip-card-back card1">
                      Prevent outbreaks →
                    </div>
                  </div>
                </a>

                <a
                  href="https://nhm.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card1"
                      style={{
                        backgroundImage: `url(${maternalHealthImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      Maternal Health
                    </div>
                    <div className="flip-card-back card1">
                      Post pregnancy Care →
                    </div>
                  </div>
                </a>
              </div>

              <div className="info-row second-row">
                <a
                  href="https://nutritionsource.hsph.harvard.edu/healthy-eating-plate/translations/hindi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card2"
                      style={{
                        backgroundImage: `url(${healthImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🥗 स्वास्थ्य
                    </div>
                    <div className="flip-card-back card2">
                      स्वस्थ आहार योजना →
                    </div>
                  </div>
                </a>

                <a
                  href="https://yoga.ayush.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card2"
                      style={{
                        backgroundImage: `url(${yogaImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🧘 योग
                    </div>
                    <div className="flip-card-back card2">
                      योग के लाभ जानें →
                    </div>
                  </div>
                </a>

                <a
                  href="https://ayush.gov.in/#!/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front card2"
                      style={{
                        backgroundImage: `url(${ayurvedImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      🌿 आयुर्वेद
                    </div>
                    <div className="flip-card-back card2">
                      आयुर्वेदिक उपचार →
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.sender === t.you ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-header">
                <span className="sender">{msg.sender}</span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t.placeholder}
            className="message-input"
          />
          <button
            onClick={() => sendMessage()}
            className="send-button"
            disabled={loading}
          >
            {loading ? "..." : t.send}
          </button>
        </div>
      </div>

      <footer className="gov-footer">
        <p>© 2025 स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार</p>
        <p>Ministry of Health & Family Welfare, Government of India</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<AppWrapper />} />
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={(tokens: { access: string; refresh: string }) => {
                localStorage.setItem("access_token", tokens.access);
                localStorage.setItem("refresh_token", tokens.refresh);
                window.location.href = "/chat"; // <- direct page reload
              }}
              onBack={() => window.history.back()}
            />
          }
        />
        
      {/* <Route path="/login" element={<Login/>} /> */}

        <Route
          path="/register"
          element={
            <Register
              onRegisterSuccess={(tokens: {
                access: string;
                refresh: string;
              }) => {
                localStorage.setItem("access_token", tokens.access);
                localStorage.setItem("refresh_token", tokens.refresh);
                window.location.href = "/chat";
              }}
              onBack={() => window.history.back()}
            />
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
