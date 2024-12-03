import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ePub from 'epubjs'; // Sử dụng thư viện ePub.js để đọc PRC và ePub

const ReadBook = () => {
  const { bookId } = useParams();  // Lấy bookId từ URL
  const [book, setBook] = useState(null);
  const [bookInstance, setBookInstance] = useState(null); // Instance của ePub.js

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        setBook(response.data);

        // Nếu file là PRC hoặc ePub, sử dụng ePub.js để đọc
        if (response.data.content.endsWith('.prc') || response.data.content.endsWith('.epub')) {
          const bookPath = `http://localhost:5000/${response.data.content}`;
          const epub = ePub(bookPath);  // Khởi tạo ePub.js với file PRC hoặc ePub
          setBookInstance(epub);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>

      {/* Nếu là file PRC hoặc ePub, hiển thị nội dung sách */}
      {bookInstance && (
        <div>
          <div id="viewer" style={{ height: '600px' }}></div>
          {bookInstance.renderTo('viewer')}
        </div>
      )}
    </div>
  );
};

export default ReadBook;
