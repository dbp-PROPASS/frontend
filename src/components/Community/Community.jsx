import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Community/Community.css';

const Community = () => {
  const [view, setView] = useState('list'); // List/Detail/Write View
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [category, setCategory] = useState('it'); // 현재 선택된 카테고리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsData, setPostsData] = useState([]); // API에서 가져온 데이터

  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' }); // 새 글 작성 데이터

  const postsPerPage = 8; // 페이지당 게시글 수

  // 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          params: { category }, // 현재 선택된 카테고리 전송
        });
        setPostsData(response.data); // 데이터 저장
        setCurrentPage(1); // 카테고리가 변경되면 페이지 초기화
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [category]); // 카테고리 변경 시 API 호출

  // 페이지네이션 계산
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const paginatedPosts = postsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 글 작성 핸들러
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', {
        ...newPost,
        category, // 현재 선택된 카테고리 추가
      });
      alert('글이 성공적으로 등록되었습니다!');
      setNewPost({ title: '', content: '', author: '' }); // 폼 초기화
      setView('list'); // 작성 후 목록으로 돌아가기
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  // 목록 화면 렌더링
  const renderListView = () => (
    <div className="community">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="category-select">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // 카테고리 변경 시 페이지 초기화
          }}
        >
          <option value="it">IT 분야</option>
          <option value="english">영어 분야</option>
          <option value="finance">금융 분야</option>
        </select>

        <input
          type="text"
          placeholder="검색할 내용을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <button className="write-button" onClick={() => setView('write')}>
        글 작성
      </button>

      <table className="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts
            .filter((post) =>
              post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <tr key={post.postId} onClick={() => setView(post.postId)}>
                <td>{post.title}</td>
                <td>{post.author}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );

  // 글 작성 화면 렌더링
  const renderWriteView = () => (
    <div className="community write-view">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>새 글 작성</h2>
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            rows="5"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input
            type="text"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            required
          />
        </div>
        <button type="submit">게시하기</button>
        <button type="button" onClick={() => setView('list')}>
          취소
        </button>
      </form>
    </div>
  );

  // 상세 화면 렌더링
  const renderDetailView = () => {
    const post = postsData.find((p) => p.postId === view);
    return (
      <div className="community detail-view">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <button className="back-button" onClick={() => setView('list')}>
          뒤로가기
        </button>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div className="comments">
          <p>작성자: {post.author}</p>
        </div>
      </div>
    );
  };

  return view === 'list'
    ? renderListView()
    : view === 'write'
    ? renderWriteView()
    : renderDetailView();
};

export default Community;
