// src/components/Charts.js
import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

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
  if (!expenses || expenses.length === 0) {
    return <p>No data to display charts.</p>;
  }

  const categoryTotals = {};
  expenses.forEach((exp) => {
    const category = exp.category || "Uncategorized";
    const amount = parseFloat(exp.amount) || 0;
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: "Expenses by Category",
      data: Object.values(categoryTotals),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71", "#F39C12"],
    }]
  };

  const dailyTotals = {};
  expenses.forEach((exp) => {
    const date = exp.date || "Unknown";
    const amount = parseFloat(exp.amount) || 0;
    dailyTotals[date] = (dailyTotals[date] || 0) + amount;
  });

  const sortedDates = Object.keys(dailyTotals).sort();
  const lineData = {
    labels: sortedDates,
    datasets: [{
      label: "Daily Expenses",
      data: sortedDates.map((d) => dailyTotals[d]),
      borderColor: "#3498db",
      tension: 0.3
    }]
  };

  return (
    <div>
      <h3>📊 Category-wise Expense</h3>
      <Pie data={pieData} />
      <h3>📈 Daily Spend Trend</h3>
      <Line data={lineData} />
    </div>
  );
};

export default Charts;
