import React from 'react';

const ClaimPoints = ({ userId, onClaim }) => {
  const handleClaim = async () => {
    const response = await fetch('https://leaderboard-backend-qbmd-mqvisn721.vercel.app/claimpoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    onClaim(data);
  };

  return (
    <button
      onClick={handleClaim}
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      disabled={!userId}
    >
      Claim Points
    </button>
  );
};

export default ClaimPoints;
