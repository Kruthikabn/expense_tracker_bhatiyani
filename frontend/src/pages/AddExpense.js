import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

function AddExpense() {
  const [expense, setExpense] = useState({
    date: '',
    category: '',
    amount: '',
    note: ''
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/expenses', expense)
      .then((res) => {
        alert('Expense added!');
        // Optional: clear form
        setExpense({ date: '', category: '', amount: '', note: '' });
      })
      .catch((err) => {
        console.error('Error adding expense:', err);
        alert('Failed to add expense');
      });
  };

  return (
    <Container maxWidth="sm">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          value={expense.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Note"
          name="note"
          value={expense.note}
          onChange={handleChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Add Expense
        </Button>
      </form>
    </Container>
  );
}

export default AddExpense;
