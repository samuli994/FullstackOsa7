import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Blogs</Link>
      <span> | </span>
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default Navigation;
