import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, authHeader } from "../config";
import "../App.css";
import "./Home.css"


import polioImg from "../assets/polio.jpg";
import pmYojanaImg from "../assets/pmAyush.jpg";
import ncdcImg from "../assets/epidemic.jpg";
import maternalHealthImg from "../assets/maternalHealth.jpg";
import healthImg from "../assets/health.jpeg";
import yogaImg from "../assets/yoga.jpeg";
import ayurvedImg from "../assets/ayurved.jpeg";

import Header from "./Header";

interface User {
  username: string;
  email: string;
}

export default function Home() {
  const [language, setLanguage] = useState<"hi" | "en">("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/profile/`, {
        headers: authHeader(),
      });
      setUser(res.data);
    } catch (error) {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const r = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh,
          });
          localStorage.setItem("access_token", r.data.access);
          fetchUserProfile();
        } catch (e) {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }
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

  const t = {
    hi: {
      welcome: "नमस्ते! भारत के स्वास्थ्य सेवा पोर्टल में आपका स्वागत है।",
      heroDesc:
        "स्वास्थ्य संबंधी जानकारी, टीकाकरण कार्यक्रम, आपातकालीन हेल्पलाइन और हमारे AI सहायक से चैट करें।",
      startChat: "चैट शुरू करें",
      visitMohfw: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय देखें",
      keyInitiatives: "प्रमुख स्वास्थ्य पहल",
      emergencyHelplines: "आपातकालीन हेल्पलाइन",
    },
    en: {
      welcome: "Welcome to India’s Health Service Portal!",
      heroDesc:
        "Access health information, vaccination schedules, emergency helplines, and chat with our AI assistant.",
      startChat: "Start Chat",
      visitMohfw: "Visit MoHFW",
      keyInitiatives: "Key Health Initiatives",
      emergencyHelplines: "Emergency Helplines",
    },
  }[language];

  return (
    <div className="home-container">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      <section className="hero-section">
        <h2>{t.welcome}</h2>
        <p>{t.heroDesc}</p>
        <div className="hero-buttons">
          {/* <Link to="/chat" className="btn primary">
            {t.startChat}
          </Link> */}
          <a
            href="https://t.me/Aand321bot"
            target="_blank"
            rel="noreferrer"
            className="btn secondary"
          >
            {t.startChat}
          </a>
          <a
            href="https://www.mohfw.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="btn secondary"
          >
            {t.visitMohfw}
          </a>
        </div>
      </section>

      <section className="schemes-section">
        <h3>{t.keyInitiatives}</h3>
        <div className="schemes-grid">
          <a
            className="scheme-card"
            href="https://www.pmjay.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            <h4>Ayushman Bharat</h4>
            <p>Affordable healthcare for all.</p>
          </a>
          <a
            className="scheme-card"
            href="https://janaushadhi.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            <h4>PM Jan Aushadhi</h4>
            <p>Quality medicines at affordable prices.</p>
          </a>
          <a
            className="scheme-card"
            href="https://nhm.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            <h4>National Health Mission</h4>
            <p>Maternal and child health programmes.</p>
          </a>
        </div>
      </section>

      <section className="cards-showcase">
        <div className="info-row">
          <div className="flip-card">
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
          </div>

          <div className="flip-card">
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
              <div className="flip-card-back card1">Explore PM Schemes →</div>
            </div>
          </div>

          <div className="flip-card">
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
              <div className="flip-card-back card1">Prevent outbreaks →</div>
            </div>
          </div>

          <div className="flip-card">
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
              <div className="flip-card-back card1">Post pregnancy Care →</div>
            </div>
          </div>
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
                🥗 {language === "hi" ? "स्वास्थ्य" : "Health"}
              </div>
              <div className="flip-card-back card2">
                {language === "hi"
                  ? "स्वस्थ आहार योजना →"
                  : "Healthy Eating Plan →"}
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
                🧘 {language === "hi" ? "योग" : "Yoga"}
              </div>
              <div className="flip-card-back card2">
                {language === "hi"
                  ? "योग के लाभ जानें →"
                  : "Learn Benefits of Yoga →"}
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
                🌿 {language === "hi" ? "आयुर्वेद" : "Ayurveda"}
              </div>
              <div className="flip-card-back card2">
                {language === "hi"
                  ? "आयुर्वेदिक उपचार →"
                  : "Ayurvedic Treatments →"}
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="helplines-section">
        <h3>{t.emergencyHelplines}</h3>
        <ul>
          <li>📞 108</li>
          <li>🚑 102</li>
          <li>🦠 1075</li>
        </ul>
      </section>

      <footer className="gov-footer">
        <p>© 2025 Ministry of Health & Family Welfare, Government of India</p>
      </footer>
    </div>
  );
}
