import React, { useState, useEffect } from 'react';
import UserSelection from './components/UserSelection';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import History from './components/History';  // Import History component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Import Tailwind CSS
const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [users, setUsers] = useState([]);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);  // State to refresh leaderboard
  const [showLeaderboard, setShowLeaderboard] = useState(false);  // State to show/hide leaderboard

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/api/getusers');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleClaim = (data) => {
    setClaimedPoints(data.claimedPoints);
    setRefreshLeaderboard((prev) => !prev);  // Trigger leaderboard refresh
  };

  const handleUserAdded = (newUser) => {
    console.log('New user added:', newUser); // Check if the new user is received
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the list
    toast.success('User registered successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };
  
  

  const toggleLeaderboard = () => {
    setShowLeaderboard((prev) => !prev);  // Toggle leaderboard visibility
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Leaderboard System</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <UserSelection onUserSelect={handleUserSelect} />
      <ClaimPoints userId={selectedUserId} onClaim={handleClaim} />
      {claimedPoints && (
        <p className="mt-2 text-green-600">
          You claimed {claimedPoints} points!
        </p>
      )}

      {/* Leaderboard toggle button */}
      <button
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-300 mt-6"
        onClick={toggleLeaderboard}
      >
        {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>

      {/* Conditionally render the leaderboard if showLeaderboard is true */}
      {showLeaderboard && (
        <Leaderboard refresh={refreshLeaderboard} />
      )}

      {/* Render History component */}
      <History />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default App;
