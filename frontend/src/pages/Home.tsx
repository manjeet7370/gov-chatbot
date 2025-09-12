import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <img src="/emblem.png" alt="India Emblem" className="mx-auto w-24" />
      
      <h1 className="font-hindi">
        स्वास्थ्य सेवा पोर्टल 🇮🇳
      </h1>
      
      <p>
        A Digital Health Assistant by Ministry of Health & Family Welfare. 
        Get information about diseases, vaccines, and healthcare services in one place.
      </p>

      <div className="home-actions">
        <a href="/login" className="login-btn">🔑 Login</a>
        <a href="/register" className="register-btn">📝 Register</a>
        <a href="/chat" className="chat-btn">💬 ChatBot</a>
      </div>
    </div>
  );
}