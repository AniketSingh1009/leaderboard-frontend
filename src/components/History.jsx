import React, { useEffect, useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

  // Fetch history data when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/claimhistory');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  // Function to format timestamp to DD/MM/YYYY format
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date'; // Check if the timestamp exists
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid dates
    
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const year = date.getFullYear();

    // Return the formatted date as DD/MM/YYYY
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  // Toggle function for showing/hiding the history
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Claim Points History</h2>
      {/* Toggle Button */}
      <button
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-300 mb-4"
        onClick={toggleHistory}
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {/* Conditionally render the history */}
      {showHistory && (
        <ul>
          {history.length > 0 ? (
            history.map((item, index) => (
              <li key={index} className="mb-2">
                {item.userName} claimed {item.points} points on {formatDate(item.timestamp)}
              </li>
            ))
          ) : (
            <p>No points have been claimed yet.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default History;
