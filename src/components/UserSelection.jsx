import React, { useEffect, useState } from 'react';

const UserSelection = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/api/getuser');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="mb-4">
      <select onChange={(e) => onUserSelect(e.target.value)} className="p-2 border rounded">
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
