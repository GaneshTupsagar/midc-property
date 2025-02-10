'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SEOPageAnalytics() {
  const [pageData, setPageData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Simulated data - replace with actual API call
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = {
      labels,
      datasets: [
        {
          label: 'Organic Traffic',
          data: [1200, 1900, 3000, 5000, 6000, 7000],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Bounce Rate',
          data: [45, 42, 38, 35, 32, 30],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    setPageData(data);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Page Performance Analytics',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Page Analytics</h2>
      <div className="h-[400px]">
        <Line options={options} data={pageData} />
      </div>
    </div>
  );
}
