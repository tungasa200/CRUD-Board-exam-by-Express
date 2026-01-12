import { Request, Response } from 'express';
import postModel from '../models/postModel';
import { CreatePostDto, UpdatePostDto } from '../types/post';

// 게시글 목록 조회
export const getPosts = (req: Request, res: Response) => {
  const posts = postModel.findAll();
  res.json(posts);
};

// 게시글 상세 조회
export const getPostById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const post = postModel.findById(id);

  if (!post) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }

  res.json(post);
};

// 게시글 생성
export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body as CreatePostDto;

  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용은 필수입니다.' });
  }

  const newPost = postModel.create({ title, content });
  res.status(201).json(newPost);
};

// 게시글 수정
export const updatePost = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updateDto = req.body as UpdatePostDto;

  const updatedPost = postModel.update(id, updateDto);

  if (!updatedPost) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }

  res.json(updatedPost);
};

// 게시글 삭제
export const deletePost = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deleted = postModel.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }

  res.status(204).send();
};
