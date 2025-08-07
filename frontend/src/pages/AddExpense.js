// src/pages/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE}/api/expenses`, newExpense)
      .then((res) => {
        alert("Expense added!");
        setNewExpense({ title: '', amount: '', category: '', date: '' });
      })
      .catch((err) => console.error("Error adding expense:", err));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>➕ Add New Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input type="text" name="title" value={newExpense.title} onChange={handleChange} placeholder="Title" required />
        <input type="number" name="amount" value={newExpense.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="category" value={newExpense.category} onChange={handleChange} placeholder="Category" required />
        <input type="date" name="date" value={newExpense.date} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;
