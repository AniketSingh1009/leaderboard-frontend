import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddUser = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Username can't be empty!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      
      // Logging the data to make sure the response is correct
      console.log('User added:', data);

      // Trigger parent component to refresh the user list
      onUserAdded(data);

      // Show success toast
      toast.success('User registered successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      // Clear input field
      setUsername('');

    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('An error occurred. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleAddUser} className="mb-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="border border-gray-400 p-2 rounded mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUser;
