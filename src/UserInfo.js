import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const user = response.data.results[0];
      setUserData({ fullName: `${user.name.first} ${user.name.last}`, email: user.email });
      localStorage.setItem('userData', JSON.stringify({ fullName: `${user.name.first} ${user.name.last}`, email: user.email }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      fetchUserData();
    }
  }, []);

  const refreshUserData = () => {
    fetchUserData();
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.fullName}</h2>
          <p>{userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={refreshUserData}>Refresh</button>
    </div>
  );
};

export default UserInfo;
