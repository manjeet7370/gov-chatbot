import React from "react";
import { NavLink } from "react-router-dom";
import ashokEmblem from "../assets/ashok2.png";

interface User {
  username: string;
  email?: string;
}

interface HeaderProps {
  currentLanguage: "hi" | "en";
  onLanguageChange: (lang: "hi" | "en") => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Header({
  currentLanguage,
  onLanguageChange,
  isLoggedIn,
  user,
  onLogout,
  onLoginClick,
  onRegisterClick,
}: HeaderProps) {
  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा चैटबॉट",
      subtitle: "भारत सरकार | स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      home: "मुख्य पृष्ठ",
      chat: "चैट",
      login: "लॉगिन",
      register: "रजिस्टर",
      logout: "लॉगआउट",
      welcomeUser: "आपका स्वागत है",
      tickers: [
        "📞 आपातकालीन हेल्पलाइन: 108",
        "🚑 एम्बुलेंस: 102",
        "🦠 कोविड हेल्पलाइन: 1075",
      ],
    },
    en: {
      title: "Health Service Chatbot",
      subtitle: "Government of India | Ministry of Health & Family Welfare",
      home: "Home",
      chat: "Chat",
      login: "Login",
      register: "Register",
      logout: "Logout",
      welcomeUser: "Welcome",
      tickers: [
        "📞 Emergency: 108",
        "🚑 Ambulance: 102",
        "🦠 COVID Helpline: 1075",
      ],
    },
  };

  const t = translations[currentLanguage];

  return (
    <header className="gov-header">
      <div className="header-content">
        <div className="header-left">
          <div className="gov-logo">
            <img src={ashokEmblem} alt="Emblem of India" />
            <div>
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>
          </div>

          <nav className="top-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {t.home}
            </NavLink>
            {/* <NavLink
              to="/chat"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {t.chat}
            </NavLink> */}
            {/* Chatbot Telegram Link */}
            <a
              href="https://t.me/Aand321bot"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Chatbot
            </a>
          </nav>
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <div className="user-info">
              <span>
                {t.welcomeUser}, {user?.username || "User"}
              </span>
              <button className="logout-btn" onClick={onLogout}>
                {t.logout}
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={onLoginClick}>
                {t.login}
              </button>
              <button className="register-btn" onClick={onRegisterClick}>
                {t.register}
              </button>
            </div>
          )}

          <div className="language-toggle">
            <button
              className={currentLanguage === "hi" ? "active" : ""}
              onClick={() => onLanguageChange("hi")}
            >
              हिन्दी
            </button>
            <button
              className={currentLanguage === "en" ? "active" : ""}
              onClick={() => onLanguageChange("en")}
            >
              English
            </button>
          </div>
        </div>
      </div>

      <div className="emergency-bar">
        <div className="ticker-wrapper">
          <div className="ticker">
            {t.tickers.map((msg, i) => (
              <div className="ticker-message" key={i}>
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
