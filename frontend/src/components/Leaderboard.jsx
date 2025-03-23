import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CheckBadgeIcon, PaperClipIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch leaderboard');
      }
    };

    fetchLeaderboard();
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  if (error) {
    return <div>{error}</div>;
  }

  const topUsers = leaderboard.slice(0, 3);

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
          <button
            onClick={onLogout} 
            className=" text-black px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-900 text-white overflow-auto">
        <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md mb-6">
          <div className="text-xl font-semibold">Leaderboard</div>
        </div>

        <div className="bg-gray-800 p-6 shadow-lg rounded-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Top 3 Users</h3>
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div
                key={user.userId._id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-md shadow-md mb-4"
              >
                <div className="flex items-center space-x-3">
                  <PaperClipIcon className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{index + 1}. {user.userId.name}</h3>
                    <p className="text-lg">{user.points} points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
