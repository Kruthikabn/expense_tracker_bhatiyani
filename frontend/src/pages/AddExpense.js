// src/pages/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';

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
    axios.post(`${API_BASE}/api/expenses`, newExpense)
      .then((res) => {
        alert("Expense added!");
        setNewExpense({ title: '', amount: '', category: '', date: '' });
      })
      .catch((err) => console.error("Error adding expense:", err));
  };

  return (
    <Paper elevation={3} style={{ padding: 24, maxWidth: 500, margin: '2rem auto' }}>
      <Typography variant="h5" gutterBottom>➕ Add New Expense</Typography>
      <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Title"
          name="title"
          value={newExpense.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={newExpense.amount}
          onChange={handleChange}
          required
        />
        <TextField
          label="Category"
          name="category"
          value={newExpense.category}
          onChange={handleChange}
          required
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newExpense.date}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Expense
        </Button>
      </form>
    </Paper>
  );
};

export default AddExpense;
