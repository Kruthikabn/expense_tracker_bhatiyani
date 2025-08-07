import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from '../components/Charts';
import Notifications from '../components/Notifications';
import { Link } from 'react-router-dom';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/expenses`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, [API_BASE]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📋 All Expenses</h2>

      {/* ➕ Add Expense Button */}
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <Link to="/add">
          <button style={{
            padding: "10px 15px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            ➕ Add Expense
          </button>
        </Link>
      </div>

      <Notifications />
      <Charts expenses={expenses} />

      <ul>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expenses.map((exp, index) => (
            <li key={index}>
              <strong>{exp.title}</strong> - ₹{exp.amount} on {exp.date} ({exp.category})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
