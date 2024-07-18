// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const columns = [
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Joined At",
    dataIndex: "joinedAt",
    key: "joinedAt",
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: "Registrations Per Month",
        data: new Array(12).fill(0), // Initialize with zeros for each month
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/userReg`);
        const usersData = response.data.result.map((user, index) => ({
          key: index,
          companyName: user.companyName,
          joinedAt: user.createdAt,
          status: user.status,
        }));

        setUsers(usersData);

        // Process data to count registrations per month
        const registrationsPerMonth = new Array(12).fill(0);
        usersData.forEach((user) => {
          const month = new Date(user.joinedAt).getMonth();
          registrationsPerMonth[month]++;
        });

        setChartData({
          labels,
          datasets: [
            {
              fill: true,
              label: "Registrations Per Month",
              data: registrationsPerMonth,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center w-full " ><Spin size="large" className="w-full h-full flex justify-center items-center" /></div>;
  }

  return (
    <div className="w-full min-h-screen p-5">
      
      <div className="mt-10">
        <Line options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Company Registrations Per Month",
            },
          },
        }} data={chartData} className="w-full" />
      </div>
      <div className="w-full mt-20">
        <Table columns={columns} dataSource={users} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
}
