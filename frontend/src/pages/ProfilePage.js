import React from 'react';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')); 

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default ProfilePage;