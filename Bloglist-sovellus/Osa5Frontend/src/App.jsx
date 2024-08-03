import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogDetail from './components/BlogDetail';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import { setNotification } from './store/notificationSlice';
import { setBlogs, addBlog, likeBlog, removeBlog } from './store/blogSlice';
import { setUser, clearUser } from './store/userSlice';
import Togglable from './components/Togglable';
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const initialBlogs = [
      {
        id: '1',
        title: 'First Example Blog',
        author: 'Author One',
        url: 'http://example.com/first',
        likes: 5,
        user: { username: 'userone', name: 'User One' },
      },
      {
        id: '2',
        title: 'Second Example Blog',
        author: 'Author Two',
        url: 'http://example.com/second',
        likes: 3,
        user: { username: 'usertwo', name: 'User Two' },
      },
      {
        id: '3',
        title: 'Third Example Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 7,
        user: { username: 'userthree', name: 'User Three' },
      },
    ];
    dispatch(setBlogs(initialBlogs));
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    const users = [
      { username: 'user1', password: 'password1', name: 'User One' },
      { username: 'user2', password: 'password2', name: 'User Two' },
      { username: 'user3', password: 'password3', name: 'User Three' }
    ];
  
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
  
    if (user) {
      dispatch(setUser({ name: user.name, username: user.username }));
      navigate('/');
    } else {
      dispatch(setNotification({ message: 'Wrong username or password', type: 'error' }));
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const addNewBlog = async (blogObject) => {
    try {
      const newBlog = {
        ...blogObject,
        id: Math.random().toString(36).substr(2, 9),
        likes: 0,
        user: { username: user.username, name: user.name },
      };
      dispatch(addBlog(newBlog));
      dispatch(
        setNotification({
          message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
          type: 'success',
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({ message: 'Error adding blog', type: 'error' })
      );
    }
  };

  const handleLike = (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
    dispatch(likeBlog(updatedBlog));
    dispatch(
      setNotification({
        message: `Liked ${updatedBlog.title}`,
        type: 'success',
      })
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(removeBlog(id));
      dispatch(
        setNotification({
          message: 'Blog removed successfully',
          type: 'success',
        })
      );
    }
  };

  const handleAddComment = (blogId, comment) => {
    dispatch(addComment(blogId, comment));
    dispatch(setNotification({ message: 'Comment added', type: 'success' }));
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Blog App</h1>
      <Notification />
      {user ? (
        <div>
          <p style={{ marginBottom: '20px' }}>
            {user.name} logged in
            <button
              onClick={handleLogout}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#dc3545', // Bootstrap's danger color
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </p>
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>
              Blogs
            </Link>
            <Link to="/users">
              Users
            </Link>
          </nav>
          <Togglable buttonLabel="New Blog">
            <BlogForm createBlog={addNewBlog} />
          </Togglable>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </div>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetail
                  blog={blogs.find(
                    (blog) =>
                      blog.id === window.location.pathname.split('/').pop()
                  )}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  currentUser={user}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:username" element={<UserDetail />} />
          </Routes>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
