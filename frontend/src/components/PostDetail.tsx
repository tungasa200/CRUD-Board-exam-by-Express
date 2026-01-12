import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Post } from '../types/post';
import { postApi } from '../services/api';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost(parseInt(id));
    }
  }, [id]);

  const loadPost = async (postId: number) => {
    try {
      setLoading(true);
      const data = await postApi.getPost(postId);
      setPost(data);
      setError(null);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postApi.deletePost(post!.id);
      navigate('/');
    } catch (err) {
      alert('삭제에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) return <div className="container"><div className="loading">로딩 중...</div></div>;
  if (error) return <div className="container"><div className="error">{error}</div></div>;
  if (!post) return <div className="container"><div className="error">게시글을 찾을 수 없습니다.</div></div>;

  return (
    <div className="container">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>🕒</span>
          <span>{new Date(post.createdAt).toLocaleString('ko-KR')}</span>
        </div>
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="button-group">
        <Link to="/" className="btn btn-secondary">
          ← 목록으로
        </Link>
        <Link to={`/edit/${post.id}`} className="btn btn-success">
          수정
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          삭제
        </button>
      </div>
    </div>
  );
}
