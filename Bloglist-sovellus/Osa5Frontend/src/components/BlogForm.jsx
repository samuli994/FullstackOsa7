import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url, user: user.name });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  // Define styles
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff', // Bootstrap primary color
    color: 'white',
    fontSize: '16px',
    width: '100%',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label style={{ marginBottom: '5px', display: 'block' }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={{ marginBottom: '5px', display: 'block' }}>Author</label>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={{ marginBottom: '5px', display: 'block' }}>URL</label>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>Create</button>
    </form>
  );
};

export default BlogForm;
