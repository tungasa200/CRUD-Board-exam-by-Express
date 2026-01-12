import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Post } from '../types/post';
import { postApi } from '../services/api';

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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <div style={{ color: '#666', marginBottom: '20px' }}>
        작성일: {new Date(post.createdAt).toLocaleString('ko-KR')}
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '4px',
          minHeight: '200px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {post.content}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button>목록</button>
        </Link>
        <Link to={`/edit/${post.id}`}>
          <button style={{ marginLeft: '10px' }}>수정</button>
        </Link>
        <button style={{ marginLeft: '10px' }} onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
