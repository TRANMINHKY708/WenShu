import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReadBook from './pages/ReadBook'; // Đảm bảo file ReadBook đã được tạo và đúng đường dẫn

const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookFile || !coverImage) {
      alert("Bạn cần tải lên file sách và ảnh bìa.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('bookFile', bookFile);
    formData.append('coverImage', coverImage);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      alert('Truyện đã được tải lên thành công!');
    } catch (error) {
      console.error('Error uploading the book:', error);
      alert('Có lỗi xảy ra khi tải truyện lên!');
    }
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Tải lên truyện</Link></li>
          <li><Link to="/read/1">Đọc truyện (ID 1)</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="file"
                accept=".epub,.prc"
                onChange={(e) => setBookFile(e.target.files[0])}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                required
              />
              <button type="submit">Upload</button>
            </form>
          }
        />
        <Route path="/read/:bookId" element={<ReadBook />} />
      </Routes>
    </Router>
  );
};

export default App;
