//new code
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Importing images for cover pages from assets
import polioImg from "./assets/polio.jpg";
import pmYojanaImg from "./assets/pmAyush.jpg";
import ncdcImg from "./assets/epidemic.jpg";
import maternalHealthImg from "./assets/maternalHealth.jpg";
import ashokEmblem from "./assets/ashok2.png";
import healthImg from "./assets/health.jpeg";
import yogaImg from "./assets/yoga.jpeg";
import ayurvedImg from "./assets/ayurved.jpeg";

// Import Login component
import Login from "./components/Login";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"hi" | "en">("hi");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Add this function to handle login navigation
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // Add this function to handle going back to the main app
  const handleBackToApp = () => {
    setShowLogin(false);
  };

  // If showLogin is true, render the Login component
  if (showLogin) {
    return <Login onBack={handleBackToApp} />;
  }

  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा चैटबॉट",
      subtitle: "भारत सरकार | स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      welcome:
        "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आप मुझसे बीमारियों, टीकाकरण और स्वास्थ्य संबंधी जानकारी के बारे में पूछ सकते हैं।",
      placeholder: "अपना प्रश्न यहाँ लिखें...",
      send: "भेजें",
      helplineArray: [
        "📞 आपातकालीन हेल्पलाइन: 108",
        "🚑 लोकल एम्बुलेंस: 102",
        "💊 प्रधानमंत्री जन औषधि केंद्र: 1800-11-4415 के बारे में जानें।",
      ],

      you: "आप",
      bot: "स्वास्थ्य सहायक",
      quickActions: {
        title: "त्वरित सहायता",
        vaccination: "टीकाकरण शेड्यूल",
        symptoms: "COVID-19 लक्षण",
        nearbyHospital: "नज़दीकी अस्पताल",
        emergency: "आपातकालीन सेवा",
      },
    },
    en: {
      title: "Health Service Chatbot",
      subtitle: "Government of India | Ministry of Health & Family Welfare",
      welcome:
        "Hello! I am your health assistant. I can provide information about diseases, vaccination schedules, and health-related queries.",
      placeholder: "Type your question here...",
      send: "Send",
      helplineArray: [
        "📞 Emergency Helpline: 108",
        "🚑 Local Ambulance: 102",
        "💊 PM Jan Aushadhi: 1800-11-4415",
      ],
      you: "You",
      bot: "Health Assistant",
      quickActions: {
        title: "Quick Help",
        vaccination: "Vaccination Schedule",
        symptoms: "COVID-19 Symptoms",
        nearbyHospital: "Nearby Hospitals",
        emergency: "Emergency Services",
      },
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

    setMessages([
      ...messages,
      {
        sender: t.you,
        text: textToSend,
        timestamp,
      },
    ]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message: textToSend,
        language: language,
      });

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
          text:
            language === "hi"
              ? "⚠️ सर्वर से कनेक्ट नहीं हो पा रहा है"
              : "⚠️ Error connecting to server",
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
      {/* Header */}
      <header className="gov-header">
        <div className="header-content">
          <div className="header-left">
            <div className="gov-logo">
              <img src={ashokEmblem} alt="Ashoka Emblem" width={50} />
              <div>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="header-right">
            {/* Login Button */}
            <button className="login-btn" onClick={handleLoginClick}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-6c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V4z" />
              </svg>
              {language === "hi" ? "लॉगिन" : "Login"}
            </button>

            <div className="language-toggle">
              <button
                className={language === "hi" ? "active" : ""}
                onClick={() => setLanguage("hi")}
              >
                हिन्दी
              </button>
              <button
                className={language === "en" ? "active" : ""}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Emergency bar messages */}
        <div className="emergency-bar">
          <div className="ticker-wrapper">
            <div className="ticker">
              {t.helplineArray.map((msg, idx) => (
                <div key={idx} className="ticker-message">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="chat-container">
        {/* Quick Actions */}
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

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972207.png"
                alt="Health Icon"
              />
              <p>{t.welcome}</p>

              {/* Info Cards Section */}
              <div className="info-row">
                {/* Card 1 - Polio Prevention */}
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

                {/* Card 2 - PM Yojanas */}
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

                {/* Card 3 - NCDC */}
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

                {/* Card 4 - NHM */}
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

              {/* Second Row - Health, Yoga, Ayurveda */}
              <div className="info-row second-row">
                {/* Card 5 - Health */}
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

                {/* Card 6 - Yoga */}
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

                {/* Card 7 - Ayurveda */}
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

        {/* Input Area */}
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

      {/* Footer */}
      <footer className="gov-footer">
        <p>© 2025 स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार</p>
        <p>Ministry of Health & Family Welfare, Government of India</p>
      </footer>
    </div>
  );
}

export default App;
