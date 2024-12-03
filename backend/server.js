const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('./models/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  // Lấy port từ biến môi trường hoặc default 5000

// Middleware để xử lý JSON request
app.use(express.json());

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Lưu file vào thư mục 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file là thời gian hiện tại + phần mở rộng
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép các định dạng PRC, ePub và ảnh bìa
    const fileTypes = /pdf|epub|prc/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Error: Only PDFs, ePubs, and PRC files are allowed!'), false);
    }
  }
});

// API lấy danh sách sách
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error fetching books');
  }
});

// API tải sách lên
app.post('/api/upload', upload.fields([{ name: 'bookFile' }, { name: 'coverImage' }]), async (req, res) => {
  const { title, author, genre, description } = req.body;
  const bookFile = req.files['bookFile'][0].path;
  const coverImage = req.files['coverImage'][0].path;

  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, genre, description, content, cover_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, genre, description, bookFile, coverImage]
    );
    res.status(201).json({ message: 'Book uploaded successfully', book: result.rows[0] });
  } catch (err) {
    console.error('Error uploading book:', err);
    res.status(500).send('Error uploading book');
  }
});

// API lấy thông tin sách theo ID
app.get('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error('Error fetching book details:', err);
    res.status(500).send('Error fetching book details');
  }
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
