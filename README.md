# 🩺 SIH Health Bot

A health-focused chatbot application built for **Smart India Hackathon** using **React (frontend)** and **Django REST Framework (backend)**.  
It provides a simple chatbot interface, API integration, and multi-language support to spread healthcare awareness.

---

## 🚀 Features
- 💬 Chatbot with health-related responses  
- 🌐 Multi-language support (English, Hindi, etc.)  
- ⚡ Django REST API backend  
- 🎨 React + TailwindCSS frontend  
- 🔐 CORS enabled for frontend-backend communication  
- 🗄️ Environment variable management with dotenv  

---

## 🛠️ Tech Stack
**Frontend**: React, TailwindCSS  
**Backend**: Django, Django REST Framework, CORS Headers  
**Others**: Python-dotenv  

---

## 📂 Project Structure
sih-health-bot/
│
├── backend/ # Django backend
│ ├── core/ # Main project settings
│ ├── api/ # API endpoints (chat, health, etc.)
│ ├── requirements.txt # Python dependencies
│ └── manage.py # Django CLI
│
├── frontend/ # React frontend
│ ├── src/ # Components & pages
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
│
└── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/sih-health-bot.git
cd sih-health-bot
2️⃣ Backend Setup
bash
Copy code
cd backend
python -m venv .venv
.\.venv\Scripts\activate     # (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Backend will run at 👉 http://127.0.0.1:8000

3️⃣ Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm start
Frontend will run at 👉 http://localhost:3000

🔗 API Endpoints
GET /api/health/ → Returns { "status": "healthy" }

POST /api/chat/ → Accepts { "message": "Hello" } and returns chatbot response

🧑‍💻 Team
Manjeet Kumar

[Add teammates if any]

