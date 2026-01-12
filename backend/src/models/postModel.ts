import { Post, CreatePostDto, UpdatePostDto } from '../types/post';

class PostModel {
  private posts: Post[] = [];
  private currentId: number = 1;

  // 모든 게시글 조회
  findAll(): Post[] {
    return this.posts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // ID로 게시글 조회
  findById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  // 게시글 생성
  create(dto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.currentId++,
      title: dto.title,
      content: dto.content,
      createdAt: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // 게시글 수정
  update(id: number, dto: UpdatePostDto): Post | null {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return null;
    }

    const updatedPost: Post = {
      ...this.posts[postIndex],
      ...(dto.title && { title: dto.title }),
      ...(dto.content && { content: dto.content }),
    };

    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  // 게시글 삭제
  delete(id: number): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    return this.posts.length < initialLength;
  }
}

export default new PostModel();
