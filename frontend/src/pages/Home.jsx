import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';  // Component hiển thị danh sách sách
import Input from '../components/Input';  // Component cho input tìm kiếm

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Lấy danh sách sách từ API
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Lọc sách theo tên hoặc thể loại
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="header">
        <h2 className="heading-text">Danh sách truyện</h2>
        <Input onChange={(e) => setSearchTerm(e.target.value)} />
        <BookList books={filteredBooks} />
      </div>
    </div>
  );
};

export default Home;
