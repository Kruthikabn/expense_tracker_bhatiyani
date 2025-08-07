import React, { useEffect, useState } from "react";
import axios from "axios";
import Charts from '../components/Charts';


const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("https://expense-tracker-bhatiyani.onrender.com/api/expenses")
      .then((res) => {
        console.log("Expenses from API:", res.data);
        setExpenses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📋 All Expenses</h2>
      <ul>
        {expenses.map((exp, idx) => (
          <li key={idx}>
            {exp.title} - ₹{exp.amount} on {exp.date} ({exp.category})
          </li>
        ))}
      </ul>

      <h2>📊 Dashboard</h2>
      <Charts expenses={expenses} />
    </div>
  );
};

export default Dashboard;
