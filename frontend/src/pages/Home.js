import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from '../components/Charts';
import Notifications from '../components/Notifications';
import {
  Typography,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios
      .get(`${API_BASE}/api/expenses`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error('Error fetching expenses:', err));
  };

  const deleteExpense = (index) => {
    axios
      .delete(`${API_BASE}/api/expenses/${index}`)
      .then(() => {
        const updated = [...expenses];
        updated.splice(index, 1);
        setExpenses(updated);
      })
      .catch((err) => console.error('Error deleting expense:', err));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>📋 Dashboard</Typography>

      {/* Add Expense Button */}
      <Button
        component={Link}
        to="/add"
        variant="contained"
        color="primary"
        style={{ marginBottom: '1.5rem' }}
      >
        ➕ Add Expense
      </Button>

      <Notifications />
      <Charts expenses={expenses} />

      <Divider style={{ margin: '2rem 0' }} />

      <Typography variant="h6">🧾 All Expenses</Typography>
      {expenses.length === 0 ? (
        <Typography>No expenses yet.</Typography>
      ) : (
        <List>
          {expenses.map((exp, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteExpense(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${exp.title} - ₹${exp.amount}`}
                secondary={`${exp.category} on ${exp.date}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;
