import { Post, CreatePostDto, UpdatePostDto } from '../types/post';

const API_BASE = '/api/posts';

export const postApi = {
  // 게시글 목록 조회
  async getPosts(): Promise<Post[]> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // 게시글 상세 조회
  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  // 게시글 생성
  async createPost(dto: CreatePostDto): Promise<Post> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  // 게시글 수정
  async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  // 게시글 삭제
  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },
};
