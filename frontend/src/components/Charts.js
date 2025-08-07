import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Charts = ({ expenses }) => {
  // Group by category
  const categoryTotals = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71'],
      },
    ],
  };

  // Group by date
  const dailyTotals = {};
  expenses.forEach((exp) => {
    dailyTotals[exp.date] = (dailyTotals[exp.date] || 0) + Number(exp.amount);
  });

  const lineData = {
    labels: Object.keys(dailyTotals),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.values(dailyTotals),
        fill: false,
        borderColor: '#3498db',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Category-wise Expense</h3>
      <div style={{ width: '300px', height: '300px', marginBottom: '2rem' }}>
        <Pie data={pieData} />
      </div>

      <h3>Daily Spend Trend</h3>
      <div style={{ width: '500px', height: '300px' }}>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;
