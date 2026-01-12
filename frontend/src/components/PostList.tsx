import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { postApi } from '../services/api';
import './PostList.css';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postApi.getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postApi.deletePost(id);
      loadPosts();
    } catch (err) {
      alert('삭제에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) return <div className="container"><div className="loading">로딩 중...</div></div>;
  if (error) return <div className="container"><div className="error">{error}</div></div>;

  return (
    <div className="container">
      <div className="header">
        <h1>게시판</h1>
        <Link to="/create" className="btn btn-primary">
          새 글 작성
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">게시글이 없습니다.</div>
          <Link to="/create" className="btn btn-primary">
            첫 게시글 작성하기
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>제목</th>
                <th style={{ width: '200px' }}>작성일</th>
                <th style={{ width: '180px', textAlign: 'center' }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <span className="id-badge">{post.id}</span>
                  </td>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td className="date-text">
                    {new Date(post.createdAt).toLocaleString('ko-KR')}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/edit/${post.id}`} className="btn btn-secondary btn-small">
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-danger btn-small"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
