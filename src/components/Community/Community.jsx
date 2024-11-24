import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Community/Community.css';

const Community = () => {
  const [view, setView] = useState('list'); // List/Detail View
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [category, setCategory] = useState('it'); // 현재 선택된 카테고리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsData, setPostsData] = useState([]); // API에서 가져온 데이터

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

  // 목록 화면 렌더링
  const renderListView = () => (
    <div className="community"><br></br><br></br><br></br><br></br><br></br><br></br>
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
  

  // 상세 화면 렌더링
  const renderDetailView = () => {
    const post = postsData.find((p) => p.postId === view);
    return (
      <div className="community detail-view">
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

  return view === 'list' ? renderListView() : renderDetailView();
};

export default Community;
