let blogs = [
  {
    id: '1',
    title: 'First Example Blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 5,
  },
  {
    id: '2',
    title: 'Second Example Blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 3,
  },
  {
    id: '3',
    title: 'Third Example Blog',
    author: 'Author Three',
    url: 'http://example.com/third',
    likes: 7,
  },
];

const getAll = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blogs);
    }, 500);
  });
};

const create = async (newObject) => {
  const newBlog = {
    ...newObject,
    id: (Math.random() * 10000).toFixed(0),
    likes: 0,
  };
  blogs = blogs.concat(newBlog);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newBlog);
    }, 500);
  });
};

const update = async (id, newObject) => {
  blogs = blogs.map((blog) => (blog.id !== id ? blog : newObject));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newObject);
    }, 500);
  });
};

const remove = async (id) => {
  blogs = blogs.filter((blog) => blog.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export default { getAll, create, update, remove };
