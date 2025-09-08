import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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

  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा चैटबॉट",
      subtitle: "भारत सरकार | स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      welcome: "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आप मुझसे बीमारियों, टीकाकरण और स्वास्थ्य संबंधी जानकारी के बारे में पूछ सकते हैं।",
      placeholder: "अपना प्रश्न यहाँ लिखें...",
      send: "भेजें",
      helpline: "📞 आपातकालीन हेल्पलाइन: 108",
      you: "आप",
      bot: "स्वास्थ्य सहायक",
      quickActions: {
        title: "त्वरित सहायता",
        vaccination: "टीकाकरण शेड्यूल",
        symptoms: "COVID-19 लक्षण",
        nearbyHospital: "नज़दीकी अस्पताल",
        emergency: "आपातकालीन सेवा"
      }
    },
    en: {
      title: "Health Service Chatbot",
      subtitle: "Government of India | Ministry of Health & Family Welfare",
      welcome: "Hello! I am your health assistant. I can provide information about diseases, vaccination schedules, and health-related queries.",
      placeholder: "Type your question here...",
      send: "Send",
      helpline: "📞 Emergency Helpline: 108",
      you: "You",
      bot: "Health Assistant",
      quickActions: {
        title: "Quick Help",
        vaccination: "Vaccination Schedule",
        symptoms: "COVID-19 Symptoms",
        nearbyHospital: "Nearby Hospitals",
        emergency: "Emergency Services"
      }
    }
  };

  const t = translations[language];

  const sendMessage = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setMessages([...messages, {
      sender: t.you,
      text: textToSend,
      timestamp
    }]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message: textToSend,
        language: language
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: t.bot,
          text: res.data.bot,
          timestamp: new Date().toLocaleTimeString('hi-IN', {
            hour: '2-digit',
            minute: '2-digit'
          })
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: t.bot,
          text: language === 'hi'
            ? "⚠️ सर्वर से कनेक्ट नहीं हो पा रहा है"
            : "⚠️ Error connecting to server",
          timestamp: new Date().toLocaleTimeString('hi-IN', {
            hour: '2-digit',
            minute: '2-digit'
          })
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" alt="Ashoka Emblem" />
              <div>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="language-toggle">
            <button
              className={language === 'hi' ? 'active' : ''}
              onClick={() => setLanguage('hi')}
            >
              हिन्दी
            </button>
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </div>
        <div className="emergency-bar">
          {t.helpline}
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
            <button onClick={() => quickAction(t.quickActions.emergency)} className="emergency">
              🚨 {t.quickActions.emergency}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <img src="https://cdn-icons-png.flaticon.com/512/2972/2972207.png" alt="Health Icon" />
              <p>{t.welcome}</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === t.you ? "user-message" : "bot-message"}`}
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
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t.placeholder}
            className="message-input"
          />
          <button
            onClick={() => sendMessage()}
            className="send-button"
            disabled={loading}
          >
            {loading ? '...' : t.send}
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