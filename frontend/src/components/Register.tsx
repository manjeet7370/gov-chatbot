// // components/Register.tsx
// // Add this at the top of both files
// interface ApiError {
//   response?: {
//     data?: {
//       detail?: string;
//       message?: string;
//     };
//   };
// }

// import { useState } from "react";
// import axios from "axios";
// // Add this at the top of both files

// interface RegisterProps {
//   onBack: () => void;
//   onRegisterSuccess: (tokenData: { access: string; refresh: string }) => void;
// }

// function Register({ onBack, onRegisterSuccess }: RegisterProps) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/register/", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       });

//       onRegisterSuccess({
//         access: response.data.access,
//         refresh: response.data.refresh,
//       });
//     } catch (err: any) {
//       if (err.response?.data) {
//         setError(err.response.data.message || "Registration failed");
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <button className="back-button" onClick={onBack}>
//           &larr; Back
//         </button>
//         <h2>Register</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//         <p>
//           Already have an account? <button onClick={onBack}>Login</button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

//new
import { useState } from "react";
import axios from "axios";
import "../index.css";
// import { API_BASE_URL } from "../../config";


interface RegisterProps {
  onBack: () => void;
  onRegisterSuccess: (tokenData: { access: string; refresh: string }) => void;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
  };
}

function Register({ onBack, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"hi" | "en">("en");

  const translations = {
    hi: {
      title: "स्वास्थ्य सेवा पोर्टल",
      subtitle: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      username: "उपयोगकर्ता नाम",
      usernamePlaceholder: "अपना उपयोगकर्ता नाम दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      password: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "अपना पासवर्ड फिर से दर्ज करें",
      button: "रजिस्टर करें",
      processing: "प्रसंस्करण...",
      back: "ऐप पर वापस जाएं",
      terms: "जारी रखने पर, आप हमारी सेवा की शर्तों से सहमत होते हैं",
      account: "पहले से ही एक खाता मौजूद है?",
      signIn: "साइन इन करें",
      error: "रजिस्ट्रेशन विफल। कृपया पुनः प्रयास करें।",
      passwordMismatch: "पासवर्ड मेल नहीं खा रहे हैं",
    },
    en: {
      title: "Health Service Portal",
      subtitle: "Ministry of Health & Family Welfare",
      username: "Username",
      usernamePlaceholder: "Enter your username",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      button: "Register",
      processing: "Processing...",
      back: "Back to App",
      terms: "By continuing, you agree to our Terms of Service",
      account: "Already have an account?",
      signIn: "Sign In",
      error: "Registration failed. Please try again.",
      passwordMismatch: "Passwords do not match",
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(
        language === "hi" ? t.passwordMismatch : "Passwords do not match"
      );
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      setError(
        language === "hi" ? "सभी फ़ील्ड आवश्यक हैं" : "All fields are required"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      onRegisterSuccess({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.response?.data) {
        setError(
          error.response.data.detail || error.response.data.message || t.error
        );
      } else {
        setError(t.error);
      }
    } finally {
      setLoading(false);
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
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">{t.username}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t.usernamePlaceholder}
              required
            />
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t.passwordPlaceholder}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t.confirmPasswordPlaceholder}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? t.processing : t.button}
          </button>
        </form>

        <div className="login-footer">
          <p>{t.terms}</p>
          <p>
            {t.account}{" "}
            <span className="link" onClick={onBack}>
              {t.signIn}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
