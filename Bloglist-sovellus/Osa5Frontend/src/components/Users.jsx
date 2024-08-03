import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => {
    const uniqueUsers = blogs
      .map((blog) => blog.user)
      .filter(
        (user, index, self) =>
          self.findIndex((u) => u.username === user.username) === index
      );

    return uniqueUsers.map((user) => {
      const blogCount = blogs.filter(
        (blog) => blog.user.username === user.username
      ).length;
      return { ...user, blogCount };
    });
  });

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <Link to={`/users/${user.username}`}>
              {user.name} ({user.blogCount} blogs)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
