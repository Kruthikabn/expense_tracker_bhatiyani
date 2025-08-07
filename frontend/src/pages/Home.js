import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from '../components/Charts';
import Notifications from '../components/Notifications';

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Failed to fetch expenses:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      
      {/* Show alerts */}
      <Notifications />

      {/* Show charts */}
      <Charts expenses={expenses} />
    </div>
  );
};

export default Home;
