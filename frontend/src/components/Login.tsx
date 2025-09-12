import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ Dynamic API URL
import "../App.css"; // ✅ Government-style CSS
import ashokEmblem from "../assets/ashok2.png"; // ✅ Import Image from src/assets

// ✅ Props Interface (from App.tsx)
interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (tokenData: { access: string; refresh: string }) => void;
}

// ✅ Type Safety for Form Data
interface LoginFormData {
  username: string;
  password: string;
}

// ✅ Type Safety for API Errors
interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
  };
}

export default function Login({ onBack, onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"hi" | "en">("en");

  // ✅ Government Style Translations
  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा पोर्टल",
      subtitle: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      username: "उपयोगकर्ता नाम",
      usernamePlaceholder: "अपना उपयोगकर्ता नाम दर्ज करें",
      password: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      button: "लॉगिन",
      processing: "प्रसंस्करण...",
      back: "ऐप पर वापस जाएं",
      terms: "जारी रखने पर, आप हमारी सेवा की शर्तों से सहमत होते हैं",
      account: "खाता नहीं है?",
      signUp: "रजिस्टर करें",
      error: "लॉगिन विफल। कृपया पुनः प्रयास करें।",
      required: "यह फ़ील्ड आवश्यक है",
    },
    en: {
      title: "Health Service Portal",
      subtitle: "Ministry of Health & Family Welfare",
      username: "Username",
      usernamePlaceholder: "Enter your username",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      button: "Login",
      processing: "Processing...",
      back: "Back to App",
      terms: "By continuing, you agree to our Terms of Service",
      account: "Don't have an account?",
      signUp: "Sign Up",
      error: "Login failed. Please try again.",
      required: "This field is required",
    },
  };

  const t = translations[language];

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError(""); // Clear error on typing
  };

  // ✅ Handle Form Submit (Connect to Backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Basic Validation
    if (!formData.username) {
      setError(t.required);
      return;
    }
    if (!formData.password) {
      setError(t.required);
      return;
    }

    setLoading(true);
    try {
      // ✅ Use Dynamic API URL from config
      const response = await axios.post(
        `${API_BASE_URL}/token/`,
        { ...formData },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Send Tokens to App.tsx for Login
      onLoginSuccess({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    } catch (err: unknown) {
      const error = err as ApiError;
      // ✅ Show Backend Error (e.g., "Invalid credentials")
      setError(
        error.response?.data?.detail || error.response?.data?.message || t.error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gov-login-container"> {/* ✅ Government Style Class */}
      <div className="gov-login-card"> {/* ✅ Government Style Class */}
        {/* Header with Language Toggle & Logo */}
        <div className="gov-login-header">
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

          <img
            src={ashokEmblem} // ✅ Use Imported Image (src/assets me hai)
            alt="Emblem of India"
            className="gov-login-logo"
          />
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        {/* Back Button */}
        <button className="gov-back-button" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 13L6 8l5-5v10z" />
          </svg>
          {t.back}
        </button>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="gov-login-form">
          {/* Error Message */}
          {error && <div className="gov-error-message">{error}</div>}

          {/* Username Field */}
          <div className="gov-form-group">
            <label htmlFor="username">{t.username}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t.usernamePlaceholder}
              className="gov-input"
              required
            />
          </div>

          {/* Password Field */}
          <div className="gov-form-group">
            <label htmlFor="password">{t.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t.passwordPlaceholder}
              className="gov-input"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="gov-login-button"
            disabled={loading}
          >
            {loading ? t.processing : t.button}
          </button>
        </form>

        {/* Footer */}
        <div className="gov-login-footer">
          <p className="gov-terms">{t.terms}</p>
          <p className="gov-signup-link">
            {t.account}{" "}
            <span className="gov-link" onClick={onBack}>
              {t.signUp}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}