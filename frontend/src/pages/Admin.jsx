import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.log('Error fetching books:', error));
  }, []);

  const handleDelete = (bookId) => {
    axios.delete(`http://localhost:5000/api/books/${bookId}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== bookId));
        alert('Truyện đã bị xóa!');
      })
      .catch(error => console.log('Error deleting book:', error));
  };

  return (
    <div>
      <h1>Quản lý truyện</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <button onClick={() => handleDelete(book.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
