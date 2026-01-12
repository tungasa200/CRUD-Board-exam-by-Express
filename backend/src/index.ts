import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use('/api/posts', postRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Mini Board API Server' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
