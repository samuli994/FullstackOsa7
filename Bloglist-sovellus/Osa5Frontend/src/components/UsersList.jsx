import React from 'react';
import { useSelector } from 'react-redux';

const UsersList = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            {user.name} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
