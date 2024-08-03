import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const { username } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter((blog) => blog.user.username === username);
  const user = userBlogs.length > 0 ? userBlogs[0].user : null;

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
