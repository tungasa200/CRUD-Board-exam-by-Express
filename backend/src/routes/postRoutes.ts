import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = Router();

// GET /api/posts - 게시글 목록
router.get('/', getPosts);

// GET /api/posts/:id - 게시글 상세
router.get('/:id', getPostById);

// POST /api/posts - 게시글 생성
router.post('/', createPost);

// PUT /api/posts/:id - 게시글 수정
router.put('/:id', updatePost);

// DELETE /api/posts/:id - 게시글 삭제
router.delete('/:id', deletePost);

export default router;
