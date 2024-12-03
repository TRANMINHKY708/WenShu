import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    bookFile: null,
    coverImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bookFile' || name === 'coverImage') {
      setBookData({ ...bookData, [name]: files[0] });
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    formData.append('bookFile', bookData.bookFile);
    formData.append('coverImage', bookData.coverImage);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Truyện đã được tải lên thành công!');
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Tên truyện" 
        name="title" 
        value={bookData.title} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Tác giả" 
        name="author" 
        value={bookData.author} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Thể loại" 
        name="genre" 
        value={bookData.genre} 
        onChange={handleChange} 
      />
      <textarea 
        placeholder="Mô tả" 
        name="description" 
        value={bookData.description} 
        onChange={handleChange} 
      />
      <input 
        type="file" 
        name="bookFile" 
        accept=".pdf,.epub" 
        onChange={handleChange} 
      />
      <input 
        type="file" 
        name="coverImage" 
        accept="image/*" 
        onChange={handleChange} 
      />
      <button type="submit">Tải lên</button>
    </form>
  );
};

export default UploadForm;
