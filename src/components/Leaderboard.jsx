import React, { useState, useEffect } from 'react';

const Leaderboard = ({ refresh }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('http://localhost:4000/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, [refresh]);  // Re-fetch leaderboard when `refresh` changes

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4 ml-4">Leaderboard</h2>
      <ul className="list-none space-y-2">
        {leaderboard.map((user, index) => (
          <li
            key={user._id}
            className="p-2 bg-gray-100 rounded border border-gray-300"
          >
            <span className="font-semibold">{index + 1}. {user.name}</span>
            <span className="ml-4">Points: {user.totalPoints}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
