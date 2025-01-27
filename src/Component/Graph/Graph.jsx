import React from "react";
import { Line } from "react-chartjs-2";
import { FiUsers } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";
import { MdAttachMoney } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa6";

// Register necessary chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);
const Graph = () => {
  const data4 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 35],
        fill: true, // Enable the background fill
        borderColor: "#2377fc", // Background below the line
        backgroundColor: "#cee1fe", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointRadius: 3, // Small dots on data points
        pointBackgroundColor: "#2377fc",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
    },
  };
  return (
    <div>
      <div style={{ width: "100%", height: "300px" }}>
        <Line data={data4} options={options} />
      </div>
    </div>
  );
};

export default Graph;
