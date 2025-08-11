# 💰 Expense Tracker – Bhatiyani

> ⚠️ **Note:** When you first open the project, please wait a few seconds for the charts to load.  
> The backend is hosted on Render free tier, so it may take 20–40 seconds to wake up after being idle.

A full-stack personal expense tracker app that allows users to add, view, and delete expenses, visualize spending using charts, and get notifications.  
Built for the **Full Stack Developer Assessment – Bhatiyani Astute Intelligence Pvt. Ltd.**

---

## 🚀 Live Links
- **Frontend (Vercel)**: https://expense-tracker-bhatiyani.vercel.app/
- **Backend (Render)**: https://expense-tracker-bhatiyani.onrender.com/api/expenses
- **GitHub Repo**: https://github.com/Kruthikabn/expense_tracker_bhatiyani

---

## 🖥 Tech Stack

### Frontend
- React (JavaScript)
- Material UI (MUI) components
- MUI Icons
- Chart.js (react-chartjs-2 wrapper)
- Axios (for API calls)
- React Router (for navigation)

### Backend
- Flask (Python)
- Flask-CORS
- JSON file for persistent storage

### Additional
- JSON Server (for mock notifications)
- Vercel (Frontend hosting)
- Render (Backend hosting)

---

## 📦 Features
- ➕ Add new expenses
- 🗑 Delete existing expenses
- 📊 Category-wise Pie Chart
- 📈 Daily expense Line Chart
- 🔔 Notifications panel (from JSON Server)
- Responsive UI with MUI
- Persistent storage via JSON file in backend

---

## 📂 Folder Structure
expense_tracker_bhatiyani/
├── backend/
│ ├── app.py
│ ├── data.json
│ ├── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Home.js
│ │ │ ├── AddExpense.js
│ │ ├── components/
│ │ │ ├── Charts.js
│ │ │ ├── Notifications.js
| | | ├── ExpenseTracker.js
│ ├── package.json
├── prompts.md
├── README.md



## ⚙️ Installation & Running Locally

### 1️⃣ Clone Repository

git clone https://github.com/Kruthikabn/expense_tracker_bhatiyani.git
cd expense_tracker_bhatiyani

2️⃣ Backend Setup

cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python app.py
Backend runs at: http://localhost:5000

3️⃣ Frontend Setup

cd ../frontend
npm install
npm start
Frontend runs at: http://localhost:3000

4️⃣ JSON Server for Notifications

npm install -g json-server
json-server --watch db.json --port 3001


🔗 API Endpoints
Expenses
GET /api/expenses → Get all expenses

POST /api/expenses → Add new expense

DELETE /api/expenses/<index> → Delete expense by index

Notifications
GET /api/notifications → Get list of notifications

📘 AI Usage Documentation
See prompts.md for AI prompt history and usage.

👩‍💻 Author
Kruthika B. N.
GitHub: Kruthikabn


