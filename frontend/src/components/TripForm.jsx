import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TripForm = () => {
  const [transportType, setTransportType] = useState('');
  const [distance, setDistance] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in first');
      return;
    }
  

    try {
      const response = await axios.post(
        'http://localhost:5000/api/trips/log',
        { transportType, distance : parseFloat(distance) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message); 
      setTransportType(''); // Reset form fields after successful submission
      setDistance('');

      
    } catch (error) {
      setMessage('Failed to log trip');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6 flex flex-col">
        <h2 className="text-2xl font-bold text-center">Smarter Mobility</h2>
        <ul className="space-y-4 flex-grow">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/trip-form" className="hover:text-gray-300">Create a Trip</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link>
          </li>
        </ul>
        <div className="text-left mt-auto">
          <button onClick={handleLogout} className=" text-black px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 text-white p-8 shadow-xl rounded-xl w-full max-w-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Log a Trip</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="transportType" className="block text-sm font-semibold mb-2">Transport Type</label>
              <select
                id="transportType"
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
                required
                className="w-full p-4 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Transport Type</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="bike">Bike</option>
                <option value="train">Train</option>
                <option value="walking">Walking</option>
              </select>
            </div>

            <div>
              <label htmlFor="distance" className="block text-sm font-semibold mb-2">Distance in kilometers</label>
              <input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="Enter distance"
                required
                className="w-full p-4 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3  text-black rounded-md hover:bg-blue-700 transition duration-200"
              >
                Log Trip
              </button>
            </div>
          </form>

          {message && <p className="mt-4 text-center text-white">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default TripForm;
