import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postApi } from '../services/api';
import './PostForm.css';

export default function PostForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      loadPost(parseInt(id));
    }
  }, [id, isEditMode]);

  const loadPost = async (postId: number) => {
    try {
      const post = await postApi.getPost(postId);
      setTitle(post.title);
      setContent(post.content);
    } catch (err) {
      alert('게시글을 불러오는데 실패했습니다.');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode && id) {
        await postApi.updatePost(parseInt(id), { title, content });
        navigate(`/posts/${id}`);
      } else {
        const newPost = await postApi.createPost({ title, content });
        navigate(`/posts/${newPost.id}`);
      }
    } catch (err) {
      alert(`${isEditMode ? '수정' : '작성'}에 실패했습니다.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>{isEditMode ? '게시글 수정' : '새 글 작성'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="게시글 제목을 입력하세요"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            placeholder="게시글 내용을 입력하세요"
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? '처리중...' : isEditMode ? '수정 완료' : '작성 완료'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            disabled={loading}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
