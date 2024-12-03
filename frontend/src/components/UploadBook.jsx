import React, { useState } from 'react';
import axios from 'axios';

const UploadBook = () => {
  // State để lưu trữ dữ liệu nhập từ form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Xử lý thay đổi trong các trường input
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'bookFile') {
      setBookFile(files[0]);
    } else if (name === 'coverImage') {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định khi submit form

    // Tạo một FormData object để gửi dữ liệu qua API
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('bookFile', bookFile);
    formData.append('coverImage', coverImage);

    try {
      // Gửi dữ liệu tới API backend để lưu vào cơ sở dữ liệu
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Truyện đã được tải lên thành công!');
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Có lỗi xảy ra khi tải truyện lên!');
    }
  };

  return (
    <div>
      <h1>Tải lên truyện mới</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên truyện"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tác giả"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thể loại"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="bookFile"
          accept=".pdf,.epub"
          onChange={handleFileChange}
        />
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Tải lên</button>
      </form>
    </div>
  );
};

export default UploadBook;
