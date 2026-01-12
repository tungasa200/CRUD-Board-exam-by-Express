import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { postApi } from '../services/api';

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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>게시판</h1>
        <Link to="/create">
          <button>새 글 작성</button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>제목</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>작성일</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>작업</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{post.id}</td>
                <td style={{ padding: '10px' }}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </td>
                <td style={{ padding: '10px' }}>
                  {new Date(post.createdAt).toLocaleString('ko-KR')}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <Link to={`/edit/${post.id}`}>
                    <button style={{ marginRight: '5px' }}>수정</button>
                  </Link>
                  <button onClick={() => handleDelete(post.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
