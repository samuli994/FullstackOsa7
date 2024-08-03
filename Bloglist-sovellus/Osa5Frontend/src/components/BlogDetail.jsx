import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = ({ blog, handleLike, handleDelete, currentUser }) => {
  const { id } = useParams();

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const blogStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const buttonStyle = {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '5px',
  };

  const likeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const showDeleteButton =
    currentUser && blog.user && currentUser.username === blog.user.username;

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button style={likeButtonStyle} onClick={() => handleLike(blog.id)}>like</button>
      </p>
      <p>Added by: {blog.user.username}</p>
      {showDeleteButton && (
        <button style={deleteButtonStyle} onClick={() => handleDelete(blog.id)}>delete</button>
      )}
    </div>
  );
};

export default BlogDetail;