import { useState } from "react";
import "../App.css";

interface LoginFormData {
  name: string;
  email: string;
  phone: string;
}

interface LoginErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface LoginProps {
  onBack: () => void;
}

function Login({ onBack }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<"hi" | "en">("en");

  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा पोर्टल",
      subtitle: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      name: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      phone: "फोन नंबर",
      phonePlaceholder: "अपना 10-अंकीय फोन नंबर दर्ज करें",
      button: "लॉगिन / पंजीकरण",
      processing: "प्रसंस्करण...",
      back: "ऐप पर वापस जाएं",
      terms: "जारी रखने पर, आप हमारी सेवा की शर्तों से सहमत होते हैं",
      account: "पहले से ही एक खाता मौजूद है?",
      signIn: "साइन इन करें",
    },
    en: {
      title: "Health Service Portal",
      subtitle: "Ministry of Health & Family Welfare",
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      phone: "Phone Number",
      phonePlaceholder: "Enter your 10-digit phone number",
      button: "Login / Register",
      processing: "Processing...",
      back: "Back to App",
      terms: "By continuing, you agree to our Terms of Service",
      account: "Already have an account?",
      signIn: "Sign In",
    },
  };

  const t = translations[language];

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = language === "hi" ? "नाम आवश्यक है" : "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        language === "hi"
          ? "नाम कम से कम 2 अक्षरों का होना चाहिए"
          : "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email =
        language === "hi" ? "ईमेल आवश्यक है" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        language === "hi"
          ? "कृपया एक वैध ईमेल पता दर्ज करें"
          : "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone =
        language === "hi" ? "फोन नंबर आवश्यक है" : "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone =
        language === "hi"
          ? "कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें"
          : "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format phone number as user types
    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      let formattedValue = digits;

      if (digits.length > 3 && digits.length <= 6) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else if (digits.length > 6) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(
          3,
          6
        )}-${digits.slice(6, 10)}`;
      }

      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name as keyof LoginErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        alert(
          language === "hi"
            ? "लॉगिन सफल! (बैकेंड से बाद में जुड़ेगा)"
            : "Login successful! (This will connect to backend later)"
        );
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="language-toggle login-language">
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
            src="/assets/ashok2.png"
            alt="Emblem of India"
            className="login-logo"
          />
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <button className="back-button" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 13L6 8l5-5v10z" />
          </svg>
          {t.back}
        </button>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.phonePlaceholder}
              className={errors.phone ? "error" : ""}
              maxLength={12}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.processing : t.button}
          </button>
        </form>

        <div className="login-footer">
          <p>{t.terms}</p>
          <p>
            {t.account} <span className="link">{t.signIn}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
