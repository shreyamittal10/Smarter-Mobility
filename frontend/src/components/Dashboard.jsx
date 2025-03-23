import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CheckBadgeIcon, PaperClipIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/userstats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserStats(response.data);

      //This is example data, in the future we can get data from the user and then use it here
      setChartData({
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Total Distance (km)',
            data: [30, 50, 40, 60],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        ]});
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchStats(); 
  }, []);


  if (userStats === null) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
        <div className="text-center p-6 bg-gray-800 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">No stats available</h3>
          <p className="mb-4">Create a trip to check your stats!</p>
          <Link to="/trip-form" className="text-teal-400 hover:text-teal-300">Create a Trip</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6 flex flex-col">
        <h2 className="text-2xl font-bold text-center">Smarter Mobility</h2>
        <ul className="space-y-4 flex-grow">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/trip-form" className="hover:text-gray-300">
              Create a Trip
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-gray-300">
              Leaderboard
            </Link>
          </li>
        </ul>
        <div className="text-left mt-auto">
          <button onClick={handleLogout} className=" text-black px-4 py-2 rounded">Logout</button>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-900 text-white overflow-auto">
        <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md mb-6">
          <div className="text-xl font-semibold">Welcome to Your Dashboard</div>
        </div>

        {userStats && (
          <div className="bg-gray-800 p-6 shadow-lg rounded-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Total Distance Over Time</h3>
            <Line data={chartData} />
          </div>
        )}

        {userStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 p-6 shadow-lg rounded-md">
              <div className="flex items-center space-x-3">
                <PaperClipIcon className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Total Distance</h3>
                  <p className="text-2xl">{userStats.totalDistance} km</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 shadow-lg rounded-md">
              <div className="flex items-center space-x-3">
                <EllipsisVerticalIcon className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Total Emissions Saved</h3>
                  <p className="text-2xl">{userStats.totalEmissionsSaved} kg CO₂</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 shadow-lg rounded-md">
              <div className="flex items-center space-x-3">
                <CheckBadgeIcon className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Points</h3>
                  <p className="text-2xl">{userStats.points}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {userStats && (
          <div className="bg-gray-800 p-6 shadow-lg rounded-md mb-6 max-h-96 overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Badges</h3>
            <ul className="list-disc pl-5">
              {userStats.badges.length > 0 ? (
                userStats.badges.map((badge, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                    <span>{badge}</span>
                  </li>
                ))
              ) : (
                <p>No badges earned yet!</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
