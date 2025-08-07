import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  // Fetch all expenses from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/expenses`)
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => console.error("Error fetching expenses:", err));
  }, [API_BASE]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleAddExpense = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE}/api/expenses`, newExpense)
      .then((res) => {
        console.log("Expense added:", res.data);
        setExpenses([...expenses, res.data]);
        setNewExpense({
          title: "",
          amount: "",
          category: "",
          date: ""
        });
      })
      .catch((err) => console.error("Error adding expense:", err));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>💰 Expense Tracker</h2>

      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          name="title"
          value={newExpense.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />
        <input
          type="text"
          name="category"
          value={newExpense.category}
          onChange={handleChange}
          placeholder="Category"
          required
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#1976d2", color: "#fff", border: "none" }}
        >
          ➕ Add Expense
        </button>
      </form>

      <h3 style={{ marginTop: "30px" }}>📋 Expenses List</h3>
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

export default ExpenseTracker;
