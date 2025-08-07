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
  console.log("📊 Received expenses:", expenses);

  if (!expenses || expenses.length === 0) {
    return <p style={{ padding: "1rem" }}>No data to display charts.</p>;
  }

  // Group by category
  const categoryTotals = {};
  expenses.forEach((exp) => {
    const category = exp.category || "Uncategorized";
    const amount = parseFloat(exp.amount) || 0;
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8E44AD",
          "#2ECC71",
          "#F39C12",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Group by date (sort ascending)
  const dailyTotals = {};
  expenses.forEach((exp) => {
    const date = exp.date || "Unknown";
    const amount = parseFloat(exp.amount) || 0;
    dailyTotals[date] = (dailyTotals[date] || 0) + amount;
  });

  const sortedDates = Object.keys(dailyTotals).sort();

  const lineData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Daily Expenses",
        data: sortedDates.map((date) => dailyTotals[date]),
        fill: false,
        borderColor: "#3498db",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>📊 Category-wise Expense</h3>
      <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
        <Pie data={pieData} />
      </div>

      <h3 style={{ marginTop: "2rem" }}>📈 Daily Spend Trend</h3>
      <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;
