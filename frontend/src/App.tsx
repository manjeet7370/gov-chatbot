import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Home from "./pages/Home";


function App() {
  const [language, setLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Top Government Bar */}
        <div className="bg-gradient-to-r from-saffron via-white to-green h-1"></div>
        
        <div className="flex">
          {/* ===== Sidebar ===== */}
          <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-govBlue min-h-screen sidebar-transition shadow-2xl sidebar-container`}>
            {/* Logo Section */}
            <div className="p-6 bg-white/10 backdrop-blur">
              <div className="flex items-center space-x-3">
                <img 
                  src="/emblem.png" 
                  alt="India" 
                  className="w-16 h-16"
                />
                <div className={`${!sidebarOpen && 'hidden'}`}>
                  <h2 className="text-white font-bold text-lg hindi-text">भारत सरकार</h2>
                  <p className="text-white/80 text-sm">Government of India</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-4">
              <NavLink 
                to="/" 
                className={({isActive}) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive 
                    ? 'bg-white text-govBlue shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">🏠</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>Home</span>
              </NavLink>

              <NavLink 
                to="/login" 
                className={({isActive}) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive 
                    ? 'bg-white text-govBlue shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">🔑</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>Login</span>
              </NavLink>

              <NavLink 
                to="/register" 
                className={({isActive}) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive 
                    ? 'bg-white text-govBlue shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">📝</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>Register</span>
              </NavLink>

              <NavLink 
                to="/profile" 
                className={({isActive}) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive 
                    ? 'bg-white text-govBlue shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">👤</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>Profile</span>
              </NavLink>

              <NavLink 
                to="/chat" 
                className={({isActive}) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all
                  ${isActive 
                    ? 'bg-white text-govBlue shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">💬</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>AI Assistant</span>
              </NavLink>
            </nav>

            {/* Sidebar Toggle */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute -right-3 top-28 bg-white rounded-full p-2 shadow-lg sidebar-toggle"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </aside>

          {/* ===== Main Content Area ===== */}
          <main className="flex-1">
            {/* Government Header */}
            <header className="bg-white shadow-md px-8 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-govBlue hindi-text">
                    स्वास्थ्य सेवा पोर्टल
                  </h1>
                  <p className="text-gray-600">
                    Ministry of Health & Family Welfare
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Language Switcher */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => setLanguage('hi')}
                      className={`px-4 py-2 rounded ${language === 'hi' ? 'bg-saffron text-white' : ''}`}
                    >
                      हिंदी
                    </button>
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`px-4 py-2 rounded ${language === 'en' ? 'bg-govBlue text-white' : ''}`}
                    >
                      English
                    </button>
                  </div>
                  
                  {/* Accessibility */}
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    A+
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    A-
                  </button>
                </div>
              </div>
            </header>

            {/* Emergency Alert Bar */}
            <div className="bg-red-600 text-white px-8 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="emergency-pulse">🚨</span>
                <span>Emergency Helpline: 108 | COVID-19: 1075</span>
              </div>
              <div className="flex space-x-4 text-sm">
                <span>Blood Bank: 1910</span>
                <span>Ambulance: 102</span>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </div>

            {/* Government Footer */}
            <footer className="bg-govBlue text-white mt-auto">
              <div className="px-8 py-6">
                <div className="footer-grid">
                  <div>
                    <h3 className="font-bold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-saffron">RTI</a></li>
                      <li><a href="#" className="hover:text-saffron">Grievance</a></li>
                      <li><a href="#" className="hover:text-saffron">Tenders</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Services</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-saffron">CoWIN</a></li>
                      <li><a href="#" className="hover:text-saffron">Ayushman Bharat</a></li>
                      <li><a href="#" className="hover:text-saffron">e-Hospital</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-saffron">Guidelines</a></li>
                      <li><a href="#" className="hover:text-saffron">Statistics</a></li>
                      <li><a href="#" className="hover:text-saffron">Reports</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Connect</h3>
                    <div className="flex space-x-3">
                      <a href="#" className="hover:text-saffron">📘</a>
                      <a href="#" className="hover:text-saffron">🐦</a>
                      <a href="#" className="hover:text-saffron">📷</a>
                      <a href="#" className="hover:text-saffron">📺</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/20 px-8 py-4 text-center text-sm">
                © 2025 Ministry of Health & Family Welfare | Government of India | 
                Last Updated: {new Date().toLocaleDateString()}
              </div>
            </footer>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;